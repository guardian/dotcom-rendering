import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';

const ulStyles = (direction?: 'row' | 'column', padded?: boolean) => css`
    position: relative;

    ${padded && 'margin-bottom: 10px'};

    display: flex;
    flex-direction: ${direction};
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
    children: JSXElements;
    direction?: 'row' | 'column';
    showDivider?: boolean;
    padded?: boolean;
};

export const UL = ({
    children,
    direction = 'column',
    showDivider = false,
    padded = false,
}: Props) => {
    return (
        <ul
            className={cx(
                ulStyles(direction, padded),
                showDivider && verticalDivider,
            )}
        >
            {children}
        </ul>
    );
};
