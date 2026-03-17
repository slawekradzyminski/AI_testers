import {describe, expect, it} from 'vitest';
import {buildSceneDescriptions, normalizeSegmentAnalysis} from '../normalize';
import type {ParsedModelResponse, RenderedSegment} from '../types';

const segment: RenderedSegment = {
	id: 'segment-000',
	index: 0,
	lessonId: 'L1',
	startSeconds: 30,
	endSeconds: 42,
	durationSeconds: 12,
	fileName: 'segment-000.mp4',
	outputPath: '/repo/tmp/segment-000.mp4',
};

describe('video-analyzer normalize', () => {
	it('converts relative model events into absolute timeline events', () => {
		const parsed: ParsedModelResponse = {
			summary: 'Stable presenter framing with free space on the right.',
			events: [
				{
					relativeStart: 1,
					relativeEnd: 8,
					screenSummary: 'Presenter left, free space right.',
					visibleSubjects: 'Presenter, empty area on right',
					actions: 'Presenter speaks while remaining mostly static.',
					onScreenText: '',
					compositionNotes: 'Presenter occupies the left side with open negative space on the right.',
					placementHint: 'right',
					visualClutter: 'low',
					confidence: 0.9,
				},
			],
		};

		const analysis = normalizeSegmentAnalysis(segment, parsed);
		expect(analysis.events[0]).toMatchObject({
			absoluteStart: 31,
			absoluteEnd: 38,
			visibleSubjects: 'Presenter, empty area on right',
			compositionNotes: 'Presenter occupies the left side with open negative space on the right.',
		});
	});

	it('builds flattened scene descriptions for agent consumption', () => {
		const analyses = [
			normalizeSegmentAnalysis(segment, {
				summary: '',
				events: [
					{
						relativeStart: 1,
						relativeEnd: 5,
						screenSummary: 'Presenter speaking to camera.',
						visibleSubjects: 'Presenter',
						actions: 'Talking to camera.',
						onScreenText: 'How LLMs work',
						compositionNotes: 'Centered medium shot.',
						placementHint: 'center',
						visualClutter: 'low',
						confidence: 0.8,
					},
				],
			}),
		];

		const scenes = buildSceneDescriptions(analyses);
		expect(scenes).toHaveLength(1);
		expect(scenes[0]).toMatchObject({
			screenSummary: 'Presenter speaking to camera.',
			onScreenText: 'How LLMs work',
			start: 31,
			end: 35,
		});
	});
});
