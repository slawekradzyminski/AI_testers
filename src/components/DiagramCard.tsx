import React from 'react';
import {glassPanelStyle} from './slideTheme';

type DiagramCardProps = {
	label?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
	labelStyle?: React.CSSProperties;
	highlight?: boolean;
};

export const DiagramCard: React.FC<DiagramCardProps> = ({
	label,
	children,
	style,
	labelStyle,
	highlight = false,
}) => {
	return (
		<div
			style={{
				padding: '28px 24px',
				borderRadius: 24,
				...glassPanelStyle,
				background: highlight
					? 'linear-gradient(180deg, rgba(5, 8, 16, 0.96), rgba(18, 27, 44, 0.92))'
					: glassPanelStyle.background,
				boxShadow: highlight
					? '0 0 0 1px rgba(138,216,255,0.2), 0 0 32px rgba(37, 143, 255, 0.25)'
					: glassPanelStyle.boxShadow,
				...style,
			}}
		>
			{label ? (
				<div
					style={{
						fontSize: 14,
						letterSpacing: 3,
						textTransform: 'uppercase',
						color: '#8ad8ff',
						marginBottom: 10,
						...labelStyle,
					}}
				>
					{label}
				</div>
			) : null}
			{children}
		</div>
	);
};
