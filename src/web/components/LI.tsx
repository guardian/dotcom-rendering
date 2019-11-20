import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';

const liStyles = (percentage?: CardPercentageType) => css`
    /* This position relative is needed to contain the veritcal divider */
    position: relative;

    margin-bottom: 12px;

    display: flex;
    ${percentage ? `flex-basis: ${percentage && percentage};` : `flex: 1;`}
`;

const verticalDivider = css`
    :before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 100%;
        border-left: 1px solid ${palette.neutral[86]};
    }
`;

type Props = {
    children: ChildrenType;
    percentage?: CardPercentageType;
    showDivider?: boolean;
};

export const LI = ({ children, percentage, showDivider }: Props) => {
    return (
        <li
            className={cx(liStyles(percentage), showDivider && verticalDivider)}
        >
            {children}
        </li>
    );
};
