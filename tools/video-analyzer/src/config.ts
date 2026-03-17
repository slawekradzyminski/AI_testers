import type {CliOptions} from './types';

export const DEFAULT_MODEL = 'gemini-3.1-flash-lite-preview';
export const DEFAULT_SEGMENT_LENGTH_SECONDS = 12;
export const DEFAULT_SEGMENT_OVERLAP_SECONDS = 2;
export const DEFAULT_ANALYSIS_WIDTH = 1280;
export const DEFAULT_MAX_POLL_ATTEMPTS = 60;
export const DEFAULT_POLL_INTERVAL_MS = 5_000;

export const ANALYSIS_JSON_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	required: ['summary', 'events'],
	properties: {
		summary: {type: 'string'},
		events: {
			type: 'array',
			items: {
				type: 'object',
				additionalProperties: false,
				required: [
					'relativeStart',
					'relativeEnd',
					'screenSummary',
					'visibleSubjects',
					'actions',
					'onScreenText',
					'compositionNotes',
					'placementHint',
					'visualClutter',
					'confidence',
				],
				properties: {
					relativeStart: {type: 'number'},
					relativeEnd: {type: 'number'},
					screenSummary: {type: 'string'},
					visibleSubjects: {type: 'string'},
					actions: {type: 'string'},
					onScreenText: {type: 'string'},
					compositionNotes: {type: 'string'},
					placementHint: {type: 'string'},
					visualClutter: {type: 'string'},
					confidence: {type: 'number'},
				},
			},
		},
	},
} as const;

export const buildExecutionPlan = (
	repoRoot: string,
	options: CliOptions,
	videoMetadata: {durationSeconds: number; width: number | null; height: number | null},
	segmentCount: number,
) => ({
	lessonId: options.lessonId,
	inputPath: options.inputPath.replace(`${repoRoot}/`, ''),
	outputDir: options.outputDir.replace(`${repoRoot}/`, ''),
	model: options.model,
	dryRun: options.dryRun,
	keepAudio: options.keepAudio,
	videoMetadata,
	segmentCount,
	segmentLengthSeconds: options.segmentLengthSeconds,
	segmentOverlapSeconds: options.segmentOverlapSeconds,
	selectedSegmentIndexes: options.selectedSegmentIndexes,
});
