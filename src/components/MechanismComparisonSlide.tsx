import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {DiagramCard} from './DiagramCard';
import {OverlayFrame} from './OverlayFrame';

type MechanismComparisonSlideProps = {
	durationInFrames: number;
	kicker: string;
	title: string;
	subtitle: string;
	leftTitle: string;
	leftBody: string;
	leftBullets: readonly string[];
	rightTitle: string;
	rightBody: string;
	rightBullets: readonly string[];
};

export const MechanismComparisonSlide: React.FC<MechanismComparisonSlideProps> = ({
	durationInFrames,
	kicker,
	title,
	subtitle,
	leftTitle,
	leftBody,
	leftBullets,
	rightTitle,
	rightBody,
	rightBullets,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const boxReveal = spring({
		frame,
		fps,
		durationInFrames: 18,
		config: {damping: 200},
	});
	const leftReveal = spring({
		frame: frame - 8,
		fps,
		durationInFrames: 16,
		config: {damping: 200},
	});
	const rightReveal = spring({
		frame: frame - 18,
		fps,
		durationInFrames: 16,
		config: {damping: 200},
	});

	return (
		<OverlayFrame durationInFrames={durationInFrames}>
			<AbsoluteFill style={{padding: '72px 84px', display: 'flex', flexDirection: 'column'}}>
				<div style={{fontSize: 76, fontWeight: 900, maxWidth: 1180}}>{title}</div>
				<DiagramCard
					highlight
					style={{
						marginTop: 44,
						flex: 1,
						padding: '30px 30px 30px',
						transform: `scale(${0.97 + boxReveal * 0.03})`,
					}}
				>
					<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
						Transformer
					</div>
					<div
						style={{
							marginTop: 18,
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 24,
							height: 'calc(100% - 42px)',
							paddingBottom: 10,
							boxSizing: 'border-box',
						}}
					>
					<DiagramCard
						style={{
							padding: 30,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							background: 'linear-gradient(180deg, rgba(9,19,34,0.98), rgba(17,31,52,0.92))',
							boxShadow: '0 0 0 1px rgba(61,174,255,0.24), 0 0 30px rgba(61,174,255,0.12)',
							transform: `scale(${0.96 + leftReveal * 0.04})`,
							opacity: 0.78 + leftReveal * 0.22,
							height: '100%',
							boxSizing: 'border-box',
						}}
					>
						<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>ta lekcja</div>
						<div style={{height: 110}} />
						<div style={{fontSize: 56, fontWeight: 900, lineHeight: 1.04, marginBottom: 42}}>{leftTitle}</div>
						<div style={{marginTop: 'auto', fontSize: 26, color: '#8ad8ff', fontWeight: 700}}>ustala kontekst</div>
					</DiagramCard>
					<DiagramCard
						style={{
							padding: 30,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							background: 'rgba(255,255,255,0.03)',
							boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
							transform: `scale(${0.97 + rightReveal * 0.03})`,
							opacity: 0.38 + rightReveal * 0.18,
							height: '100%',
							boxSizing: 'border-box',
						}}
					>
						<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(244,247,251,0.62)'}}>następna lekcja</div>
						<div style={{height: 110}} />
						<div style={{fontSize: 56, fontWeight: 900, lineHeight: 1.04, marginBottom: 42}}>{rightTitle}</div>
						<div style={{marginTop: 'auto', fontSize: 26, color: 'rgba(244,247,251,0.66)', fontWeight: 700}}>przewiduje kolejny token</div>
					</DiagramCard>
				</div>
				</DiagramCard>
			</AbsoluteFill>
		</OverlayFrame>
	);
};
