import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    coverage?: CardCoverageType;
};

export const ContentWrapper = ({ children, coverage }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-basis: ${coverage && coverage};

            padding-left: 5px;
            padding-right: 5px;
        `}
    >
        {children}
    </div>
);
