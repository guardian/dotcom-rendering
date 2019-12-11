import React from 'react';
import { css, cx } from 'emotion';

const sizingStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const coverageStyles = (percentage?: string) => {
    return percentage
        ? css`
              flex-basis: ${percentage};
          `
        : css`
              flex-grow: 1;
          `;
};

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
};

export const ContentWrapper = ({ children, percentage }: Props) => (
    <div className={cx(sizingStyles, coverageStyles(percentage))}>
        {children}
    </div>
);
