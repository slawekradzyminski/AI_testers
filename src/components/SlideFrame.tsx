import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from './Background';
import {slideFontFamily} from './slideTheme';

type SlideFrameProps = {
	children: React.ReactNode;
	durationInFrames?: number;
	fadeFrames?: number;
};

export const SlideFrame: React.FC<SlideFrameProps> = ({
	children,
	durationInFrames,
	fadeFrames = 15,
}) => {
	const frame = useCurrentFrame();
	const opacity =
		durationInFrames === undefined
			? 1
			: interpolate(
					frame,
					[0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
					[0, 1, 1, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);

	return (
		<AbsoluteFill
			style={{
				fontFamily: slideFontFamily,
				color: '#f4f7fb',
				opacity,
			}}
		>
			<Background />
			{children}
		</AbsoluteFill>
	);
};
