import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bar, BarChart, Cell, XAxis, YAxis} from 'recharts';
import {OverlayFrame, glassPanelStyle} from './OverlayFrame';

/** Next-token probabilities (logits → softmax). Top candidates for "The capital of France is _" */
const PROBABILITY_DATA = [
	{token: 'Paris', prob: 0.82, logit: 2.1},
	{token: 'Lyon', prob: 0.09, logit: 0.5},
	{token: 'France', prob: 0.04, logit: 0.1},
	{token: '...', prob: 0.03, logit: -0.2},
	{token: '???', prob: 0.02, logit: -0.5},
];

const CHART_COLORS = [
	'rgba(61,174,255,0.9)',
	'rgba(138,216,255,0.7)',
	'rgba(184,212,232,0.6)',
	'rgba(255,209,102,0.5)',
	'rgba(255,168,76,0.4)',
];

/** Chaos / probabilistic thinking: logits → probabilities bar chart */
export const ChaosImage: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
	const frame = useCurrentFrame();
	const wobble = Math.sin(frame * 0.15) * 3;

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
					???
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
					CHAOS MODE
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
					LLMs operate on probabilities. Not certainty.
				</div>
				{/* Probability bar chart in glass panel */}
				<div
					style={{
						marginTop: 32,
						width: '100%',
						maxWidth: 640,
						height: 280,
						padding: 24,
						...glassPanelStyle,
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
						Next-token probabilities (logits → softmax)
					</div>
					<BarChart
						width={592}
						height={200}
						data={PROBABILITY_DATA}
						layout="vertical"
						margin={{top: 0, right: 24, left: 0, bottom: 0}}
					>
						<XAxis
							type="number"
							domain={[0, 1]}
							tick={{fill: 'rgba(244,247,251,0.8)', fontSize: 12}}
							tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
						/>
						<YAxis
							type="category"
							dataKey="token"
							width={60}
							tick={{fill: 'rgba(244,247,251,0.9)', fontSize: 14}}
							axisLine={false}
							tickLine={false}
						/>
						<Bar dataKey="prob" radius={[0, 6, 6, 0]} maxBarSize={32}>
							{PROBABILITY_DATA.map((_, i) => (
								<Cell key={i} fill={CHART_COLORS[i]} />
							))}
						</Bar>
					</BarChart>
				</div>
			</AbsoluteFill>
		</OverlayFrame>
	);
};
