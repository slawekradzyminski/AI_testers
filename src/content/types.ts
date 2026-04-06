export type LessonIntroSlide = {
	type: 'intro';
	startInSeconds: number;
	endInSeconds: number;
	seriesName: string;
	lessonNumber: number;
	title: string;
	subtitle: string;
	presenterName?: string;
};

export type MechanismComparisonSlide = {
	type: 'mechanism-comparison';
	startInSeconds: number;
	endInSeconds: number;
	kicker: string;
	title: string;
	subtitle: string;
	leftTitle: string;
	leftBody: string;
	leftBullets: readonly string[];
	rightTitle: string;
	rightBody: string;
	rightBullets: readonly string[];
};

export type LessonSlide = LessonIntroSlide | MechanismComparisonSlide;

export type LessonDefinition = {
	id: string;
	compositionId: string;
	videoSrc: string;
	videoDurationInSeconds: number;
	slides: readonly LessonSlide[];
};
