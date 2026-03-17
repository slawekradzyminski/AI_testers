import React from 'react';
import type {LessonSlide} from '../content/types';
import {renderLessonSlide} from './LessonComposition';

export type SlideCompositionProps = {
	slide: LessonSlide;
	durationInFrames: number;
};

export const SlideComposition: React.FC<SlideCompositionProps> = ({slide, durationInFrames}) => {
	return renderLessonSlide(slide, durationInFrames);
};
