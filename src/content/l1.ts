import type {LessonDefinition} from './types';
import {l1Lesson} from '../data/generated/l1-subs';

export const l1Timestamps = {
	intro: {start: 0, end: 12},
	flowDiagram: {start: 30, end: 77},
	chaos: {start: 224, end: 308.672},
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
		{
			type: 'flow-diagram',
			startInSeconds: l1Timestamps.flowDiagram.start,
			endInSeconds: l1Timestamps.flowDiagram.end,
			svgPath: 'generated/l1-flow.svg',
		},
		{
			type: 'probability-chart',
			startInSeconds: l1Timestamps.chaos.start,
			endInSeconds: l1Timestamps.chaos.end,
			kicker: '???',
			title: 'CHAOS MODE',
			subtitle: 'LLMs operate on probabilities. Not certainty.',
			chartTitle: 'Next-token probabilities (logits → softmax)',
			data: [
				{token: 'Paris', prob: 0.82, color: 'rgba(61,174,255,0.9)'},
				{token: 'Lyon', prob: 0.09, color: 'rgba(138,216,255,0.7)'},
				{token: 'France', prob: 0.04, color: 'rgba(184,212,232,0.6)'},
				{token: '...', prob: 0.03, color: 'rgba(255,209,102,0.5)'},
				{token: '???', prob: 0.02, color: 'rgba(255,168,76,0.4)'},
			],
		},
	],
};

export const l1IntroSlide = l1Definition.slides[0];
export const l1DiagramSlide = l1Definition.slides[1];
export const l1LogitsSlide = l1Definition.slides[2];
