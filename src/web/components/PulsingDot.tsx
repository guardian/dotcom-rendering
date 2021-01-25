import React from 'react';
import { css } from 'emotion';
import { keyframes } from '@emotion/core';

export const DISABLE_FLASHING_ELEMENTS_CLASS = 'disable-flashing-elements';

const livePulse = keyframes`{
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
}`;

const pulsingDot = (colour?: string) => css`
	color: ${colour && colour};
	::before {
		border-radius: 62.5rem;
		display: inline-block;
		position: relative;
		background-color: currentColor;
		width: 0.75em;
		height: 0.75em;
		content: '';
		margin-right: 0.1875rem;
		vertical-align: initial;
		animation: ${livePulse} 1s infinite;
	}
`;

interface Props {
	colour?: string;
}

export const PulsingDot = ({ colour }: Props) => {
	// Respect the accessibility flag set here
	// https://www.theguardian.com/help/accessibility-help
	const flashingIsDisabled = !!document.getElementsByClassName(
		DISABLE_FLASHING_ELEMENTS_CLASS,
	).length;
	if (flashingIsDisabled) {
		return null;
	}

	return <span className={pulsingDot(colour)} />;
};
