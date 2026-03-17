import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from './Background';

const glassPanel: React.CSSProperties = {
	background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
	border: '1px solid rgba(255,255,255,0.15)',
	boxShadow: '0 18px 38px rgba(0,0,0,0.18)',
	backdropFilter: 'blur(14px)',
	borderRadius: 28,
	color: '#f4f7fb',
};

export const glassPanelStyle = glassPanel;

type OverlayFrameProps = {
	children: React.ReactNode;
	/** Total duration in frames for this overlay */
	durationInFrames: number;
	/** Fade in/out duration in frames */
	fadeFrames?: number;
};

/** Full-screen overlay with Background, fade in/out, same style as intro. */
export const OverlayFrame: React.FC<OverlayFrameProps> = ({
	children,
	durationInFrames,
	fadeFrames = 15,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill
			style={{
				fontFamily: '"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif',
				color: '#f4f7fb',
				opacity,
			}}
		>
			<Background />
			{children}
		</AbsoluteFill>
	);
};
