import React from 'react';
import { css } from 'emotion';

import { AdSlot } from '@root/src/web/components/AdSlot';
import { namedAdSlotParameters } from '@root/src/model/advertisement';

type Props = {
    name: AdSlotType;
};
const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

export const StickyAd = ({ name }: Props) => (
    <div className={adSlotWrapper}>
        <AdSlot asps={namedAdSlotParameters(name)} localStyles={stickyAdSlot} />
    </div>
);
