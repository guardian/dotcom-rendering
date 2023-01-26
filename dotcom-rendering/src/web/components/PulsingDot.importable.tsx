import { css, keyframes } from '@emotion/react';
import { storage } from '@guardian/libs';
import { useEffect, useState } from 'react';

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

const livePulse = keyframes`
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
`;

const animate = css`
	&[data-animate='true'] {
		animation: ${livePulse} 1s infinite;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}
`;

interface Props {
	colour?: string;
}

export const PulsingDot = ({ colour }: Props) => {
	const [hydrated, setHydrated] = useState(false);
	const [shouldFlash, setShouldFlash] = useState(false);

	useEffect(() => {
		// Respect the accessibility flag set here
		// https://www.theguardian.com/help/accessibility-help

		const flashingPreference = storage.local.get(
			'gu.prefs.accessibility.flashing-elements',
		);

		// flashingPreference is null if no preference exists and explicitly
		// false when the reader has said they don't want flashing
		setShouldFlash(flashingPreference !== false);
		// We use this to track if the flashing dot is hydrated
		// Uses of pulsing dot that aren't in islands can instead be hydrated by
		// the 'AnimatePulsingDot.importable' component
		setHydrated(true);
	}, []);

	return (
		<span
			css={[dotStyles(colour), animate]}
			data-flashing-dot-hydrated={hydrated}
			/**
			 * How is the pulsing dot animated?
			 *
			 * We only enable the animation for the pulsing dot on the client side,
			 * this is so that we can check each users flashing-elements configuration
			 * and only animate if we verify the use doesn't have it disabled.
			 *
			 * There are two ways this hydration can be achieved:
			 * 1. This file is loaded within an island, this happens on liveblogs and in onwards content,
			 *    where the useEffect will run & enable data-animate below
			 * 2. An additional island can be loaded on the page 'AnimatePulsingDots.importable.tsx',
			 *    which checks for un-hydrating pulsing dots and animate them if user settings allow.
			 */
			data-animate={shouldFlash}
		/>
	);
};
