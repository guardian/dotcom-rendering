import React from 'react';
import { css } from 'emotion';

const paddingClassName = css`
    margin-bottom: 18px;
    margin-top: 6px;
`;

export const StarRatingMargin: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => <div className={paddingClassName}>{children}</div>;
