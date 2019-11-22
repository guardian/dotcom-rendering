import React from 'react';
import { css } from 'emotion';

import { AdSlot } from '@root/src/web/components/AdSlot';
import { namedAdSlotParameters } from '@root/src/model/advertisement';

const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

export const StickyAd = () => (
    <div className={adSlotWrapper}>
        <AdSlot
            asps={namedAdSlotParameters('right')}
            className={stickyAdSlot}
        />
    </div>
);
