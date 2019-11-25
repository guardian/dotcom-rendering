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

                margin-right: 10px;
            `}
        >
            {children}
        </div>
    );
};
