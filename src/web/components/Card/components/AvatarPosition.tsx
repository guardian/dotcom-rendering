import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const AvatarPosition = ({ children }: Props) => {
    return (
        <div
            className={css`
                height: 132px;
                width: 132px;

                position: absolute;
                right: 0;
                bottom: 0;
            `}
        >
            {children}
        </div>
    );
};
