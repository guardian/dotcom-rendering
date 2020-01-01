import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    area: string;
};

export const GridItem = ({ children, area }: Props) => (
    <div
        className={css`
            grid-area: ${area};
        `}
    >
        {children}
    </div>
);
