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
	const maxLabelWidth = 116;

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
						marginTop: 10,
						fontSize: 52,
						fontWeight: 800,
						color: 'rgba(244,247,251,0.95)',
						textAlign: 'center',
					}}
				>
					{title}
				</div>
				<div
					style={{
						marginTop: 10,
						fontSize: 30,
						color: 'rgba(244,247,251,0.85)',
						textAlign: 'center',
						maxWidth: 900,
					}}
				>
					{subtitle}
				</div>
				<DiagramCard
					style={{
						marginTop: 30,
						width: '100%',
						maxWidth: 1180,
						padding: 40,
					}}
				>
					<div
						style={{
							fontSize: 22,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#8ad8ff',
							marginBottom: 28,
							fontWeight: 600,
						}}
					>
						{chartTitle}
					</div>
					<div style={{display: 'grid', gap: 22}}>
						{data.map((entry) => (
							<div
								key={entry.token}
								style={{
									display: 'grid',
									gridTemplateColumns: `${maxLabelWidth + 34}px 1fr 88px`,
									alignItems: 'center',
									gap: 22,
								}}
							>
								<div
									style={{
										fontSize: 28,
										fontWeight: 700,
										color: 'rgba(244,247,251,0.92)',
										textAlign: 'right',
									}}
								>
									{entry.token}
								</div>
								<div
									style={{
										height: 42,
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
										fontSize: 26,
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
