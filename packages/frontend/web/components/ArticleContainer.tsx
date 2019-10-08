import React from 'react';
import { Container } from '@guardian/guui';
import { css, cx } from 'emotion';
import { palette, mobileLandscape } from '@guardian/src-foundations';

const articleContainerStyles = css`
    position: relative;
    background-color: ${palette.neutral[100]};
    padding: 0 10px;

    ${mobileLandscape} {
        padding: 0 20px;
    }
`;

type Props = {
    showTopBorder: boolean;
    children: React.ReactNode;
};
export const ArticleContainer = ({ showTopBorder, children }: Props) => (
    <Container
        borders={true}
        showTopBorder={showTopBorder}
        className={cx(articleContainerStyles)}
    >
        {children}
    </Container>
);
