import React from 'react';
import { css, cx } from 'emotion';

const sizingStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const coverageStyles = (coverage: string) => css`
    flex-basis: ${coverage && coverage};
`;

const paddingStyles = css`
    padding-left: 5px;
    padding-right: 5px;
`;

const spacingStyles = css`
    flex-grow: 1;
    flex-shrink: 0;
`;

type Props = {
    children: JSX.Element | JSX.Element[];
    coverage?: CardCoverageType;
    spaceContent?: boolean;
};

export const ContentWrapper = ({ children, coverage, spaceContent }: Props) => (
    <div
        className={cx(
            sizingStyles,
            coverage && coverageStyles(coverage),
            paddingStyles,
            spaceContent && spacingStyles,
        )}
    >
        {children}
    </div>
);
