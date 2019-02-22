import React from 'react';
import { css, cx } from 'emotion';

const style = css`
    padding-left: 20px;
    padding-right: 20px;
`;

export const InnerContainer: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children, ...props }) => (
    <div className={cx(style, className)} {...props}>
        {children}
    </div>
);
