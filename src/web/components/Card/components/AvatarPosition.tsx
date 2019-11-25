import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const AvatarPosition = ({ children }: Props) => {
    return (
        <div
            className={css`
                height: 8.25rem;
                width: 8.25rem;

                position: absolute;
                right: 0;
                bottom: 0;
            `}
        >
            {children}
        </div>
    );
};
