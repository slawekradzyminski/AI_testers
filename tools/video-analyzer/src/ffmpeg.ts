import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type {RenderedSegment, VideoMetadata, VideoSegment} from './types';

type BuildSegmentsOptions = {
	durationSeconds: number;
	segmentLengthSeconds: number;
	segmentOverlapSeconds: number;
	maxSegments: number | null;
};

type RenderSegmentsOptions = {
	inputPath: string;
	clipsDir: string;
	lessonId: string;
	segments: VideoSegment[];
	analysisWidth: number;
	keepAudio: boolean;
};

const runJsonCommand = <T>(command: string, args: string[]): T => {
	const output = execFileSync(command, args, {encoding: 'utf8'});
	return JSON.parse(output) as T;
};

export const assertFfmpegAvailable = (): void => {
	try {
		execFileSync('ffmpeg', ['-version'], {stdio: 'ignore'});
		execFileSync('ffprobe', ['-version'], {stdio: 'ignore'});
	} catch {
		throw new Error('ffmpeg and ffprobe are required but were not found in PATH.');
	}
};

export const getVideoMetadata = (inputPath: string): VideoMetadata => {
	if (!fs.existsSync(inputPath)) {
		throw new Error(`Input video not found: ${inputPath}`);
	}

	const probe = runJsonCommand<{
		format?: {duration?: string; size?: string};
		streams?: Array<{codec_type?: string; width?: number; height?: number; avg_frame_rate?: string}>;
	}>('ffprobe', [
		'-v',
		'error',
		'-show_entries',
		'format=duration,size:stream=index,codec_type,width,height,avg_frame_rate',
		'-of',
		'json',
		inputPath,
	]);

	const durationSeconds = Number(probe.format?.duration);
	if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
		throw new Error(`Could not determine duration for ${inputPath}`);
	}

	const videoStream = probe.streams?.find((stream) => stream.codec_type === 'video');

	return {
		durationSeconds,
		sizeBytes: probe.format?.size ? Number(probe.format.size) : null,
		width: videoStream?.width ?? null,
		height: videoStream?.height ?? null,
		frameRate: videoStream?.avg_frame_rate ?? null,
	};
};

const formatTimestampFragment = (value: number): string => value.toFixed(1).padStart(6, '0');

export const buildSegments = ({
	durationSeconds,
	segmentLengthSeconds,
	segmentOverlapSeconds,
	maxSegments,
}: BuildSegmentsOptions): VideoSegment[] => {
	const segments: VideoSegment[] = [];
	const step = segmentLengthSeconds - segmentOverlapSeconds;
	let index = 0;
	let start = 0;

	while (start < durationSeconds) {
		const end = Math.min(durationSeconds, start + segmentLengthSeconds);
		segments.push({
			id: `segment-${String(index).padStart(3, '0')}`,
			index,
			startSeconds: Number(start.toFixed(3)),
			endSeconds: Number(end.toFixed(3)),
			durationSeconds: Number((end - start).toFixed(3)),
			fileName: `segment-${String(index).padStart(3, '0')}-${formatTimestampFragment(start)}-${formatTimestampFragment(end)}.mp4`,
		});

		index += 1;
		if (maxSegments !== null && index >= maxSegments) {
			break;
		}
		if (end >= durationSeconds) {
			break;
		}
		start += step;
	}

	return segments;
};

const renderSegment = (inputPath: string, outputPath: string, segment: VideoSegment, analysisWidth: number, keepAudio: boolean): void => {
	if (fs.existsSync(outputPath)) {
		return;
	}

	const args = [
		'-y',
		'-ss',
		String(segment.startSeconds),
		'-i',
		inputPath,
		'-t',
		String(segment.durationSeconds),
		'-vf',
		`scale='min(${analysisWidth},iw)':-2`,
		'-c:v',
		'libx264',
		'-preset',
		'veryfast',
		'-crf',
		'28',
		'-pix_fmt',
		'yuv420p',
	];

	if (keepAudio) {
		args.push('-c:a', 'aac', '-b:a', '96k');
	} else {
		args.push('-an');
	}

	args.push('-movflags', '+faststart', outputPath);
	execFileSync('ffmpeg', args, {stdio: 'pipe'});
};

export const renderSegments = ({
	inputPath,
	clipsDir,
	lessonId,
	segments,
	analysisWidth,
	keepAudio,
}: RenderSegmentsOptions): RenderedSegment[] =>
	segments.map((segment) => {
		const outputPath = path.join(clipsDir, segment.fileName);
		renderSegment(inputPath, outputPath, segment, analysisWidth, keepAudio);
		return {
			...segment,
			lessonId,
			outputPath,
		};
	});
