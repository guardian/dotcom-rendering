import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

import { getZIndex } from '@frontend/web/lib/getZIndex';

type Props = {
    children: React.ReactNode;
};

// The advert is stuck to the top of the container as we scroll
// until we hit the bottom of the wrapper that contains
// the top banner and the header/navigation
// We apply sticky positioning and z-indexes, the stickAdWrapper and headerWrapper
// classes are tightly coupled.
const stickyAdWrapper = css`
    background-color: white;
    border-bottom: 0.0625rem solid ${border.secondary};
    position: sticky;
    top: 0;
    ${getZIndex('stickyAdWrapper')}
`;

const headerWrapper = css`
    position: relative;
    ${getZIndex('headerWrapper')}
`;

export const Stuck = ({ children }: Props) => (
    <div className={stickyAdWrapper}>{children}</div>
);

export const SendToBack = ({ children }: Props) => (
    <div className={headerWrapper}>{children}</div>
);
