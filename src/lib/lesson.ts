import type {LessonData, LessonSegment} from '../data/types';

export const getCurrentSegment = (
	segments: readonly LessonSegment[],
	timeInSeconds: number,
) => {
	return (
		segments.find(
			(segment) =>
				timeInSeconds >= segment.startInSeconds && timeInSeconds < segment.endInSeconds,
		) ?? segments[segments.length - 1]
	);
};

export const excerptFromSegments = (
	lesson: LessonData,
	startIndex: number,
	endIndex: number,
) => {
	return lesson.segments
		.slice(startIndex, endIndex + 1)
		.map((segment) => segment.text)
		.join(' ');
};
