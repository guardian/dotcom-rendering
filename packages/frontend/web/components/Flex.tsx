import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const Flex = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            justify-content: space-between;
        `}
    >
        {children}
    </div>
);
