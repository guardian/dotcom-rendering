import React from 'react';
import { css } from '@emotion/core'
import { sideMargins } from './styles';

const articleBodyCss = ({ kicker }) => css`
    a {
        color: ${kicker};
    }
`;

const ArticleBody = ({ body, pillarStyles }) => (
    <div css={[articleBodyCss(pillarStyles), sideMargins]} dangerouslySetInnerHTML={{__html: body}} />
)

export default ArticleBody;