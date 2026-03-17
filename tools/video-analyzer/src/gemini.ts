import {
	GoogleGenAI,
	createPartFromUri,
	createUserContent,
	FileState,
	type GenerateContentResponseUsageMetadata,
} from '@google/genai';
import {
	ANALYSIS_JSON_SCHEMA,
	DEFAULT_MAX_POLL_ATTEMPTS,
	DEFAULT_POLL_INTERVAL_MS,
} from './config';
import {buildSegmentPrompt} from './prompts';
import {validateStructuredModelResponse} from './structured-output';
import type {ParsedModelResponse, RenderedSegment} from './types';

type AnalyzeSegmentOptions = {
	ai: GoogleGenAI;
	segment: RenderedSegment;
	model: string;
	keepRemoteFiles: boolean;
	pollAttempts: number | null;
	pollIntervalMs: number | null;
};

type AnalyzeSegmentResult = {
	file: {
		name: string | undefined;
		uri: string | undefined;
		mimeType: string;
		state: string | null;
	};
	responseText: string;
	parsed: ParsedModelResponse;
	usageMetadata: GenerateContentResponseUsageMetadata | null;
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const waitForFileActive = async (
	ai: GoogleGenAI,
	fileName: string,
	pollAttempts: number,
	pollIntervalMs: number,
) => {
	for (let attempt = 0; attempt < pollAttempts; attempt += 1) {
		const current = await ai.files.get({name: fileName});
		if (current.state === FileState.ACTIVE) {
			return current;
		}

		if (current.state === FileState.FAILED) {
			throw new Error(`Gemini file processing failed for ${fileName}`);
		}

		await sleep(pollIntervalMs);
	}

	throw new Error(`Timed out waiting for Gemini file activation for ${fileName}`);
};

const parseResponseJson = (text: string, segmentId: string): ParsedModelResponse => {
	if (!text) {
		throw new Error(`Gemini returned an empty response for ${segmentId}`);
	}

	try {
		return validateStructuredModelResponse(JSON.parse(text) as unknown);
	} catch (error) {
		throw new Error(
			`Gemini returned invalid structured JSON for ${segmentId}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};

export const createGeminiClient = (apiKey: string): GoogleGenAI => new GoogleGenAI({apiKey});

export const analyzeSegmentWithGemini = async ({
	ai,
	segment,
	model,
	keepRemoteFiles,
	pollAttempts,
	pollIntervalMs,
}: AnalyzeSegmentOptions): Promise<AnalyzeSegmentResult> => {
	const uploadedFile = await ai.files.upload({
		file: segment.outputPath,
		config: {
			mimeType: 'video/mp4',
			displayName: segment.fileName,
		},
	});

	const fileName = uploadedFile.name;
	if (!fileName) {
		throw new Error(`Gemini did not return a file name for ${segment.id}`);
	}

	let activeFile = uploadedFile;

	try {
		activeFile = await waitForFileActive(
			ai,
			fileName,
			pollAttempts ?? DEFAULT_MAX_POLL_ATTEMPTS,
			pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS,
		);

		const response = await ai.models.generateContent({
			model,
			contents: createUserContent([
				buildSegmentPrompt(segment),
				createPartFromUri(activeFile.uri ?? '', activeFile.mimeType ?? 'video/mp4'),
			]),
			config: {
				responseMimeType: 'application/json',
				responseJsonSchema: ANALYSIS_JSON_SCHEMA,
			},
		});

		return {
			file: {
				name: activeFile.name,
				uri: activeFile.uri,
				mimeType: activeFile.mimeType ?? 'video/mp4',
				state: activeFile.state ?? null,
			},
			responseText: response.text ?? '',
			parsed: parseResponseJson(response.text ?? '', segment.id),
			usageMetadata: response.usageMetadata ?? null,
		};
	} finally {
		if (!keepRemoteFiles) {
			try {
				await ai.files.delete({name: fileName});
			} catch {
				// Best effort cleanup only.
			}
		}
	}
};
