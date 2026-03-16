import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const drift = interpolate(frame, [0, 300], [0, -120], {
		extrapolateRight: 'extend',
	});
	const orbit = interpolate(frame, [0, 240], [0, 1], {
		extrapolateRight: 'extend',
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at top left, rgba(43,198,255,0.22), transparent 28%), radial-gradient(circle at 80% 10%, rgba(255,168,76,0.12), transparent 24%), linear-gradient(145deg, #04101d 0%, #0a1830 42%, #050814 100%)',
				color: '#f4f7fb',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: -220,
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
					transform: `translate3d(${drift}px, ${drift * 0.35}px, 0)`,
					opacity: 0.18,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: 120,
					top: 90,
					width: 440,
					height: 440,
					borderRadius: 999,
					background: 'radial-gradient(circle, rgba(61,174,255,0.24), transparent 68%)',
					filter: 'blur(36px)',
					transform: `translate3d(${Math.sin(orbit) * 24}px, ${Math.cos(orbit) * 18}px, 0)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: -80,
					bottom: -140,
					width: 520,
					height: 520,
					borderRadius: 999,
					background: 'radial-gradient(circle, rgba(255,141,56,0.16), transparent 70%)',
					filter: 'blur(40px)',
				}}
			/>
		</AbsoluteFill>
	);
};
