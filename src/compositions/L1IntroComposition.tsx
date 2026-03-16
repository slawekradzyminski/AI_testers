import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Background} from '../components/Background';
import {SceneFrame} from '../components/SceneFrame';
import type {LessonData} from '../data/types';
import {secondsToFrames} from '../lib/constants';

type Props = {
	lesson: LessonData;
};

const glassPanel: React.CSSProperties = {
	background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
	border: '1px solid rgba(255,255,255,0.15)',
	boxShadow: '0 18px 38px rgba(0,0,0,0.18)',
	backdropFilter: 'blur(14px)',
	borderRadius: 28,
	color: '#f4f7fb',
};

const chipStyle: React.CSSProperties = {
	padding: '14px 20px',
	borderRadius: 999,
	background: 'rgba(138, 216, 255, 0.12)',
	border: '1px solid rgba(138, 216, 255, 0.28)',
	fontSize: 22,
	fontWeight: 700,
	letterSpacing: 1,
};

const tokenWords = ['Paryz', 'jest', 'stolica', 'Francji', '.'];

const animatedIn = (frame: number, fps: number, delay = 0) => {
	return spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 18, stiffness: 110, mass: 0.8},
	});
};

const fadeSlide = (frame: number, start: number, end: number, from = 40) => {
	const opacity = interpolate(frame, [start, end], [0, 1], {
		easing: Easing.out(Easing.cubic),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const translateY = interpolate(frame, [start, end], [from, 0], {
		easing: Easing.out(Easing.cubic),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return {opacity, transform: `translateY(${translateY}px)`};
};

const LowerThird: React.FC = () => {
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				bottom: 0,
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
				<div style={{fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
					Prowadzacy
				</div>
				<div style={{fontSize: 28, fontWeight: 700}}>Slawek</div>
			</div>
		</div>
	);
};

const IntroScene: React.FC<{lesson: LessonData; localFrame: number}> = ({lesson, localFrame}) => {
	const {fps} = useVideoConfig();
	const titleSpring = animatedIn(localFrame, fps, 4);
	const line = interpolate(localFrame, [0, 55], [0, 520], {
		extrapolateRight: 'clamp',
	});

	return (
		<SceneFrame
			eyebrow="AI Testers"
			title="Jak dziala LLM?"
			description="Lekcja otwierajaca serie: czym jest LLM, jak generuje tokeny i dlaczego trzeba myslec probabilistycznie."
		>
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 258,
					transform: `translateY(${(1 - titleSpring) * 80}px) scale(${0.92 + titleSpring * 0.08})`,
					opacity: titleSpring,
				}}
			>
				<div style={{fontSize: 138, fontWeight: 900, lineHeight: 0.95, maxWidth: 900}}>
					Jak dziala
					<br />
					LLM?
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 62,
					top: 560,
					width: line,
					height: 2,
					background: 'linear-gradient(90deg, rgba(61,174,255,0.95), rgba(255,209,102,0.7))',
					boxShadow: '0 0 20px rgba(61,174,255,0.5)',
				}}
			/>
			<div style={{position: 'absolute', left: 58, bottom: 56, ...fadeSlide(localFrame, 22, 54)}}>
				<LowerThird />
			</div>
			<div
				style={{
					position: 'absolute',
					right: 72,
					top: 150,
					width: 420,
					height: 420,
					borderRadius: 32,
					...glassPanel,
					padding: 28,
					transform: `translateY(${(1 - titleSpring) * 40}px)`,
					opacity: titleSpring,
				}}
			>
				<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
					Lekcja 1
				</div>
				<div style={{marginTop: 14, fontSize: 42, lineHeight: 1.08, fontWeight: 800}}>
					Podstawy modeli jezykowych
				</div>
				<div style={{marginTop: 22, display: 'grid', gap: 14}}>
					<div style={chipStyle}>tokenizacja</div>
					<div style={chipStyle}>transformer</div>
					<div style={chipStyle}>probabilistyka</div>
				</div>
			</div>
		</SceneFrame>
	);
};

const AcronymScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const expansion = interpolate(localFrame, [10, 44], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<SceneFrame
			eyebrow="Definicja"
			title="Large Language Model"
			description="Najpierw widzisz skrot. Potem rozwija sie pelna nazwa i proste wyjasnienie, co ten model faktycznie robi."
			align="center"
		>
			<div
				style={{
					marginTop: 88,
					fontSize: 260,
					fontWeight: 900,
					letterSpacing: `${Math.round(expansion * 28)}px`,
					textAlign: 'center',
					transform: `scale(${0.9 + expansion * 0.1})`,
				}}
			>
				LLM
			</div>
			<div
				style={{
					marginTop: 24,
					display: 'grid',
					justifyContent: 'center',
					gap: 14,
					opacity: expansion,
					transform: `translateY(${(1 - expansion) * 32}px)`,
				}}
			>
				<div style={{fontSize: 42, fontWeight: 700}}>Przewiduje kolejny token</div>
				<div style={{fontSize: 24, color: 'rgba(244,247,251,0.7)'}}>
					statystyczny mechanizm generowania tekstu
				</div>
			</div>
		</SceneFrame>
	);
};

const PredictionScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const visibleCount = Math.min(tokenWords.length, Math.floor(localFrame / 16) + 1);

	return (
		<SceneFrame
			eyebrow="Predykcja"
			title="Model nie pisze calej odpowiedzi naraz"
			description="Najpierw wybiera nastepny prawdopodobny token, potem kolejny. Krok po kroku, token po tokenie."
		>
			<div
				style={{
					position: 'absolute',
					left: 58,
					right: 58,
					top: 300,
					padding: '24px 28px',
					...glassPanel,
				}}
			>
				<div style={{fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
					Input
				</div>
				<div style={{marginTop: 10, fontSize: 40, fontWeight: 700}}>
					Jaka jest stolica Francji?
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 58,
					right: 58,
					top: 470,
					display: 'flex',
					gap: 18,
					flexWrap: 'wrap',
				}}
			>
				{tokenWords.slice(0, visibleCount).map((token, index) => {
					const appear = animatedIn(localFrame, 30, index * 10);
					return (
						<div
							key={token}
							style={{
								padding: '18px 24px',
								borderRadius: 18,
								background:
									'linear-gradient(180deg, rgba(72, 209, 255, 0.32), rgba(48, 111, 255, 0.18))',
								border: '1px solid rgba(138, 216, 255, 0.38)',
								fontSize: 34,
								fontWeight: 700,
								transform: `translateY(${(1 - appear) * 34}px) scale(${0.9 + appear * 0.1})`,
								opacity: appear,
								boxShadow: '0 12px 30px rgba(16, 106, 255, 0.16)',
							}}
						>
							{token}
						</div>
					);
				})}
				<div
					style={{
						width: 12,
						height: 42,
						borderRadius: 6,
						background: '#ffd166',
						opacity: localFrame % 24 < 12 ? 1 : 0.24,
						alignSelf: 'center',
						marginLeft: 6,
					}}
				/>
			</div>
		</SceneFrame>
	);
};

const FlowScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const flow = interpolate(localFrame, [0, 80], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const tokenShift = interpolate(flow, [0, 1], [0, 1]);

	return (
		<SceneFrame
			eyebrow="Flow"
			title="Input -> tokenizacja -> transformer -> output"
			description="Glowny diagram odcinka: tekst zmienia sie w liczby, trafia do czarnej skrzynki i wraca jako odpowiedz."
		>
			<div
				style={{
					position: 'absolute',
					left: 48,
					right: 48,
					top: 300,
					display: 'grid',
					gridTemplateColumns: '1.35fr 0.95fr 1.05fr 0.95fr',
					gap: 22,
					alignItems: 'center',
				}}
			>
				{['Jaka jest stolica Francji?', '3812 902 441 88', 'Transformer', 'Paryz'].map(
					(label, index) => (
						<div
							key={label}
							style={{
								padding: '30px 28px',
								minHeight: 140,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								fontSize: index === 2 ? 44 : 34,
								fontWeight: index === 2 ? 800 : 700,
								borderRadius: 30,
								...glassPanel,
								background:
									index === 2
										? 'linear-gradient(180deg, rgba(5, 8, 16, 0.96), rgba(18, 27, 44, 0.92))'
										: glassPanel.background,
								boxShadow:
									index === 2
										? '0 0 0 1px rgba(138,216,255,0.18), 0 0 36px rgba(37, 143, 255, 0.2)'
										: glassPanel.boxShadow,
							}}
						>
							{label}
						</div>
					),
				)}
			</div>
			<div style={{position: 'absolute', left: 420, top: 530}}>
				<div
					style={{
						width: 460 * flow,
						height: 4,
						borderRadius: 999,
						background: 'linear-gradient(90deg, #79f0ff 0%, #3daeff 55%, #ffd166 100%)',
						boxShadow: '0 0 20px rgba(61,174,255,0.55)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: -20,
						display: 'flex',
						gap: 28,
						transform: `translateX(${tokenShift * 430}px)`,
					}}
				>
					{['ja', 'ka', 'stol', 'ica'].map((t) => (
						<div
							key={t}
							style={{
								padding: '10px 14px',
								borderRadius: 14,
								background: 'rgba(121,240,255,0.15)',
								border: '1px solid rgba(121,240,255,0.34)',
								fontSize: 20,
								fontWeight: 700,
							}}
						>
							{t}
						</div>
					))}
				</div>
			</div>
		</SceneFrame>
	);
};

const PromptModelScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const reveal = animatedIn(localFrame, 30, 8);
	return (
		<SceneFrame
			eyebrow="Rownanie"
			title="Wynik = f(prompt, model)"
			description="Prompt i wybrany model razem ksztaltuja odpowiedz. To nie jest jedno zrodlo wyniku."
			align="center"
		>
			<div
				style={{
					marginTop: 72,
					fontSize: 88,
					fontWeight: 900,
					textAlign: 'center',
					opacity: reveal,
					transform: `translateY(${(1 - reveal) * 40}px)`,
				}}
			>
				Wynik = f(prompt, model)
			</div>
			<div
				style={{
					marginTop: 52,
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 22,
				}}
			>
				<div style={{...glassPanel, padding: '26px 28px'}}>
					<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
						Prompt
					</div>
					<div style={{marginTop: 12, fontSize: 34, lineHeight: 1.2}}>
						Kim jest Slawomir Radzyminski?
					</div>
				</div>
				<div style={{...glassPanel, padding: '26px 28px'}}>
					<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
						Model
					</div>
					<div style={{marginTop: 12, display: 'grid', gap: 12, fontSize: 28}}>
						<div>5.3: szybka odpowiedz</div>
						<div>5.4: model myslacy</div>
					</div>
				</div>
			</div>
		</SceneFrame>
	);
};

const ModelCardsScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const items = [
		['Programowanie', 'mocny wybor'],
		['Obrazki', 'zalezy od narzedzia'],
		['Deep Research', 'dobor pod zadanie'],
		['Codzienny chat', 'komfort i szybkosc'],
	];

	return (
		<SceneFrame
			eyebrow="Task fit"
			title="Rozne modele do roznych zadan"
			description="Zamiast szukac jednego zwyciezcy do wszystkiego, lepiej dopasowac model do rodzaju pracy."
		>
			<div
				style={{
					position: 'absolute',
					left: 58,
					right: 58,
					top: 300,
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: 20,
				}}
			>
				{items.map(([title, badge], index) => {
					const appear = animatedIn(localFrame, 30, index * 8);
					return (
						<div
							key={title}
							style={{
								padding: '24px 24px 30px',
								borderRadius: 28,
								...glassPanel,
								transform: `translateY(${(1 - appear) * 44}px)`,
								opacity: appear,
							}}
						>
							<div style={{...chipStyle, display: 'inline-flex', fontSize: 16, padding: '10px 14px'}}>
								{badge}
							</div>
							<div style={{marginTop: 18, fontSize: 34, lineHeight: 1.08, fontWeight: 800}}>{title}</div>
						</div>
					);
				})}
			</div>
		</SceneFrame>
	);
};

const ChatUiScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const dropdown = interpolate(localFrame, [8, 26], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const streamCount = Math.min(5, Math.floor(Math.max(0, localFrame - 36) / 12) + 1);

	return (
		<SceneFrame
			eyebrow="UI + streaming"
			title="Wybor modelu i odpowiedz na zywo"
			description="Ta scena ma wygladac jak prawdziwy interfejs: dropdown modelu, prompt, tool call i odpowiedz dopisywana na zywo."
		>
			<div
				style={{
					position: 'absolute',
					left: 120,
					right: 120,
					top: 262,
					bottom: 110,
					padding: 28,
					borderRadius: 34,
					...glassPanel,
				}}
			>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
					<div>
						<div style={{fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: '#8ad8ff'}}>
							chat ui
						</div>
						<div style={{marginTop: 10, fontSize: 28}}>Kim jest Slawomir Radzyminski?</div>
					</div>
					<div style={{width: 250}}>
						<div
							style={{
								padding: '16px 18px',
								borderRadius: 20,
								background: 'rgba(255,255,255,0.08)',
								border: '1px solid rgba(255,255,255,0.14)',
								fontSize: 22,
								fontWeight: 700,
							}}
						>
							Model 5.3
						</div>
						<div
							style={{
								marginTop: 10,
								padding: '10px',
								borderRadius: 20,
								background: 'rgba(7,15,28,0.92)',
								border: '1px solid rgba(255,255,255,0.12)',
								opacity: dropdown,
								transform: `translateY(${(1 - dropdown) * -18}px)`,
							}}
						>
							<div style={{padding: '12px 14px', borderRadius: 14, background: 'rgba(61,174,255,0.14)'}}>
									5.3: szybka odpowiedz
								</div>
								<div style={{padding: '12px 14px', borderRadius: 14, marginTop: 8}}>5.4: model myslacy</div>
						</div>
					</div>
				</div>
				<div style={{marginTop: 26, display: 'flex', gap: 12}}>
					{['thinking', 'tool call', 'web search', 'response'].map((label, index) => (
						<div
							key={label}
							style={{
								...chipStyle,
								opacity: localFrame > 26 + index * 8 ? 1 : 0.35,
							}}
						>
							{label}
						</div>
					))}
				</div>
				<div style={{marginTop: 32, display: 'grid', gap: 12}}>
					{tokenWords.slice(0, streamCount).map((token, index) => (
						<div
							key={token}
							style={{
								padding: '18px 20px',
								borderRadius: 18,
								background: index === streamCount - 1 ? 'rgba(255,209,102,0.16)' : 'rgba(255,255,255,0.06)',
								border: '1px solid rgba(255,255,255,0.12)',
								fontSize: 28,
								fontWeight: 700,
							}}
						>
							{token}
						</div>
					))}
				</div>
			</div>
		</SceneFrame>
	);
};

const ImageCardScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const enter = animatedIn(localFrame, 30, 6);
	const tilt = interpolate(localFrame, [40, 78], [0, -6], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<SceneFrame
			eyebrow="Obrazki"
			title="Efekt bywa efektowny, ale nie zawsze produkcyjny"
			description="Ten moment ma lekko autoironiczny ton: karta wyglada efektownie, a potem przyznaje, ze wynik jest tylko niezly."
		>
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: 250,
					width: 680,
					height: 420,
					marginLeft: -340,
					padding: 26,
					borderRadius: 34,
					background:
						'linear-gradient(135deg, rgba(255,180,90,0.18), rgba(61,174,255,0.22)), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
					border: '1px solid rgba(255,255,255,0.16)',
					boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
					transform: `translateX(-50%) translateY(${(1 - enter) * 42}px) scale(${0.92 + enter * 0.08}) rotate(${tilt}deg)`,
					opacity: enter,
				}}
			>
				<div
					style={{
						height: '100%',
						borderRadius: 24,
						background:
							'radial-gradient(circle at 28% 28%, rgba(255,255,255,0.48), transparent 18%), linear-gradient(135deg, #2b8cff 0%, #ffb84a 50%, #fe6f61 100%)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: 34,
						bottom: 34,
						padding: '16px 20px',
						borderRadius: 20,
						background: 'rgba(7,15,28,0.82)',
						border: '1px solid rgba(255,255,255,0.12)',
						fontSize: 26,
						fontWeight: 700,
					}}
				>
					No i efekt jest taki sobie
				</div>
			</div>
		</SceneFrame>
	);
};

