import {describe, expect, it} from 'vitest';
import {l5Definition} from '../content/l5';
import {calculateLessonMetadata, getLessonSequences} from './LessonComposition';
import {secondsToFrameIndex, secondsToFrames} from '../lib/constants';

describe('LessonComposition', () => {
	it('derives frame sequences for the reduced L5 lesson', () => {
		const sequences = getLessonSequences(l5Definition);

		expect(sequences).toHaveLength(2);
		expect(sequences[0]).toMatchObject({
			type: 'intro',
			startInFrames: 0,
			durationInFrames: secondsToFrames(7),
		});
		expect(sequences[1]).toMatchObject({
			type: 'mechanism-comparison',
			startInFrames: secondsToFrameIndex(44),
			durationInFrames: secondsToFrames(24),
		});
	});

	it('calculates composition metadata from the L5 lesson definition', () => {
		expect(
			calculateLessonMetadata({
				props: {
					lesson: l5Definition,
				},
			}),
		).toEqual({
			durationInFrames: secondsToFrames(575),
		});
	});

	it('keeps L5 content focused on intro plus transformer mechanisms', () => {
		expect(l5Definition.videoSrc).toBe('L5_attention.mp4');
		expect(l5Definition.slides.map((slide) => slide.type)).toEqual([
			'intro',
			'mechanism-comparison',
		]);
	});
});
