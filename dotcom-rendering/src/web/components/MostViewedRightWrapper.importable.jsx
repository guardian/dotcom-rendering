import { useRef, useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { MostViewedRight } from './MostViewedRight';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';

/**
 * @typedef {Object} Props
 * @property {number} [limitItems]
 * @property {boolean} isAdFreeUser
 */

// Minimum height needed to render MostViewedRight is its own outer height.
const HEIGHT_REQUIRED = 482 + 24 + 24;

const MOSTVIEWED_STICKY_HEIGHT = 1059;

/**
 * Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it.
 * @param {Props} props React props
 */
export const MostViewedRightWrapper = ({ limitItems, isAdFreeUser }) => {
	const adBlockerDetected = useAdBlockInUse();
	/** @type {import('react').MutableRefObject<HTMLDivElement | null>} */
	const bodyRef = useRef(null);
	const [heightIsAvailable, setHeightIsAvailable] = useState(false);

	// Styling the data island root so it stretches to cover the full height available in the container.
	// Requires us to subtract the height of its sibling in the container (StickyAd).
	const stretchWrapperHeight = css`
		height: ${adBlockerDetected
			? `calc(100% - 300px)`
			: `calc(100% - ${MOSTVIEWED_STICKY_HEIGHT}px)`};
	`;

	useEffect(() => {
		/** @param {import('react').RefObject<HTMLDivElement | null>} ref */
		const checkHeight = (ref) => {
			if (!heightIsAvailable) {
				// Don't bother checking if height already available
				if (ref.current) {
					const { offsetHeight } = ref.current;
					setHeightIsAvailable(offsetHeight > HEIGHT_REQUIRED);
				}
			}
		};

		// Check if we have the available height
		checkHeight(bodyRef);

		// setTimeout here lets us put another check at the end of the
		// event queue in case any in body elements still need to render
		// which could push the page down giving us the space we need
		setTimeout(() => {
			checkHeight(bodyRef);
		});
	}, [heightIsAvailable]);

	return (
		<div ref={bodyRef} css={stretchWrapperHeight}>
			{heightIsAvailable ? (
				<MostViewedRight
					limitItems={limitItems}
					isAdFreeUser={isAdFreeUser}
					adBlockerDetected={!!adBlockerDetected}
				/>
			) : null}
		</div>
	);
};
