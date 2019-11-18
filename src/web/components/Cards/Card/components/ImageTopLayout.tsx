import React from 'react';
import { css } from 'emotion';

type Props = {
    children: ChildrenType;
};

export const ImageTopLayout = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
        `}
    >
        {children}
    </div>
);
