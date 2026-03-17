import path from 'node:path';
import {
	DEFAULT_ANALYSIS_WIDTH,
	DEFAULT_MODEL,
	DEFAULT_SEGMENT_LENGTH_SECONDS,
	DEFAULT_SEGMENT_OVERLAP_SECONDS,
} from './config';
import type {CliOptions} from './types';

const VALUE_FLAGS = new Set([
	'lesson',
	'input',
	'output',
	'segment-length',
	'segment-overlap',
	'max-segments',
	'segment-indexes',
	'model',
	'poll-interval-ms',
	'poll-attempts',
	'analysis-width',
]);

const BOOLEAN_FLAGS = new Set(['dry-run', 'keep-audio', 'keep-remote-files', 'help']);

const parseNumber = (value: string, flagName: string): number => {
	const parsed = Number(value);
	if (!Number.isFinite(parsed)) {
		throw new Error(`Invalid numeric value for --${flagName}: ${value}`);
	}
	return parsed;
};

const parseSegmentIndexes = (value: string): number[] => {
	const indexes = value
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean)
		.map((part) => Number(part));

	if (indexes.length === 0 || indexes.some((index) => !Number.isInteger(index) || index < 0)) {
		throw new Error(`Invalid value for --segment-indexes: ${value}`);
	}

	return [...new Set(indexes)].sort((left, right) => left - right);
};

export const getHelpText = (): string => `Video analyzer

Usage:
  npm run analyze:video -- --lesson L1 --input L1/L1_intro.mp4 [options]

Options:
  --lesson <id>              Lesson identifier used in output paths
  --input <path>             Source video path
  --output <path>            Output directory (default: tmp/video-analysis/<lesson>)
  --segment-length <sec>     Segment duration in seconds (default: ${DEFAULT_SEGMENT_LENGTH_SECONDS})
  --segment-overlap <sec>    Segment overlap in seconds (default: ${DEFAULT_SEGMENT_OVERLAP_SECONDS})
  --max-segments <n>         Limit generated segments for debugging
  --segment-indexes <list>   Comma-separated segment indexes to run, e.g. 30 or 28,29,30
  --model <name>             Gemini model (default: ${DEFAULT_MODEL})
  --analysis-width <px>      Downscale width for analysis clips (default: ${DEFAULT_ANALYSIS_WIDTH})
  --dry-run                  Segment only, skip Gemini upload and analysis
  --keep-audio               Keep audio in generated clips
  --keep-remote-files        Do not delete uploaded Gemini files after analysis
  --poll-interval-ms <ms>    Poll interval for Gemini file activation
  --poll-attempts <n>        Max Gemini file poll attempts
  --help                     Show this message
`;

export const parseArgs = (argv: string[], cwd: string): CliOptions | {help: true} => {
	const raw: Record<string, string | boolean> = {};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (!arg.startsWith('--')) {
			throw new Error(`Unexpected argument: ${arg}`);
		}

		const flag = arg.slice(2);
		if (BOOLEAN_FLAGS.has(flag)) {
			raw[flag] = true;
			continue;
		}

		if (!VALUE_FLAGS.has(flag)) {
			throw new Error(`Unknown flag: --${flag}`);
		}

		const next = argv[index + 1];
		if (!next || next.startsWith('--')) {
			throw new Error(`Expected a value after --${flag}`);
		}

		raw[flag] = next;
		index += 1;
	}

	if (raw.help) {
		return {help: true};
	}

	if (typeof raw.lesson !== 'string') {
		throw new Error('Missing required flag --lesson');
	}

	if (typeof raw.input !== 'string') {
		throw new Error('Missing required flag --input');
	}

	const segmentLengthSeconds =
		typeof raw['segment-length'] === 'string'
			? parseNumber(raw['segment-length'], 'segment-length')
			: DEFAULT_SEGMENT_LENGTH_SECONDS;
	const segmentOverlapSeconds =
		typeof raw['segment-overlap'] === 'string'
			? parseNumber(raw['segment-overlap'], 'segment-overlap')
			: DEFAULT_SEGMENT_OVERLAP_SECONDS;

	if (segmentLengthSeconds <= 0) {
		throw new Error('--segment-length must be greater than 0');
	}

	if (segmentOverlapSeconds < 0 || segmentOverlapSeconds >= segmentLengthSeconds) {
		throw new Error('--segment-overlap must be greater than or equal to 0 and smaller than --segment-length');
	}

	return {
		lessonId: raw.lesson,
		inputPath: path.resolve(cwd, raw.input),
		outputDir: path.resolve(
			cwd,
			typeof raw.output === 'string' ? raw.output : path.join('tmp', 'video-analysis', raw.lesson),
		),
		model: typeof raw.model === 'string' ? raw.model : DEFAULT_MODEL,
		segmentLengthSeconds,
		segmentOverlapSeconds,
		maxSegments: typeof raw['max-segments'] === 'string' ? parseNumber(raw['max-segments'], 'max-segments') : null,
		selectedSegmentIndexes:
			typeof raw['segment-indexes'] === 'string' ? parseSegmentIndexes(raw['segment-indexes']) : null,
		dryRun: raw['dry-run'] === true,
		keepAudio: raw['keep-audio'] === true,
		keepRemoteFiles: raw['keep-remote-files'] === true,
		pollIntervalMs:
			typeof raw['poll-interval-ms'] === 'string'
				? parseNumber(raw['poll-interval-ms'], 'poll-interval-ms')
				: null,
		pollAttempts:
			typeof raw['poll-attempts'] === 'string'
				? parseNumber(raw['poll-attempts'], 'poll-attempts')
				: null,
		analysisWidth:
			typeof raw['analysis-width'] === 'string'
				? parseNumber(raw['analysis-width'], 'analysis-width')
				: DEFAULT_ANALYSIS_WIDTH,
	};
};
