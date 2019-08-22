import React from 'react';
import { basePx, sideMargins } from './styles';
import { css } from '@emotion/core'

const articleTitleCss = css`
    padding: ${basePx(1, 0, 4, 0)};
    color: #121212;
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 3.2rem;
`;

const ArticleTitle = () => (
    <h1 css={[articleTitleCss, sideMargins]}>Venezuelan leader Nicolas Maduro confirms months of secret US talks</h1>
)

export default ArticleTitle;
