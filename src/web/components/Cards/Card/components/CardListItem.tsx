import React from 'react';
import { css } from 'emotion';

const listStyles = (percentage?: CardPercentageType) => css`
    display: flex;
    flex-grow: 1;

    /* Here we ensure the card stretches to fill the containing space falling back to flex: 1 */
    ${percentage ? `flex-basis: ${percentage && percentage};` : `flex: 1;`}

    /* We absolutely position the 1 pixel top bar in
       the card so this is required here */
    position: relative;

    /* Set spacing margins on the li element */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 12px;
`;

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
};

export const CardListItem = ({ children, percentage }: Props) => (
    <li className={listStyles(percentage)}>{children}</li>
);
