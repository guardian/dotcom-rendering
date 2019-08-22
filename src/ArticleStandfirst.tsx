import React from 'react';
import { sideMargins } from './styles';
import { css } from '@emotion/core'

const articleStandfirst = css`
    margin-bottom: 6px;

    p {
        margin: 0;
    }
`;

const ArticleStandfirst = ({ standfirst }) => (
    <div css={[sideMargins, articleStandfirst]} dangerouslySetInnerHTML={{__html: standfirst}}></div>
)

export default ArticleStandfirst;