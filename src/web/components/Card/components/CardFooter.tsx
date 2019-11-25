import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

const footerStyles = css`
    display: flex;
`;

export const CardFooter = ({ children }: Props) => (
    <footer className={footerStyles}>{children}</footer>
);
