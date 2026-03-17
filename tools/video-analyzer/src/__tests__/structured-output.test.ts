import {describe, expect, it} from 'vitest';
import {validateStructuredModelResponse} from '../structured-output';

describe('video-analyzer structured output', () => {
	it('accepts a valid structured Gemini response', () => {
		expect(
			validateStructuredModelResponse({
				summary: 'Stable frame.',
				events: [
					{
						relativeStart: 0,
						relativeEnd: 5,
						screenSummary: 'Presenter left.',
						visibleSubjects: 'Presenter',
						actions: 'Talking to camera.',
						onScreenText: '',
						compositionNotes: 'Presenter is framed left with empty space on the right.',
						placementHint: 'right',
						visualClutter: 'low',
						confidence: 0.9,
					},
				],
			}),
		).toMatchObject({
			summary: 'Stable frame.',
		});
	});

	it('rejects malformed structured responses', () => {
		expect(() =>
			validateStructuredModelResponse({
				summary: 'Broken frame.',
				events: [{relativeStart: '0'}],
			}),
		).toThrow('events[0].relativeStart');
	});
});
