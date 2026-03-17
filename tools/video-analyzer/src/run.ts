import fs from 'node:fs';
import path from 'node:path';
import {parseArgs, getHelpText} from './args';
import {buildExecutionPlan} from './config';
import {getGeminiApiKey, loadEnvironment} from './env';
import {assertFfmpegAvailable, buildSegments, getVideoMetadata, renderSegments} from './ffmpeg';
import {analyzeSegmentWithGemini, createGeminiClient} from './gemini';
import {buildSceneDescriptions, normalizeSegmentAnalysis} from './normalize';
import type {CliOptions, ParsedModelResponse, RenderedSegment, StoredSegmentResponse} from './types';
import {createWorkspace, toRepoRelativePath, writeJson} from './workspace';

const writeSegmentManifest = (
	repoRoot: string,
	options: CliOptions,
	videoMetadata: ReturnType<typeof getVideoMetadata>,
	segments: RenderedSegment[],
	outputDir: string,
): string => {
	const manifestPath = path.join(outputDir, 'segments.json');
	writeJson(manifestPath, {
		lessonId: options.lessonId,
		inputPath: toRepoRelativePath(repoRoot, options.inputPath),
		videoMetadata,
		segments: segments.map((segment) => ({
			...segment,
			outputPath: toRepoRelativePath(repoRoot, segment.outputPath),
		})),
	});
	return manifestPath;
};

const writeDryRunArtifacts = (
	repoRoot: string,
	options: CliOptions,
	videoMetadata: ReturnType<typeof getVideoMetadata>,
	segments: RenderedSegment[],
	outputDir: string,
): string => {
	const dryRunPath = path.join(outputDir, 'dry-run-summary.json');
	writeJson(dryRunPath, {
		mode: 'dry-run',
		lessonId: options.lessonId,
		inputPath: toRepoRelativePath(repoRoot, options.inputPath),
		videoMetadata,
		segments: segments.map((segment) => ({
			id: segment.id,
			startSeconds: segment.startSeconds,
			endSeconds: segment.endSeconds,
			durationSeconds: segment.durationSeconds,
			outputPath: toRepoRelativePath(repoRoot, segment.outputPath),
		})),
	});
	return dryRunPath;
};

const filterSegments = (segments: RenderedSegment[], selectedSegmentIndexes: number[] | null): RenderedSegment[] => {
	if (!selectedSegmentIndexes || selectedSegmentIndexes.length === 0) {
		return segments;
	}

	const selectedSet = new Set(selectedSegmentIndexes);
	return segments.filter((segment) => selectedSet.has(segment.index));
};

const loadStoredResponses = (
	responsesDir: string,
	segmentsById: Map<string, RenderedSegment>,
): {analyses: ReturnType<typeof normalizeSegmentAnalysis>[]; failures: Array<{segmentId: string; message: string}>} => {
	if (!fs.existsSync(responsesDir)) {
		return {analyses: [], failures: []};
	}

	const analyses: ReturnType<typeof normalizeSegmentAnalysis>[] = [];
	const failures: Array<{segmentId: string; message: string}> = [];
	const files = fs.readdirSync(responsesDir).sort();

	for (const fileName of files) {
		const filePath = path.join(responsesDir, fileName);
		const raw = JSON.parse(fs.readFileSync(filePath, 'utf8')) as StoredSegmentResponse | {segmentId?: string; error?: string};

		if (fileName.endsWith('.error.json')) {
			const errorRaw = raw as {segmentId?: string; error?: string};
			failures.push({
				segmentId: typeof errorRaw.segmentId === 'string' ? errorRaw.segmentId : fileName,
				message: typeof errorRaw.error === 'string' ? errorRaw.error : 'Unknown error',
			});
			continue;
		}

		const segmentId = typeof raw.segmentId === 'string' ? raw.segmentId : null;
		if (!segmentId || !('parsed' in raw)) {
			continue;
		}

		const segment = segmentsById.get(segmentId);
		if (!segment) {
			continue;
		}

		analyses.push(normalizeSegmentAnalysis(segment, raw.parsed as ParsedModelResponse));
	}

	return {analyses, failures};
};

