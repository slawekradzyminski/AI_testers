import {Composition} from 'remotion';
import {L1EnhancedComposition, l1EnhancedCalculateMetadata} from './compositions/L1EnhancedComposition';
import {L1IntroComposition} from './compositions/L1IntroComposition';
import {l1Lesson} from './data/generated/l1-subs';
import {FPS, HEIGHT, WIDTH, secondsToFrames} from './lib/constants';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="L1Intro"
				component={L1IntroComposition}
				durationInFrames={secondsToFrames(11)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{lesson: l1Lesson}}
			/>
			<Composition
				id="L1Enhanced"
				component={L1EnhancedComposition}
				calculateMetadata={l1EnhancedCalculateMetadata}
				durationInFrames={secondsToFrames(20)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					lesson: l1Lesson,
					videoDurationInSeconds: 310,
				}}
			/>
		</>
	);
};
