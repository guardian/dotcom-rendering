import React from 'react';
import { css, cx } from 'emotion';

import { verticalDivider } from './lib/verticalDivider';

const ulStyles = (direction?: 'row' | 'column', padded?: boolean) => css`
    position: relative;

    display: flex;
    flex-direction: ${direction};
`;

const marginBottomStyles = css`
    margin-bottom: 10px;
`;

type Props = {
    children: JSXElements;
    direction?: 'row' | 'column';
    showDivider?: boolean;
    bottomMargin?: boolean;
};

export const UL = ({
    children,
    direction = 'column',
    showDivider = false,
    bottomMargin = false,
}: Props) => {
    return (
        <ul
            className={cx(
                ulStyles(direction),
                showDivider && verticalDivider,
                bottomMargin && marginBottomStyles,
            )}
        >
            {children}
        </ul>
    );
};
