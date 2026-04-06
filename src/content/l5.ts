import type {LessonDefinition} from './types';

export const l5Definition: LessonDefinition = {
	id: 'L5',
	compositionId: 'L5Full',
	videoSrc: 'L5_attention.mp4',
	videoDurationInSeconds: 575,
	slides: [
		{
			type: 'intro',
			startInSeconds: 0,
			endInSeconds: 7,
			seriesName: 'AI Testers',
			lessonNumber: 5,
			title: 'Mechanizm\nAtencji',
			subtitle: 'Jak LLM ustala kontekst i rozumie, co chcemy uzyskac.',
		},
		{
			type: 'mechanism-comparison',
			startInSeconds: 44,
			endInSeconds: 68,
			kicker: 'Dwa mechanizmy',
			title: 'Dwa kluczowe mechanizmy',
			subtitle: '',
			leftTitle: 'Mechanizm atencji',
			leftBody: 'Ustala kontekst.',
			leftBullets: [],
			rightTitle: 'Sieć neuronowa',
			rightBody: 'Przewiduje kolejny token.',
			rightBullets: [],
		},
	],
};
