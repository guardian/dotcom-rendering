import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    coverage?: CardCoverageType;
};

export const HeadlineWrapper = ({ children, coverage }: Props) => (
    <div
        className={css`
            flex-basis: ${coverage && coverage};

            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 8px;
        `}
    >
        {children}
    </div>
);
