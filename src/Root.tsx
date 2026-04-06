import {Composition} from 'remotion';
import {l5Definition} from './content/l5';
import {calculateLessonMetadata, LessonComposition} from './compositions/LessonComposition';
import {SlideComposition} from './compositions/SlideComposition';
import {FPS, HEIGHT, WIDTH, secondsToFrames} from './lib/constants';

const getSlideDuration = (index: number) =>
	secondsToFrames(l5Definition.slides[index].endInSeconds - l5Definition.slides[index].startInSeconds);

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id={l5Definition.compositionId}
				component={LessonComposition}
				calculateMetadata={calculateLessonMetadata}
				durationInFrames={secondsToFrames(l5Definition.videoDurationInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{lesson: l5Definition}}
			/>
			<Composition
				id="L5Intro"
				component={SlideComposition}
				durationInFrames={getSlideDuration(0)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{slide: l5Definition.slides[0], durationInFrames: getSlideDuration(0)}}
			/>
			<Composition
				id="L5MechanizmyTransformera"
				component={SlideComposition}
				durationInFrames={getSlideDuration(1)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{slide: l5Definition.slides[1], durationInFrames: getSlideDuration(1)}}
			/>
		</>
	);
};