const ProbabilityScene: React.FC<{localFrame: number}> = ({localFrame}) => {
	const bars = [0.88, 0.6, 0.32];
	const checklist = [
		'Dobry prompt podnosi szanse',
		'Dobry model podnosi szanse',
		'Nigdy nie ma pelnej gwarancji',
	];

	return (
		<SceneFrame
			eyebrow="Probabilistyka"
			title="To swiat prawdopodobienstwa, nie 100% pewnosci"
			description="Final ma byc spokojniejszy, ale mocny: rozklad wynikow, wybrana sciezka i jedno czytelne przeslanie na koniec."
		>
			<div
				style={{
					position: 'absolute',
					left: 90,
					right: 90,
					top: 290,
					display: 'grid',
					gridTemplateColumns: '1.1fr 1fr',
					gap: 50,
					alignItems: 'end',
				}}
			>
				<div>
					<div style={{display: 'flex', gap: 28, alignItems: 'end', height: 260}}>
						{bars.map((value, index) => {
							const grow = interpolate(localFrame, [index * 8, 28 + index * 8], [0, value], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							return (
								<div key={value} style={{flex: 1}}>
									<div
										style={{
											height: `${grow * 240}px`,
											borderRadius: '24px 24px 8px 8px',
											background:
												index === 0
													? 'linear-gradient(180deg, #79f0ff 0%, #3daeff 100%)'
													: 'linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
											boxShadow:
												index === 0 ? '0 0 24px rgba(61,174,255,0.38)' : undefined,
										}}
									/>
									<div style={{marginTop: 14, textAlign: 'center', fontSize: 20, color: 'rgba(244,247,251,0.72)'}}>
											{index === 0 ? 'bardzo prawdopodobne' : index === 1 ? 'mozliwe' : 'malo prawdopodobne'}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div style={{display: 'grid', gap: 18}}>
					{checklist.map((item, index) => {
						const reveal = animatedIn(localFrame, 30, 30 + index * 8);
						return (
							<div
								key={item}
								style={{
									padding: '20px 22px',
									borderRadius: 22,
									...glassPanel,
									transform: `translateY(${(1 - reveal) * 30}px)`,
									opacity: reveal,
								}}
							>
								{item}
							</div>
						);
					})}
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 56,
					textAlign: 'center',
					fontSize: 44,
					fontWeight: 800,
					color: '#ffd166',
					...fadeSlide(localFrame, 48, 80, 18),
				}}
			>
				Mysl probabilistycznie, nie zero-jedynkowo
			</div>
		</SceneFrame>
	);
};

const getScene = (timeInSeconds: number) => {
	if (timeInSeconds < 11) {
		return {name: 'intro', start: 0};
	}

	if (timeInSeconds < 17) {
		return {name: 'acronym', start: 11};
	}

	if (timeInSeconds < 32) {
		return {name: 'prediction', start: 17};
	}

	if (timeInSeconds < 76) {
		return {name: 'flow', start: 32};
	}

	if (timeInSeconds < 107) {
		return {name: 'prompt', start: 76};
	}

	if (timeInSeconds < 151) {
		return {name: 'cards', start: 107};
	}

	if (timeInSeconds < 196) {
		return {name: 'chat', start: 151};
	}

	if (timeInSeconds < 224) {
		return {name: 'image', start: 196};
	}

	return {name: 'probability', start: 224};
};

export const L1IntroComposition: React.FC<Props> = ({lesson}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const timeInSeconds = frame / fps;
	const scene = getScene(timeInSeconds);
	const localFrame = frame - secondsToFrames(scene.start);

	return (
		<AbsoluteFill
			style={{
				fontFamily: '"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif',
				color: '#f4f7fb',
			}}
		>
			<Background />
			{scene.name === 'intro' ? <IntroScene lesson={lesson} localFrame={localFrame} /> : null}
			{scene.name === 'acronym' ? <AcronymScene localFrame={localFrame} /> : null}
			{scene.name === 'prediction' ? <PredictionScene localFrame={localFrame} /> : null}
			{scene.name === 'flow' ? <FlowScene localFrame={localFrame} /> : null}
			{scene.name === 'prompt' ? <PromptModelScene localFrame={localFrame} /> : null}
			{scene.name === 'cards' ? <ModelCardsScene localFrame={localFrame} /> : null}
			{scene.name === 'chat' ? <ChatUiScene localFrame={localFrame} /> : null}
			{scene.name === 'image' ? <ImageCardScene localFrame={localFrame} /> : null}
			{scene.name === 'probability' ? <ProbabilityScene localFrame={localFrame} /> : null}
		</AbsoluteFill>
	);
};
