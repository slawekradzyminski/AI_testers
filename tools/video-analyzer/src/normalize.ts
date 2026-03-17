import type {ModelEvent, NormalizedEvent, ParsedModelResponse, RenderedSegment, SceneDescription, SegmentAnalysis} from './types';

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const sanitizeString = (value: unknown, fallback = 'unknown'): string => {
	if (typeof value !== 'string') {
		return fallback;
	}
	const trimmed = value.trim();
	return trimmed || fallback;
};

const sanitizeConfidence = (value: unknown): number => {
	const numeric = Number(value);
	if (!Number.isFinite(numeric)) {
		return 0;
	}
	return Number(clamp(numeric, 0, 1).toFixed(3));
};

const normalizeEvent = (segment: RenderedSegment, event: Partial<ModelEvent>): NormalizedEvent | null => {
	const relativeStart = clamp(Number(event.relativeStart) || 0, 0, segment.durationSeconds);
	const relativeEnd = clamp(Number(event.relativeEnd) || 0, relativeStart, segment.durationSeconds);
	if (relativeEnd - relativeStart < 1) {
		return null;
	}

	return {
		relativeStart: Number(relativeStart.toFixed(3)),
		relativeEnd: Number(relativeEnd.toFixed(3)),
		absoluteStart: Number((segment.startSeconds + relativeStart).toFixed(3)),
		absoluteEnd: Number((segment.startSeconds + relativeEnd).toFixed(3)),
		screenSummary: sanitizeString(event.screenSummary),
		visibleSubjects: sanitizeString(event.visibleSubjects),
		actions: sanitizeString(event.actions),
		onScreenText: sanitizeString(event.onScreenText, ''),
		compositionNotes: sanitizeString(event.compositionNotes),
		placementHint: sanitizeString(event.placementHint),
		visualClutter: sanitizeString(event.visualClutter),
		confidence: sanitizeConfidence(event.confidence),
	};
};

export const normalizeSegmentAnalysis = (
	segment: RenderedSegment,
	parsed: ParsedModelResponse,
): SegmentAnalysis => ({
	segmentId: segment.id,
	windowStart: segment.startSeconds,
	windowEnd: segment.endSeconds,
	summary: sanitizeString(parsed.summary, ''),
	events: (Array.isArray(parsed.events) ? parsed.events : [])
		.map((event) => normalizeEvent(segment, event))
		.filter((event): event is NormalizedEvent => event !== null)
		.sort((left, right) => left.absoluteStart - right.absoluteStart),
});

export const buildSceneDescriptions = (analyses: SegmentAnalysis[]): SceneDescription[] =>
	analyses
		.flatMap((analysis) =>
			analysis.events.map((event, index) => ({
				id: `${analysis.segmentId}-event-${String(index).padStart(2, '0')}`,
				start: event.absoluteStart,
				end: event.absoluteEnd,
				durationSeconds: Number((event.absoluteEnd - event.absoluteStart).toFixed(3)),
				screenSummary: event.screenSummary,
				visibleSubjects: event.visibleSubjects,
				actions: event.actions,
				onScreenText: event.onScreenText,
				compositionNotes: event.compositionNotes,
				placementHint: event.placementHint,
				visualClutter: event.visualClutter,
				confidence: event.confidence,
			})),
		)
		.sort((left, right) => left.start - right.start);
