import React from 'react';
import { css, cx } from 'emotion';

const style = css`
    padding-left: 10px;
    padding-right: 10px;
`;

const InnerContainer: React.SFC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children, ...props }) => (
    <div className={cx(style, className)} {...props}>
        {children}
    </div>
);

export default InnerContainer;
