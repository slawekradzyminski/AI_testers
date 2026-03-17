import React from 'react';

export const slideFontFamily =
	'"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif';

export const glassPanelStyle: React.CSSProperties = {
	background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
	border: '1px solid rgba(255,255,255,0.15)',
	boxShadow: '0 18px 38px rgba(0,0,0,0.18)',
	backdropFilter: 'blur(14px)',
	borderRadius: 28,
	color: '#f4f7fb',
};

export const accentTitleStyle: React.CSSProperties = {
	background: 'linear-gradient(135deg, #f8fbff 0%, #8ad8ff 100%)',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
};
