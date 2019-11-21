import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const ImageRightLayout = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
        `}
    >
        {children}
    </div>
);
