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

const mediaFooterStyles = css`
    flex-direction: row-reverse;
    padding: 0 5px 5px 5px;
`;

export const CardFooter = ({ children, designType }: Props) => {
    return (
        <footer
            className={cx(
                footerStyles,
                designType === 'Media' && mediaFooterStyles,
            )}
        >
            {children}
        </footer>
    );
};
