import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const HorizontalLayout = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
            height: 100%;
        `}
    >
        {children}
    </div>
);
