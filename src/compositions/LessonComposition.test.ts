import {describe, expect, it} from 'vitest';
import {l1Definition} from '../content/l1';
import {calculateLessonMetadata, getLessonSequences} from './LessonComposition';
import {secondsToFrameIndex, secondsToFrames} from '../lib/constants';

describe('LessonComposition', () => {
	it('derives frame sequences from lesson slide content', () => {
		expect(getLessonSequences(l1Definition)).toEqual([
			{
				id: 'L1-intro-0',
				type: 'intro',
				startInFrames: 0,
				durationInFrames: secondsToFrames(11),
			},
			{
				id: 'L1-flow-diagram-1',
				type: 'flow-diagram',
				startInFrames: secondsToFrameIndex(30),
				durationInFrames: secondsToFrames(30),
			},
			{
				id: 'L1-probability-chart-2',
				type: 'probability-chart',
				startInFrames: secondsToFrameIndex(230),
				durationInFrames: secondsToFrames(20),
			},
		]);
	});

	it('calculates composition metadata from the lesson definition', () => {
		expect(
			calculateLessonMetadata({
				props: {
					lesson: l1Definition,
				},
			}),
		).toEqual({
			durationInFrames: secondsToFrames(310),
		});
	});

	it('keeps L1 content in data modules instead of the composition', () => {
		expect(l1Definition.slides).toHaveLength(3);
		expect(l1Definition.slides[0]).toMatchObject({
			type: 'intro',
			seriesName: 'AI Testers',
			lessonNumber: 1,
		});
		expect(l1Definition.slides[1]).toMatchObject({
			type: 'flow-diagram',
		});
		if (l1Definition.slides[1].type === 'flow-diagram') {
			expect(l1Definition.slides[1].svgPath).toBe('generated/l1-flow.svg');
		}
	});
});
