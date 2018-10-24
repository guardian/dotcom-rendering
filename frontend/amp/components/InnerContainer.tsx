import React from 'react';
import { css, cx } from 'react-emotion';

const style = css`
    padding-left: 20px;
    padding-right: 20px;
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
