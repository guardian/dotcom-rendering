import React from 'react';
import { css } from '@emotion/core'
import { news, sideMargins } from './styles';

const articleBodyCss = css`
    a {
        color: red;
    }
`;

const ArticleBody = ({ body }) => (
    <div css={[articleBodyCss, sideMargins]} dangerouslySetInnerHTML={{__html: body}} />
)

export default ArticleBody;