import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Background: React.FC = () => {
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
					right: 120,
					top: 90,
					width: 440,
					height: 440,
					borderRadius: 999,
					background: 'radial-gradient(circle, rgba(61,174,255,0.24), transparent 68%)',
					filter: 'blur(36px)',
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
