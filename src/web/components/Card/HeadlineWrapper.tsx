import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    size: CardSizeType;
};

const weights = {
    small: 3,
    medium: 2,
    large: 1,
};

export const HeadlineWrapper = ({ children, size }: Props) => (
    <div
        className={css`
            flex: ${weights[size]};

            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 8px;
        `}
    >
        {children}
    </div>
);
