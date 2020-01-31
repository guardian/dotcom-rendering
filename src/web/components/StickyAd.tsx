import React from 'react';
import { css } from 'emotion';

import { AdSlot } from '@root/src/web/components/AdSlot';
import { namedAdSlotParameters } from '@root/src/model/advertisement';

// Note that 'StickyAd' seems heavily scoped
// to the right column, if we want to 'stickyAd' somewhere
// else then we'll need to send props through

const adSlotWrapper = css`
    position: static;
`;

const stickyAdSlot = css`
    > .ad-slot__content {
        height: 1059px;
    }

    > .ad-slot__label {
        position: sticky;
        top: 0;
    }

    /* iframe is inserted into ad-slot__content */
    > .ad-slot__content > iframe {
        position: sticky;
        top: 24px; /* Height of label */
    }
`;

export const StickyAd = () => (
    <div className={adSlotWrapper}>
        <AdSlot
            asps={namedAdSlotParameters('right')}
            className={stickyAdSlot}
        />
    </div>
);
