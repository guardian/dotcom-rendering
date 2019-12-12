import React from 'react';
import { css, cx } from 'emotion';

type Props = {
    children: JSXElements;
    designType?: DesignType;
};

const footerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const mediaFooter = css`
    flex-direction: row-reverse;
    padding: 0 0.3125rem 0.3125rem 0.3125rem;
`;

export const CardFooter = ({ children, designType }: Props) => (
    <footer className={cx(footerStyles, designType === 'Media' && mediaFooter)}>
        {children}
    </footer>
);
