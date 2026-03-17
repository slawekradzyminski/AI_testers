import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './Background';

export type LessonIntroProps = {
	/** Series/brand name, e.g. "AI Testers" */
	seriesName: string;
	/** Lesson number, e.g. 1 */
	lessonNumber: number;
	/** Main title, e.g. "Jak działa LLM?" */
	title: string;
	/** Subtitle or short description */
	subtitle: string;
	/** Presenter name for lower third */
	presenterName?: string;
};

const glassPanel: React.CSSProperties = {
	background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
	border: '1px solid rgba(255,255,255,0.15)',
	boxShadow: '0 18px 38px rgba(0,0,0,0.18)',
	backdropFilter: 'blur(14px)',
	borderRadius: 28,
	color: '#f4f7fb',
};

/** Reusable full-screen lesson intro. Same style for L1, L2, L3, etc. */
export const LessonIntro: React.FC<LessonIntroProps> = ({
	seriesName,
	lessonNumber,
	title,
	subtitle,
	presenterName = 'Sławek',
}) => {
	return (
		<AbsoluteFill
			style={{
				fontFamily: '"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif',
				color: '#f4f7fb',
			}}
		>
			<Background />
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 120,
				}}
			>
				<div
					style={{
						fontSize: 14,
						letterSpacing: 6,
						textTransform: 'uppercase',
						color: 'rgba(138, 216, 255, 0.9)',
						marginBottom: 24,
						fontWeight: 600,
					}}
				>
					{seriesName} · Lekcja {lessonNumber}
				</div>
				<h1
					style={{
						fontSize: 140,
						fontWeight: 900,
						lineHeight: 1,
						textAlign: 'center',
						margin: 0,
						background: 'linear-gradient(135deg, #f8fbff 0%, #b8d4e8 50%, #8ad8ff 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
					}}
				>
					{title.split('\n').map((line, i) => (
						<React.Fragment key={i}>
							{i > 0 && <br />}
							{line}
						</React.Fragment>
					))}
				</h1>
				<div
					style={{
						width: 320,
						height: 3,
						marginTop: 36,
						borderRadius: 2,
						background: 'linear-gradient(90deg, rgba(61,174,255,0.9), rgba(255,209,102,0.8))',
						boxShadow: '0 0 24px rgba(61,174,255,0.4)',
					}}
				/>
				<p
					style={{
						fontSize: 32,
						fontWeight: 500,
						color: 'rgba(244, 247, 251, 0.85)',
						marginTop: 32,
						textAlign: 'center',
						maxWidth: 720,
						lineHeight: 1.4,
					}}
				>
					{subtitle}
				</p>
				<div style={{position: 'absolute', left: 72, bottom: 72}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							padding: '18px 22px',
							borderRadius: 28,
							...glassPanel,
						}}
					>
						<div
							style={{
								width: 48,
								height: 48,
								borderRadius: 999,
								background: 'linear-gradient(135deg, #3daeff 0%, #ffd166 100%)',
							}}
						/>
						<div>
							<div
								style={{
									fontSize: 14,
									letterSpacing: 3,
									textTransform: 'uppercase',
									color: '#8ad8ff',
								}}
							>
								Prowadzący
							</div>
							<div style={{fontSize: 28, fontWeight: 700}}>{presenterName}</div>
						</div>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
