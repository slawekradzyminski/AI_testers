import type {RenderedSegment} from './types';

export const buildSegmentPrompt = (segment: RenderedSegment): string => [
	`You are analyzing a lesson video segment in lesson ${segment.lessonId}.`,
	`The clip covers absolute video time ${segment.startSeconds.toFixed(3)} to ${segment.endSeconds.toFixed(3)} seconds.`,
	'Return JSON only matching the requested schema.',
	'Focus only on what is visible on screen, as if you were giving another AI agent eyes on the video.',
	'Do not suggest animations, overlays, or edits.',
	'Use relativeStart and relativeEnd as seconds within this clip, not absolute video time.',
	'Only include events that last at least 1 second and describe a visually meaningful state or change.',
	'visibleSubjects should name who or what is visible.',
	'actions should describe what is happening on screen during the interval.',
	'onScreenText should capture text that appears visually; use an empty string if none is visible.',
	'compositionNotes should describe framing, layout, or screen arrangement in an AI-agent-friendly way.',
	'placementHint should be one of: left, right, center, full, unknown.',
	'visualClutter should be one of: low, medium, high.',
	'confidence must be a number from 0 to 1.',
].join(' ');
