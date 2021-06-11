import { css, keyframes } from '@emotion/react';

import { storage } from '@guardian/libs';

const dotStyles = (colour?: string) => css`
	color: ${colour && colour};
	:before {
		border-radius: 62.5rem;
		display: inline-block;
		position: relative;
		background-color: currentColor;
		width: 0.75em;
		height: 0.75em;
		content: '';
		margin-right: 0.1875rem;
		vertical-align: initial;
	}
`;

const livePulse = keyframes`{
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
}`;

const animate = css`
	animation: ${livePulse} 1s infinite;
	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;

interface Props {
	colour?: string;
}

export const PulsingDot = ({ colour }: Props) => {
	// Respect the accessibility flag set here
	// https://www.theguardian.com/help/accessibility-help
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const flashingPreference = storage.local.get(
		'gu.prefs.accessibility.flashing-elements',
	);
	// flashingPreference is null if no preference exists and explicitly
	// false when the reader has said they don't want flashing
	const flashingEnabled = flashingPreference !== false;
	return <span css={[dotStyles(colour), flashingEnabled && animate]} />;
};
