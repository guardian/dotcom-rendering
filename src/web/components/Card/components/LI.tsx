import React from 'react';
import { css, cx } from 'emotion';

import { verticalDivider } from '../lib/verticalDivider';

const liStyles = (percentage?: CardPercentageType) => css`
    /* This position relative is needed to contain the veritcal divider */
    position: relative;

    /* margin-bottom: 12px; */

    display: flex;
    ${percentage ? `flex-basis: ${percentage};` : `flex-grow: 1;`}
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
    percentage?: CardPercentageType; // Passed to flex-basis, defaults to flex grow
    showDivider?: boolean; // If this LI wraps a card in a row this should be true
    padSides?: boolean; // If this LI directly wraps a card this should be true
    bottomMargin?: boolean; // True when wrapping a card in a column and not the last item
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
