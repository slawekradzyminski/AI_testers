import React from 'react';
import {AbsoluteFill, Html5Video, Sequence, staticFile} from 'remotion';
import type {LessonDefinition, LessonSlide} from '../content/types';
import {LessonIntro} from '../components/LessonIntro';
import {FlowDiagramSlide} from '../components/FlowDiagramSlide';
import {ProbabilityChartSlide} from '../components/ProbabilityChartSlide';
import {slideFontFamily} from '../components/slideTheme';
import {secondsToFrameIndex, secondsToFrames} from '../lib/constants';

export type LessonCompositionProps = {
	lesson: LessonDefinition;
};

export type LessonSequence = {
	id: string;
	type: LessonSlide['type'];
	startInFrames: number;
	durationInFrames: number;
};

export const getLessonSequences = (lesson: LessonDefinition): LessonSequence[] => {
	return lesson.slides.map((slide, index) => ({
		id: `${lesson.id}-${slide.type}-${index}`,
		type: slide.type,
		startInFrames: secondsToFrameIndex(slide.startInSeconds),
		durationInFrames: secondsToFrames(slide.endInSeconds - slide.startInSeconds),
	}));
};

export const calculateLessonMetadata = ({
	props,
}: {
	props: LessonCompositionProps;
}): {durationInFrames: number} => {
	return {
		durationInFrames: secondsToFrames(props.lesson.videoDurationInSeconds),
	};
};

export const renderLessonSlide = (
	slide: LessonSlide,
	durationInFrames: number,
	saltPrefix = 'lesson',
) => {
	switch (slide.type) {
		case 'intro':
			return (
				<LessonIntro
					seriesName={slide.seriesName}
					lessonNumber={slide.lessonNumber}
					title={slide.title}
					subtitle={slide.subtitle}
					presenterName={slide.presenterName}
				/>
			);
		case 'flow-diagram':
			return (
				<FlowDiagramSlide
					durationInFrames={durationInFrames}
					svgPath={slide.svgPath}
				/>
			);
		case 'probability-chart':
			return (
				<ProbabilityChartSlide
					durationInFrames={durationInFrames}
					kicker={slide.kicker}
					title={slide.title}
					subtitle={slide.subtitle}
					chartTitle={slide.chartTitle}
					data={slide.data}
				/>
			);
	}
};

export const LessonComposition: React.FC<LessonCompositionProps> = ({lesson}) => {
	const sequences = getLessonSequences(lesson);

	return (
		<AbsoluteFill
			style={{
				fontFamily: slideFontFamily,
				color: '#f4f7fb',
				backgroundColor: '#000',
			}}
		>
			<Html5Video
				src={staticFile(lesson.videoSrc)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					objectPosition: 'center',
				}}
			/>
			{lesson.slides.map((slide, index) => {
				const sequence = sequences[index];
				return (
					<Sequence
						key={sequence.id}
						from={sequence.startInFrames}
						durationInFrames={sequence.durationInFrames}
						name={sequence.type}
					>
						{renderLessonSlide(slide, sequence.durationInFrames, sequence.id)}
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
