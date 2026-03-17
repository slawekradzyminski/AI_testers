import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {OverlayFrame} from './OverlayFrame';

type FlowDiagramSlideProps = {
	durationInFrames: number;
	svgPath: string;
};

export const FlowDiagramSlide: React.FC<FlowDiagramSlideProps> = ({durationInFrames, svgPath}) => (
	<OverlayFrame durationInFrames={durationInFrames}>
		<AbsoluteFill
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 36,
			}}
		>
			<Img
				src={staticFile(svgPath)}
				style={{
					width: '100%',
					maxWidth: 1480,
					maxHeight: 900,
					objectFit: 'contain',
					filter: 'drop-shadow(0 32px 60px rgba(0,0,0,0.28))',
				}}
			/>
		</AbsoluteFill>
	</OverlayFrame>
);
