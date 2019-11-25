import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const AvatarSize = ({ children }: Props) => {
    return (
        <div
            className={css`
                height: 132px;
                width: 132px;
            `}
        >
            {children}
        </div>
    );
};
