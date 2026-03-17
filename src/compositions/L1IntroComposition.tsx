import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LessonIntro} from '../components/LessonIntro';
import type {LessonData} from '../data/types';

type Props = {
	lesson: LessonData;
};

/** L1 full-screen intro (11 seconds). Uses reusable LessonIntro. */
export const L1IntroComposition: React.FC<Props> = () => {
	return (
		<AbsoluteFill>
			<LessonIntro
				seriesName="AI Testers"
				lessonNumber={1}
				title={'Jak działa\nLLM?'}
				subtitle="Lekcja otwierająca serię: czym jest LLM, jak generuje tokeny i dlaczego trzeba myśleć probabilistycznie."
			/>
		</AbsoluteFill>
	);
};
