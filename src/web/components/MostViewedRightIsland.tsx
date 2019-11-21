import React from 'react';
import { css } from 'emotion';

// Styling the data island root so it stetches to cover the full height available in the container.
// Requires us to subtract the height of its sibbling in the container (StickyAd).
const stretchWrapperHeight = css`
    display: flex;
    flex-direction: column;
    height: calc(100% - 1059px);
`;

export const MostViewedRightIsland = () => (
    <div data-island="most-viewed-right" className={stretchWrapperHeight} />
);
