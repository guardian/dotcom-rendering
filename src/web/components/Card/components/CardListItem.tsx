import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';

const listStyles = (percentage?: CardPercentageType) => css`
    display: flex;
    flex-grow: 1;

    /* Here we ensure the card stretches to the given percentage */
    flex-basis: ${percentage && percentage};

    /* We absolutely position the vertical divider and this contains that */
    position: relative;

    /* Set spacing on the li element */
    padding-left: 10px;
    padding-right: 10px;
`;

const marginBottomStyles = css`
    margin-bottom: 10px;
`;

const verticalDivider = css`
    :before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 0.0625rem;
        height: 100%;
        border-left: 0.0625rem solid ${palette.neutral[86]};
    }
`;

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
    showDivider?: boolean;
    bottomMargin?: boolean;
};

export const CardListItem = ({
    children,
    percentage,
    showDivider,
    bottomMargin,
}: Props) => (
    <li
        className={cx(
            listStyles(percentage),
            bottomMargin && marginBottomStyles,
            showDivider && verticalDivider,
        )}
    >
        {children}
    </li>
);
