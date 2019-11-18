import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    coverage?: CardCoverageType;
};

export const ImageWrapper = ({ children, coverage }: Props) => {
    return (
        <div
            className={css`
                flex-basis: ${coverage && coverage};

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
