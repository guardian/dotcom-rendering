import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    percentage?: CardPercentageType;
};

export const ImageWrapper = ({ children, percentage }: Props) => {
    return (
        <div
            className={css`
                flex-basis: ${percentage && percentage};

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
