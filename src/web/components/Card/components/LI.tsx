import React from 'react';
import { css, cx } from 'emotion';

import { verticalDivider } from './lib/verticalDivider';

const liStyles = (percentage?: CardPercentageType) => css`
    /* This position relative is needed to contain the veritcal divider */
    position: relative;

    /* margin-bottom: 12px; */

    display: flex;
    ${percentage ? `flex-basis: ${percentage && percentage};` : `flex-grow: 1;`}
`;

const sidePaddingStyles = css`
    /* Set spacing on the li element */
    padding-left: 10px;
    padding-right: 10px;
`;

const marginBottomStyles = css`
    margin-bottom: 10px;
`;

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
    showDivider?: boolean;
    padSides?: boolean;
    bottomMargin?: boolean;
};

export const LI = ({
    children,
    percentage,
    showDivider,
    padSides = false,
    bottomMargin,
}: Props) => {
    return (
        <li
            className={cx(
                liStyles(percentage),
                showDivider && verticalDivider,
                padSides && sidePaddingStyles,
                bottomMargin && marginBottomStyles,
            )}
        >
            {children}
        </li>
    );
};
