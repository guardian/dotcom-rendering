import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    direction?: 'row' | 'column';
    justify?: 'space-between'; // Extend as required
};

export const Flex = ({
    children,
    direction = 'row',
    justify = 'space-between',
}: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};
        `}
    >
        {children}
    </div>
);
