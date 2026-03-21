import type {LessonDefinition} from './types';
import {l1Lesson} from '../data/generated/l1-subs';

export const l1Timestamps = {
	intro: {start: 0, end: 12},
} as const;

export const l1Definition: LessonDefinition = {
	id: 'L1',
	compositionId: 'L1Full',
	videoSrc: 'L1_intro.mp4',
	videoDurationInSeconds: l1Lesson.durationInSeconds,
	slides: [
		{
			type: 'intro',
			startInSeconds: l1Timestamps.intro.start,
			endInSeconds: l1Timestamps.intro.end,
			seriesName: 'AI Testers',
			lessonNumber: 1,
			title: 'Jak działa\nLLM?',
			subtitle:
				'Lekcja otwierająca serię: czym jest LLM, jak generuje tokeny i dlaczego trzeba myśleć probabilistycznie.',
		},
	],
};

export const l1IntroSlide = l1Definition.slides[0];
