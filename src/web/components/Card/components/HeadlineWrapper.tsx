import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const HeadlineWrapper = ({ children }: Props) => (
    <div
        className={css`
            padding-bottom: 8px;
        `}
    >
        {children}
    </div>
);
