import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    size: CardSizeType;
};

const weights = {
    small: 1,
    medium: 2,
    large: 3,
};

export const ImageWrapper = ({ children, size }: Props) => {
    return (
        <div
            className={css`
                flex: ${weights[size]};
                img {
                    width: 100%;
                    display: block;
                }
            `}
        >
            {children}
        </div>
    );
};
