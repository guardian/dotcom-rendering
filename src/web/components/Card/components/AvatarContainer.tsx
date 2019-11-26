import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

const spacingStyles = css`
    display: flex;
    flex-direction: row-reverse;

    margin-right: 10px;
    margin-top: 50px;
`;

const sizingStyles = css`
    height: 132px;
    width: 132px;
`;

export const AvatarContainer = ({ children }: Props) => {
    return (
        <div className={spacingStyles}>
            <div className={sizingStyles}>{children}</div>
        </div>
    );
};
