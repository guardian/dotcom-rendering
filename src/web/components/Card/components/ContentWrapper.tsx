import React from 'react';
import { css, cx } from 'emotion';

const sizingStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const coverageStyles = (percentage: string) => {
    return percentage
        ? css`
              flex-basis: ${percentage};
          `
        : css`
              flex-grow: 1;
          `;
};

const paddingStyles = css`
    padding-left: 5px;
    padding-right: 5px;
`;

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
};

export const ContentWrapper = ({ children, percentage }: Props) => (
    <div
        className={cx(
            sizingStyles,
            percentage && coverageStyles(percentage),
            paddingStyles,
        )}
    >
        {children}
    </div>
);
