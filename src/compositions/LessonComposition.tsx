import React from 'react';
import {AbsoluteFill, Html5Video, Sequence, staticFile} from 'remotion';
import type {LessonDefinition, LessonSlide} from '../content/types';
import {LessonIntro} from '../components/LessonIntro';
import {MechanismComparisonSlide} from '../components/MechanismComparisonSlide';
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

export const renderLessonSlide = (slide: LessonSlide, durationInFrames: number) => {
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
		case 'mechanism-comparison':
			return (
				<MechanismComparisonSlide
					durationInFrames={durationInFrames}
					kicker={slide.kicker}
					title={slide.title}
					subtitle={slide.subtitle}
					leftTitle={slide.leftTitle}
					leftBody={slide.leftBody}
					leftBullets={slide.leftBullets}
					rightTitle={slide.rightTitle}
					rightBody={slide.rightBody}
					rightBullets={slide.rightBullets}
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
						{renderLessonSlide(slide, sequence.durationInFrames)}
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
