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

export type FlowDiagramSlide = {
	type: 'flow-diagram';
	startInSeconds: number;
	endInSeconds: number;
	svgPath: string;
};

export type ProbabilityChartDatum = {
	token: string;
	prob: number;
	color: string;
};

export type ProbabilityChartSlide = {
	type: 'probability-chart';
	startInSeconds: number;
	endInSeconds: number;
	kicker: string;
	title: string;
	subtitle: string;
	chartTitle: string;
	data: readonly ProbabilityChartDatum[];
};

export type LessonSlide =
	| LessonIntroSlide
	| FlowDiagramSlide
	| ProbabilityChartSlide;

export type LessonDefinition = {
	id: string;
	compositionId: string;
	videoSrc: string;
	videoDurationInSeconds: number;
	slides: readonly LessonSlide[];
};
