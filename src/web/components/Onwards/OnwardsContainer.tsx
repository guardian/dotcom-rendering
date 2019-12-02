import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const OnwardsContainer = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-grow: 1;
            flex-direction: column;

            margin-top: 10px;
            margin-bottom: 50px;
            margin-right: 70px;
        `}
    >
        {children}
    </div>
);
