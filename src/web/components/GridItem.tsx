import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    area: string;
};

const gridAreaStyles = (area: string) => {
    if (area === 'right-column') {
        return css`
            /* IE Fallback */
            position: absolute;
            top: 0;
            right: 0;
            /* Pop me below the body */
            z-index: 1;

            @supports (display: grid) {
                position: relative;
                grid-area: ${area};
            }
        `;
    }

    if (area === 'body') {
        return css`
            grid-area: ${area};
            /* Pop me above the right column */
            z-index: 2;
        `;
    }

    return css`
        grid-area: ${area};
    `;
};

export const GridItem = ({ children, area }: Props) => (
    <div className={gridAreaStyles(area)}>{children}</div>
);
