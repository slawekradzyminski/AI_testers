import {Composition} from 'remotion';
import {l1Definition, l1IntroSlide} from './content/l1';
import {calculateLessonMetadata, LessonComposition} from './compositions/LessonComposition';
import {FPS, HEIGHT, WIDTH, secondsToFrames} from './lib/constants';
import {SlideComposition} from './compositions/SlideComposition';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="L1Intro"
				component={SlideComposition}
				durationInFrames={secondsToFrames(l1IntroSlide.endInSeconds - l1IntroSlide.startInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					slide: l1IntroSlide,
					durationInFrames: secondsToFrames(l1IntroSlide.endInSeconds - l1IntroSlide.startInSeconds),
				}}
			/>
			<Composition
				id={l1Definition.compositionId}
				component={LessonComposition}
				calculateMetadata={calculateLessonMetadata}
				durationInFrames={secondsToFrames(l1Definition.videoDurationInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{lesson: l1Definition}}
			/>
		</>
	);
};
