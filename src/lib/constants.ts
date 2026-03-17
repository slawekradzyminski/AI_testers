export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const secondsToFrameIndex = (seconds: number) => {
	return Math.round(seconds * FPS);
};

export const secondsToFrames = (seconds: number) => {
	return Math.max(1, Math.round(seconds * FPS));
};
