import React from 'react';
import {AbsoluteFill, Html5Video, Sequence, staticFile} from 'remotion';
import {ChaosImage} from '../components/ChaosImage';
import {FlowDiagramImage} from '../components/FlowDiagramImage';
import {L1IntroComposition} from './L1IntroComposition';
import type {LessonData} from '../data/types';
import {getDuration, L1_TIMESTAMPS} from '../../L1/L1_timestamps';
import {secondsToFrames} from '../lib/constants';

export type L1EnhancedProps = {
	lesson: LessonData;
	videoDurationInSeconds: number;
};

export const L1EnhancedComposition: React.FC<L1EnhancedProps> = ({
	lesson,
	videoDurationInSeconds,
}) => {
	const introFrames = secondsToFrames(getDuration('intro'));
	const flowFrames = secondsToFrames(getDuration('flowDiagram'));
	const chaosFrames = secondsToFrames(getDuration('chaos'));

	return (
		<AbsoluteFill
			style={{
				fontFamily: '"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif',
				color: '#f4f7fb',
			}}
		>
			<Html5Video
				src={staticFile('L1_intro.mp4')}
				style={{width: '100%', height: '100%', objectFit: 'contain'}}
			/>
			{/* Intro: 0–11s */}
			<Sequence durationInFrames={introFrames} name="Intro">
				<L1IntroComposition lesson={lesson} />
			</Sequence>
			{/* Flow diagram: 30–60s */}
			<Sequence
				from={secondsToFrames(L1_TIMESTAMPS.flowDiagram.start)}
				durationInFrames={flowFrames}
				name="Flow diagram"
			>
				<FlowDiagramImage durationInFrames={flowFrames} />
			</Sequence>
			{/* Chaos: 3:50–4:10 */}
			<Sequence
				from={secondsToFrames(L1_TIMESTAMPS.chaos.start)}
				durationInFrames={chaosFrames}
				name="Chaos"
			>
				<ChaosImage durationInFrames={chaosFrames} />
			</Sequence>
		</AbsoluteFill>
	);
};

export const l1EnhancedCalculateMetadata = ({
	props,
}: {
	props: L1EnhancedProps;
}): {durationInFrames: number} => {
	return {
		durationInFrames: secondsToFrames(props.videoDurationInSeconds),
	};
};