const analyzeSegments = async (
	repoRoot: string,
	options: CliOptions,
	segments: RenderedSegment[],
	allSegments: RenderedSegment[],
	responsesDir: string,
	outputDir: string,
) => {
	const ai = createGeminiClient(getGeminiApiKey());
	const failures: Array<{segmentId: string; message: string}> = [];

	for (const segment of segments) {
		console.log(`Analyzing ${segment.id} (${segment.startSeconds.toFixed(1)}s-${segment.endSeconds.toFixed(1)}s)`);

		try {
			const result = await analyzeSegmentWithGemini({
				ai,
				segment,
				model: options.model,
				keepRemoteFiles: options.keepRemoteFiles,
				pollAttempts: options.pollAttempts,
				pollIntervalMs: options.pollIntervalMs,
			});
			writeJson(path.join(responsesDir, `${segment.id}.json`), {
				segmentId: segment.id,
				file: result.file,
				responseText: result.responseText,
				usageMetadata: result.usageMetadata,
				parsed: result.parsed,
			});
			const staleErrorPath = path.join(responsesDir, `${segment.id}.error.json`);
			if (fs.existsSync(staleErrorPath)) {
				fs.unlinkSync(staleErrorPath);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			failures.push({segmentId: segment.id, message});
			writeJson(path.join(responsesDir, `${segment.id}.error.json`), {
				segmentId: segment.id,
				error: message,
			});
		}
	}

	const segmentsById = new Map(allSegments.map((segment) => [segment.id, segment]));
	const loaded = loadStoredResponses(responsesDir, segmentsById);
	const mergedFailuresMap = new Map<string, string>();
	for (const failure of loaded.failures) {
		mergedFailuresMap.set(failure.segmentId, failure.message);
	}
	for (const failure of failures) {
		mergedFailuresMap.set(failure.segmentId, failure.message);
	}
	const mergedFailures = [...mergedFailuresMap.entries()]
		.map(([segmentId, message]) => ({segmentId, message}))
		.sort((left, right) => left.segmentId.localeCompare(right.segmentId));

	const analysisPath = path.join(outputDir, 'analysis.json');
	const sceneDescriptionsPath = path.join(outputDir, 'scene-descriptions.json');
	const sceneDescriptions = buildSceneDescriptions(loaded.analyses);

	writeJson(analysisPath, {
		lessonId: options.lessonId,
		inputPath: toRepoRelativePath(repoRoot, options.inputPath),
		analyses: loaded.analyses,
		failures: mergedFailures,
	});
	writeJson(sceneDescriptionsPath, {
		lessonId: options.lessonId,
		inputPath: toRepoRelativePath(repoRoot, options.inputPath),
		scenes: sceneDescriptions,
		failures: mergedFailures,
	});

	return {analysisPath, sceneDescriptionsPath, failures: mergedFailures};
};

export const runVideoAnalyzer = async (argv: string[]): Promise<void> => {
	const repoRoot = process.cwd();
	loadEnvironment(repoRoot);

	const parsed = parseArgs(argv, repoRoot);
	if ('help' in parsed) {
		console.log(getHelpText());
		return;
	}

	const options = parsed;
	assertFfmpegAvailable();

	if (!fs.existsSync(options.inputPath)) {
		throw new Error(`Input video not found: ${options.inputPath}`);
	}

	const workspace = createWorkspace(options.outputDir);
	const videoMetadata = getVideoMetadata(options.inputPath);
	const allSegments = renderSegments({
		inputPath: options.inputPath,
		clipsDir: workspace.clipsDir,
		lessonId: options.lessonId,
		segments: buildSegments({
			durationSeconds: videoMetadata.durationSeconds,
			segmentLengthSeconds: options.segmentLengthSeconds,
			segmentOverlapSeconds: options.segmentOverlapSeconds,
			maxSegments: options.maxSegments,
		}),
		analysisWidth: options.analysisWidth,
		keepAudio: options.keepAudio,
	});
	const selectedSegments = filterSegments(allSegments, options.selectedSegmentIndexes);

	console.log(
		JSON.stringify(
			buildExecutionPlan(repoRoot, options, {
				durationSeconds: videoMetadata.durationSeconds,
				width: videoMetadata.width,
				height: videoMetadata.height,
			}, selectedSegments.length),
			null,
			2,
		),
	);

	const manifestPath = writeSegmentManifest(repoRoot, options, videoMetadata, allSegments, workspace.outputDir);
	console.log(`Wrote segment manifest: ${toRepoRelativePath(repoRoot, manifestPath)}`);

	if (options.dryRun) {
		const dryRunPath = writeDryRunArtifacts(repoRoot, options, videoMetadata, selectedSegments, workspace.outputDir);
		console.log(`Dry run complete: ${toRepoRelativePath(repoRoot, dryRunPath)}`);
		return;
	}

	const result = await analyzeSegments(
		repoRoot,
		options,
		selectedSegments,
		allSegments,
		workspace.responsesDir,
		workspace.outputDir,
	);
	console.log(`Wrote analysis: ${toRepoRelativePath(repoRoot, result.analysisPath)}`);
	console.log(`Wrote scene descriptions: ${toRepoRelativePath(repoRoot, result.sceneDescriptionsPath)}`);

	if (result.failures.length > 0) {
		console.log(`Completed with ${result.failures.length} failed segment(s). Review response artifacts for details.`);
	}
};
