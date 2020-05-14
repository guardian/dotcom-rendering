import React from 'react';
import { css } from 'emotion';

import { AdSlot } from '@root/src/web/components/AdSlot';
import { namedAdSlotParameters } from '@root/src/model/advertisement';

type Props = {
    name: AdSlotType;
    height: number;
};
const adSlotWrapper = (height: number) => css`
    position: static;
    height: ${height}px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

export const StickyAd = ({ name, height }: Props) => (
    <div className={adSlotWrapper(height)}>
        <AdSlot asps={namedAdSlotParameters(name)} localStyles={stickyAdSlot} />
    </div>
);
