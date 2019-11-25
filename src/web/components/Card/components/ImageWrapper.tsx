import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
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
