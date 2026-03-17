import type {ModelEvent, ParsedModelResponse} from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const isFiniteNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const assertModelEvent = (value: unknown, index: number): asserts value is ModelEvent => {
	if (!isRecord(value)) {
		throw new Error(`events[${index}] must be an object`);
	}

	if (!isFiniteNumber(value.relativeStart)) {
		throw new Error(`events[${index}].relativeStart must be a finite number`);
	}

	if (!isFiniteNumber(value.relativeEnd)) {
		throw new Error(`events[${index}].relativeEnd must be a finite number`);
	}

	if (!isString(value.screenSummary)) {
		throw new Error(`events[${index}].screenSummary must be a string`);
	}

	if (!isString(value.visibleSubjects)) {
		throw new Error(`events[${index}].visibleSubjects must be a string`);
	}

	if (!isString(value.actions)) {
		throw new Error(`events[${index}].actions must be a string`);
	}

	if (!isString(value.onScreenText)) {
		throw new Error(`events[${index}].onScreenText must be a string`);
	}

	if (!isString(value.compositionNotes)) {
		throw new Error(`events[${index}].compositionNotes must be a string`);
	}

	if (!isString(value.placementHint)) {
		throw new Error(`events[${index}].placementHint must be a string`);
	}

	if (!isString(value.visualClutter)) {
		throw new Error(`events[${index}].visualClutter must be a string`);
	}

	if (!isFiniteNumber(value.confidence)) {
		throw new Error(`events[${index}].confidence must be a finite number`);
	}
};

export const validateStructuredModelResponse = (value: unknown): ParsedModelResponse => {
	if (!isRecord(value)) {
		throw new Error('Response body must be an object');
	}

	if (!isString(value.summary)) {
		throw new Error('summary must be a string');
	}

	if (!Array.isArray(value.events)) {
		throw new Error('events must be an array');
	}

	value.events.forEach((event, index) => assertModelEvent(event, index));

	return {
		summary: value.summary,
		events: value.events,
	};
};
