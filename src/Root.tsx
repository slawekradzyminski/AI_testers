import {Composition} from 'remotion';
import {L1IntroComposition} from './compositions/L1IntroComposition';
import {l1Lesson} from './data/generated/l1-subs';
import {FPS, HEIGHT, WIDTH, secondsToFrames} from './lib/constants';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="L1Intro"
				component={L1IntroComposition}
				durationInFrames={secondsToFrames(l1Lesson.durationInSeconds)}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{lesson: l1Lesson}}
			/>
		</>
	);
};
