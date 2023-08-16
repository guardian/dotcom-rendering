import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { allowFlashingElements } from '../lib/allowFlashingElements';

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

	useEffect(() => {
		// We use this to track if the flashing dot is hydrated
		// Uses of pulsing dot that aren't in islands can instead be animated by
		// the 'AnimatePulsingDots.importable.tsx' component
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
			 * 1. This file is loaded within an island, this happens in onwards content,
			 *    where the useEffect will run & enable data-animate below
			 * 2. An additional island can be loaded on the page 'AnimatePulsingDots.importable.tsx',
			 *    which checks for un-hydrating pulsing dots and animate them if user settings allow.
			 *    This is seen on Fronts and liveblogs.
			 *
			 * This animation is enabled/disabled through the data-animate attribute, which a CSS selector checks for
			 * before setting the 'animate' property. This method allows us to enable the animation through both methods
			 * outlined above.
			 */
			data-animate={allowFlashingElements}
		/>
	);
};
