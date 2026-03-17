import React from 'react';
import {AbsoluteFill} from 'remotion';
import {OverlayFrame, glassPanelStyle} from './OverlayFrame';

/** 1. LLM expansion: 0:11–0:17 (6s). LLM → Large Language Model + "Przewiduje kolejny token" */
export const LLMOverlay: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
	<OverlayFrame durationInFrames={durationInFrames}>
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 80,
			}}
		>
			<div
				style={{
					fontSize: 120,
					fontWeight: 900,
					letterSpacing: '20px',
					background: 'linear-gradient(135deg, #f8fbff 0%, #8ad8ff 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
				}}
			>
				LLM
			</div>
			<div
				style={{
					width: 280,
					height: 2,
					marginTop: 28,
					borderRadius: 2,
					background: 'linear-gradient(90deg, rgba(61,174,255,0.9), rgba(255,209,102,0.8))',
				}}
			/>
			<div
				style={{
					marginTop: 28,
					fontSize: 48,
					fontWeight: 700,
					textAlign: 'center',
					lineHeight: 1.3,
				}}
			>
				Large Language Model
			</div>
			<div
				style={{
					marginTop: 20,
					fontSize: 28,
					color: 'rgba(244, 247, 251, 0.85)',
				}}
			>
				Przewiduje kolejny token
			</div>
		</AbsoluteFill>
	</OverlayFrame>
);

/** 2. Flow diagram: 0:26–0:46 (20s). Input → Tokenizacja → Transformer → Output */
export const FlowOverlay: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
	<OverlayFrame durationInFrames={durationInFrames}>
		<AbsoluteFill
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 60,
			}}
		>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.2fr 0.8fr 1fr 0.9fr',
					gap: 20,
					width: '100%',
					maxWidth: 1600,
				}}
			>
				{[
					{label: 'Input', text: 'Jaka jest stolica Francji?', size: 32},
					{label: 'Tokenizacja', text: '3812 902 441 88', size: 28},
					{
						label: 'Transformer',
						text: 'Transformer',
						size: 36,
						highlight: true,
					},
					{label: 'Output', text: 'Paryż', size: 36},
				].map(({label, text, size, highlight}) => (
					<div
						key={label}
						style={{
							padding: '28px 24px',
							minHeight: 120,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							borderRadius: 24,
							...glassPanelStyle,
							background: highlight
								? 'linear-gradient(180deg, rgba(5, 8, 16, 0.96), rgba(18, 27, 44, 0.92))'
								: glassPanelStyle.background,
							boxShadow: highlight
								? '0 0 0 1px rgba(138,216,255,0.2), 0 0 32px rgba(37, 143, 255, 0.25)'
								: glassPanelStyle.boxShadow,
						}}
					>
						<div
							style={{
								fontSize: 14,
								letterSpacing: 3,
								textTransform: 'uppercase',
								color: '#8ad8ff',
								marginBottom: 10,
							}}
						>
							{label}
						</div>
						<div style={{fontSize: size, fontWeight: 700}}>{text}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	</OverlayFrame>
);

/** 3. Formula card: 1:16–1:26 (10s). Wynik = f(prompt, model) */
export const FormulaOverlay: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
	<OverlayFrame durationInFrames={durationInFrames}>
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 80,
			}}
		>
			<div
				style={{
					fontSize: 72,
					fontWeight: 900,
					background: 'linear-gradient(135deg, #f8fbff 0%, #8ad8ff 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
				}}
			>
				Wynik = f(prompt, model)
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 24,
					marginTop: 48,
					maxWidth: 900,
				}}
			>
				<div style={{padding: '24px 28px', borderRadius: 24, ...glassPanelStyle}}>
					<div
						style={{
							fontSize: 14,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#8ad8ff',
							marginBottom: 12,
						}}
					>
						Prompt
					</div>
					<div style={{fontSize: 26, lineHeight: 1.3}}>Kim jest Sławomir Radzymiński?</div>
				</div>
				<div style={{padding: '24px 28px', borderRadius: 24, ...glassPanelStyle}}>
					<div
						style={{
							fontSize: 14,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#8ad8ff',
							marginBottom: 12,
						}}
					>
						Model
					</div>
					<div style={{fontSize: 24, display: 'grid', gap: 8}}>
						<div>5.3: szybka odpowiedź</div>
						<div>5.4: model myślący</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	</OverlayFrame>
);
