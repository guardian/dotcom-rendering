import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const ImageLeftLayout = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
            width: 100%;
        `}
    >
        {children}
    </div>
);
