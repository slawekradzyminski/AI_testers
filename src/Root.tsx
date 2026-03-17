import {Composition} from 'remotion';
import {l1Definition, l1DiagramSlide, l1IntroSlide, l1LogitsSlide} from './content/l1';
import {calculateLessonMetadata, LessonComposition} from './compositions/LessonComposition';
import {FPS, HEIGHT, WIDTH, secondsToFrames} from './lib/constants';
import {SlideComposition} from './compositions/SlideComposition';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="L1Intro"
				component={SlideComposition}
				durationInFrames={secondsToFrames(10)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					slide: l1IntroSlide,
					durationInFrames: secondsToFrames(10),
				}}
			/>
			<Composition
				id="L1Diagram"
				component={SlideComposition}
				durationInFrames={secondsToFrames(l1DiagramSlide.endInSeconds - l1DiagramSlide.startInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					slide: l1DiagramSlide,
					durationInFrames: secondsToFrames(l1DiagramSlide.endInSeconds - l1DiagramSlide.startInSeconds),
				}}
			/>
			<Composition
				id="L1Logits"
				component={SlideComposition}
				durationInFrames={secondsToFrames(l1LogitsSlide.endInSeconds - l1LogitsSlide.startInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					slide: l1LogitsSlide,
					durationInFrames: secondsToFrames(l1LogitsSlide.endInSeconds - l1LogitsSlide.startInSeconds),
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
