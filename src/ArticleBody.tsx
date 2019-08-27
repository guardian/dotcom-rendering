import React from 'react';
import { css } from '@emotion/core'
import { sideMargins, textSans, headlineLight, icons } from './styles';

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
        ${headlineLight}

        p {
            margin: 0;

            &::before {
                ${icons}
                font-size: 2.2rem;
                content: '\\e11c';
                display: inline-block;
                margin-right: 8px;
            }
        }

        footer {
            font-size: 1.8rem;
            margin-top: 4px;

            cite {
                font-style: normal;
            }
        }
    }

    figcaption {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: #767676;
        ${textSans}
    }

    .element-rich-link, .element-membership {
        border-top: 1px solid #dcdad5;
        border-bottom: 1px solid #dcdad5;
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;
    }

    .bullet {
        color: transparent;

        &::before {
            content: '';
            background-color: ${kicker};
            width: 1.2rem;
            height: 1.2rem;
            border-radius: .6rem;
            display: inline-block;
        }
    }
`;

const ArticleBody = ({ body, pillarStyles }) => (
    <div css={[articleBodyCss(pillarStyles), sideMargins]} dangerouslySetInnerHTML={{__html: body}} />
)

export default ArticleBody;