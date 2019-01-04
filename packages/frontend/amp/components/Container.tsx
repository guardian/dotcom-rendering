import React from 'react';
import { css, cx } from 'emotion';

const container = css`
    margin: auto;
    max-width: 600px;
`;

const Container: React.SFC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children, ...props }) => (
    <div className={cx(container, className)} {...props}>
        {children}
    </div>
);

export default Container;
