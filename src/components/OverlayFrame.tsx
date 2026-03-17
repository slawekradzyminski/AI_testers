import React from 'react';
import {SlideFrame} from './SlideFrame';
export {glassPanelStyle} from './slideTheme';

type OverlayFrameProps = {
	children: React.ReactNode;
	/** Total duration in frames for this overlay */
	durationInFrames: number;
	/** Fade in/out duration in frames */
	fadeFrames?: number;
};

/** Backwards-compatible wrapper for slide overlays with fade in/out. */
export const OverlayFrame: React.FC<OverlayFrameProps> = ({
	children,
	durationInFrames,
	fadeFrames = 15,
}) => {
	return (
		<SlideFrame durationInFrames={durationInFrames} fadeFrames={fadeFrames}>
			{children}
		</SlideFrame>
	);
};
