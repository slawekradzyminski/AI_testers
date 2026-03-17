import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import type {ProbabilityChartDatum} from '../content/types';
import {DiagramCard} from './DiagramCard';
import {OverlayFrame} from './OverlayFrame';

type ProbabilityChartSlideProps = {
	durationInFrames: number;
	kicker: string;
	title: string;
	subtitle: string;
	chartTitle: string;
	data: readonly ProbabilityChartDatum[];
};

export const ProbabilityChartSlide: React.FC<ProbabilityChartSlideProps> = ({
	durationInFrames,
	kicker,
	title,
	subtitle,
	chartTitle,
	data,
}) => {
	const frame = useCurrentFrame();
	const wobble = Math.sin(frame * 0.15) * 3;
	const maxLabelWidth = 92;

	return (
		<OverlayFrame durationInFrames={durationInFrames}>
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 60,
				}}
			>
				<div
					style={{
						fontSize: 64,
						fontWeight: 900,
						color: '#ffd166',
						textAlign: 'center',
						transform: `rotate(${wobble}deg)`,
						textShadow: '0 0 32px rgba(255,209,102,0.5)',
					}}
				>
					{kicker}
				</div>
				<div
					style={{
						marginTop: 16,
						fontSize: 42,
						fontWeight: 800,
						color: 'rgba(244,247,251,0.95)',
						textAlign: 'center',
					}}
				>
					{title}
				</div>
				<div
					style={{
						marginTop: 12,
						fontSize: 24,
						color: 'rgba(244,247,251,0.85)',
						textAlign: 'center',
						maxWidth: 560,
					}}
				>
					{subtitle}
				</div>
				<DiagramCard
					style={{
						marginTop: 32,
						width: '100%',
						maxWidth: 640,
						height: 280,
						padding: 24,
					}}
				>
					<div
						style={{
							fontSize: 14,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#8ad8ff',
							marginBottom: 16,
							fontWeight: 600,
						}}
					>
						{chartTitle}
					</div>
					<div style={{display: 'grid', gap: 14}}>
						{data.map((entry) => (
							<div
								key={entry.token}
								style={{
									display: 'grid',
									gridTemplateColumns: `${maxLabelWidth}px 1fr 56px`,
									alignItems: 'center',
									gap: 14,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 700,
										color: 'rgba(244,247,251,0.92)',
										textAlign: 'right',
									}}
								>
									{entry.token}
								</div>
								<div
									style={{
										height: 26,
										borderRadius: 999,
										background: 'rgba(255,255,255,0.08)',
										overflow: 'hidden',
										boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
									}}
								>
									<div
										style={{
											width: `${entry.prob * 100}%`,
											height: '100%',
											borderRadius: 999,
											background: entry.color,
											boxShadow: `0 0 18px ${entry.color}`,
										}}
									/>
								</div>
								<div
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: 'rgba(244,247,251,0.8)',
									}}
								>
									{`${Math.round(entry.prob * 100)}%`}
								</div>
							</div>
						))}
					</div>
				</DiagramCard>
			</AbsoluteFill>
		</OverlayFrame>
	);
};
