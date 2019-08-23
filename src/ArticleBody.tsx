import React from 'react';
import { css } from '@emotion/core'
import { sideMargins } from './styles';

const articleBodyCss = ({ kicker }) => css`
    a {
        color: ${kicker};
    }

    .element-image img {
        width: calc(100% + 16px);
        margin: 0 -8px;
    }

    blockquote {
        font-weight: 200;
        font-size: 2.2rem;
        line-height: 1.3;
        margin: 0;
        color: ${kicker};

        p {
            margin: 0;
        }

        footer {
            font-size: 1.8rem;
        }
    }
`;

const ArticleBody = ({ body, pillarStyles }) => (
    <div css={[articleBodyCss(pillarStyles), sideMargins]} dangerouslySetInnerHTML={{__html: body}} />
)

export default ArticleBody;