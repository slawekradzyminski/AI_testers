import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {DiagramCard} from './DiagramCard';
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
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 0,
				padding: 84,
			}}
		>
			<DiagramCard
				style={{
					width: '100%',
					maxWidth: 1100,
					padding: 32,
					background: 'linear-gradient(180deg, rgba(16, 25, 43, 0.94), rgba(8, 14, 24, 0.9))',
					boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
				}}
			>
				<Img
					src={staticFile(svgPath)}
					style={{
						width: '100%',
						height: 560,
						objectFit: 'contain',
					}}
				/>
			</DiagramCard>
		</AbsoluteFill>
	</OverlayFrame>
);
