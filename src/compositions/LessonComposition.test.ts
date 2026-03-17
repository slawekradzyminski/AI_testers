import {describe, expect, it} from 'vitest';
import {l1Definition} from '../content/l1';
import {calculateLessonMetadata, getLessonSequences} from './LessonComposition';
import {secondsToFrameIndex, secondsToFrames} from '../lib/constants';

describe('LessonComposition', () => {
	it('derives frame sequences from lesson slide content', () => {
		const sequences = getLessonSequences(l1Definition);

		expect(sequences).toHaveLength(l1Definition.slides.length);

		for (const [index, slide] of l1Definition.slides.entries()) {
			expect(sequences[index]).toEqual({
				id: `${l1Definition.id}-${slide.type}-${index}`,
				type: slide.type,
				startInFrames: secondsToFrameIndex(slide.startInSeconds),
				durationInFrames: secondsToFrames(slide.endInSeconds - slide.startInSeconds),
			});
		}
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
