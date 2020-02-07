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

            @supports (display: grid) {
                position: relative;
                grid-area: ${area};
            }
        `;
    }
    return css`
        grid-area: ${area};
    `;
};

export const GridItem = ({ children, area }: Props) => (
    <div className={gridAreaStyles(area)}>{children}</div>
);
