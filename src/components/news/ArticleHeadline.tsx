import React from 'react';
import { basePx, sideMargins } from '../../styles';
import { css } from '@emotion/core'

const ArticleHeadlineCss = css`
    padding: ${basePx(1, 0, 4, 0)};
    color: #121212;
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 3.2rem;
`;

const ArticleHeadline = ({ headline }) => (
    <h1 css={[ArticleHeadlineCss, sideMargins]}>{headline}</h1>
)

export default ArticleHeadline;
