import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
    direction?: 'row' | 'column';
};

export const UL = ({ children, direction = 'column' }: Props) => {
    return (
        <ul
            className={css`
                display: flex;
                flex-direction: ${direction};
            `}
        >
            {children}
        </ul>
    );
};
