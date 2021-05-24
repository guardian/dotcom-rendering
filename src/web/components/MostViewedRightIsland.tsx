import { css } from '@emotion/react';

const MOSTVIEWED_STICKY_HEIGHT = 1059;

// Styling the data island root so it stretches to cover the full height available in the container.
// Requires us to subtract the height of its sibling in the container (StickyAd).
const stretchWrapperHeight = css`
	display: flex;
	flex-direction: column;
	height: ${`calc(100% - ${MOSTVIEWED_STICKY_HEIGHT}px)`};
`;

export const MostViewedRightIsland = () => (
	<div id="most-viewed-right" css={stretchWrapperHeight} />
);
