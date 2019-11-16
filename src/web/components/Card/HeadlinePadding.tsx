import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const HeadlinePadding = ({ children }: Props) => (
    <div
        className={css`
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 8px;
        `}
    >
        {children}
    </div>
);
