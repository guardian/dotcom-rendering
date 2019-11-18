import React from 'react';
import { css, cx } from 'emotion';

const sizingStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const coverageStyles = (percentage: string) => css`
    flex-basis: ${percentage && percentage};
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
    children: ChildrenType;
    percentage?: CardPercentageType;
    spaceContent?: boolean;
};

export const ContentWrapper = ({
    children,
    percentage,
    spaceContent,
}: Props) => (
    <div
        className={cx(
            sizingStyles,
            percentage && coverageStyles(percentage),
            paddingStyles,
            spaceContent && spacingStyles,
        )}
    >
        {children}
    </div>
);
