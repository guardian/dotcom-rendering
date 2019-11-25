import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const AvatarContainer = ({ children }: Props) => {
    return (
        <div
            className={css`
                position: relative;

                margin-right: 0.625rem;
            `}
        >
            {children}
        </div>
    );
};
