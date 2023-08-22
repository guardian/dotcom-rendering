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
	@media not (prefers-reduced-motion: reduce) {
		animation: ${livePulse} 1s infinite;
	}
`;

interface Props {
	colour?: string;
}

/**
 * # Pulsing Dot
 *
 * Used for indicating an article is updating live
 *
 * ## Why does this need to be an Island?
 *
 * We want to respect user’s flashing elements preferences
 */
export const PulsingDot = ({ colour }: Props) => {
	const [shouldFlash, setShouldFlash] = useState(false);

	useEffect(() => {
		/**
		 * `flashingPreference` is `null` if no preference exists and explicitly
		 * `false` when the reader has said they don't want flashing
		 */
		const flashingPreferences = storage.local.get(
			'gu.prefs.accessibility.flashing-elements',
		);
		setShouldFlash(flashingPreferences !== false);
	}, []);

	return <span css={[dotStyles(colour), shouldFlash && animate]} />;
};
