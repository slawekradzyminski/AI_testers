import React from 'react';
import {AbsoluteFill} from 'remotion';
import {OverlayFrame, glassPanelStyle} from './OverlayFrame';

const blockStyle: React.CSSProperties = {
	width: '100%',
	maxWidth: 700,
	padding: '32px 40px',
	borderRadius: 20,
	fontSize: 36,
	fontWeight: 600,
	textAlign: 'center',
	...glassPanelStyle,
};

/** Flow diagram: Input → Transformer → Output (entry slide style, glass panels) */
export const FlowDiagramImage: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
	<OverlayFrame durationInFrames={durationInFrames}>
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 0,
				padding: 120,
			}}
		>
			{/* Input — glass, blue accent */}
			<div
				style={{
					...blockStyle,
					borderLeft: '4px solid rgba(61,174,255,0.8)',
				}}
			>
				What's the capital of France?
			</div>
			<div style={{height: 24, display: 'flex', alignItems: 'center'}}>
				<span style={{fontSize: 28, color: 'rgba(138,216,255,0.8)'}}>↓</span>
			</div>
			{/* Transformer — glass, orange accent */}
			<div
				style={{
					...blockStyle,
					padding: '36px 40px',
					fontSize: 42,
					fontWeight: 800,
					letterSpacing: 4,
					borderLeft: '4px solid rgba(255,209,102,0.9)',
				}}
			>
				TRANSFORMER
			</div>
			<div style={{height: 24, display: 'flex', alignItems: 'center'}}>
				<span style={{fontSize: 28, color: 'rgba(138,216,255,0.8)'}}>↓</span>
			</div>
			{/* Output — glass, blue-orange accent */}
			<div
				style={{
					...blockStyle,
					fontSize: 32,
					lineHeight: 1.4,
					borderLeft: '4px solid rgba(255,209,102,0.8)',
				}}
			>
				The capital of France is Paris.
			</div>
		</AbsoluteFill>
	</OverlayFrame>
);
