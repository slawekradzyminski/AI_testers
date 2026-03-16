import React from 'react';

export const SceneFrame: React.FC<{
	eyebrow: string;
	title: string;
	description?: string;
	align?: 'left' | 'center';
	children?: React.ReactNode;
}> = ({eyebrow, title, description, align = 'left', children}) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: 88,
				right: 88,
				top: 72,
				bottom: 72,
				padding: '54px 58px',
				borderRadius: 42,
				background:
					'linear-gradient(180deg, rgba(9, 17, 31, 0.72), rgba(8, 14, 24, 0.52))',
				border: '1px solid rgba(255,255,255,0.11)',
				boxShadow: '0 30px 80px rgba(0, 0, 0, 0.28)',
				overflow: 'hidden',
				color: '#f4f7fb',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(125deg, rgba(255,255,255,0.04), transparent 26%, transparent 70%, rgba(93,212,255,0.06))',
				}}
			/>
			<div
				style={{
					position: 'relative',
					fontSize: 24,
					letterSpacing: 4,
					textTransform: 'uppercase',
					color: '#8ad8ff',
					textAlign: align,
					textShadow: '0 2px 10px rgba(0,0,0,0.25)',
				}}
			>
				{eyebrow}
			</div>
			<div
				style={{
					position: 'relative',
					marginTop: 18,
					fontSize: 78,
					lineHeight: 1.05,
					fontWeight: 800,
					textAlign: align,
					color: '#f8fbff',
					textShadow: '0 4px 24px rgba(0,0,0,0.32)',
				}}
			>
				{title}
			</div>
			{description ? (
				<div
					style={{
						position: 'relative',
						marginTop: 24,
						maxWidth: align === 'center' ? 1100 : 980,
						marginLeft: align === 'center' ? 'auto' : undefined,
						marginRight: align === 'center' ? 'auto' : undefined,
						fontSize: 32,
						lineHeight: 1.35,
						color: 'rgba(244, 247, 251, 0.86)',
						textAlign: align,
					}}
				>
					{description}
				</div>
			) : null}
			<div style={{position: 'relative', zIndex: 1}}>{children}</div>
		</div>
	);
};
