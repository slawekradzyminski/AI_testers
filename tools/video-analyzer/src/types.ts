export type CliOptions = {
	lessonId: string;
	inputPath: string;
	outputDir: string;
	model: string;
	segmentLengthSeconds: number;
	segmentOverlapSeconds: number;
	maxSegments: number | null;
	selectedSegmentIndexes: number[] | null;
	dryRun: boolean;
	keepAudio: boolean;
	keepRemoteFiles: boolean;
	pollIntervalMs: number | null;
	pollAttempts: number | null;
	analysisWidth: number;
};

export type VideoMetadata = {
	durationSeconds: number;
	sizeBytes: number | null;
	width: number | null;
	height: number | null;
	frameRate: string | null;
};

export type VideoSegment = {
	id: string;
	index: number;
	startSeconds: number;
	endSeconds: number;
	durationSeconds: number;
	fileName: string;
};

export type RenderedSegment = VideoSegment & {
	lessonId: string;
	outputPath: string;
};

export type Workspace = {
	outputDir: string;
	clipsDir: string;
	responsesDir: string;
};

export type ModelEvent = {
	relativeStart: number;
	relativeEnd: number;
	screenSummary: string;
	visibleSubjects: string;
	actions: string;
	onScreenText: string;
	compositionNotes: string;
	placementHint: string;
	visualClutter: string;
	confidence: number;
};

export type ParsedModelResponse = {
	summary: string;
	events: ModelEvent[];
};

export type NormalizedEvent = ModelEvent & {
	absoluteStart: number;
	absoluteEnd: number;
};

export type SegmentAnalysis = {
	segmentId: string;
	windowStart: number;
	windowEnd: number;
	summary: string;
	events: NormalizedEvent[];
};

export type SceneDescription = {
	id: string;
	start: number;
	end: number;
	durationSeconds: number;
	screenSummary: string;
	visibleSubjects: string;
	actions: string;
	onScreenText: string;
	compositionNotes: string;
	placementHint: string;
	visualClutter: string;
	confidence: number;
};

export type StoredSegmentResponse = {
	segmentId: string;
	file?: {
		name?: string;
		uri?: string;
		mimeType?: string;
		state?: string | null;
	};
	responseText?: string;
	usageMetadata?: unknown;
	parsed: ParsedModelResponse;
};
