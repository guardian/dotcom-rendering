import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const AvatarContainer = ({ children }: Props) => {
    return (
        <div
            className={css`
                display: flex;
                flex-direction: row-reverse;

                margin-right: 10px;
                margin-top: 50px;
            `}
        >
            {children}
        </div>
    );
};
