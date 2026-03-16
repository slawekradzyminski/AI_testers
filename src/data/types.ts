export type LessonSegment = {
	text: string;
	startInSeconds: number;
	endInSeconds: number;
};

export type LessonData = {
	id: string;
	title: string;
	subtitle: string;
	durationInSeconds: number;
	segments: readonly LessonSegment[];
};
