import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    direction: 'up' | 'down';
    by: string;
};

export const Shift = ({ children, direction, by }: Props) => (
    <div
        className={css`
            ${direction === 'up' && `margin-top: -${by}`};
            ${direction === 'down' && `margin-bottom: -${by}`};
        `}
    >
        {children}
    </div>
);
