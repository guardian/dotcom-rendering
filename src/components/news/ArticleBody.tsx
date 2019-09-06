import React from 'react';
import { css } from '@emotion/core'
import { sideMargins, textSans, headlineLight, icons, PillarStyles, bulletStyles } from '../../styles';
import { palette } from '@guardian/src-foundations'

const articleBodyCss = ({ kicker }: PillarStyles) => css`
    margin-top: 24px;

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
        color: ${palette.neutral[46]};
        ${textSans}
    }

    .element-rich-link, .element-membership {
        border-top: 1px solid ${palette.neutral[86]};
        border-bottom: 1px solid ${palette.neutral[86]};
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;

        span {
            display: none;
        }

        a {
            text-decoration: none;
            &::before {
                content: 'More on this topic';
                display: block;
                color: #121212;
            }
        }
    }

    ${bulletStyles(kicker)}

    h2 {

        font-size: 2rem;
        line-height: 2.4rem;
        margin: 8px 0;
        font-weight: 500;

        & + p {
            margin-top: 0;
        }
    }

    .element-video {
        iframe {
            width: 100%
        }
    }
`;

interface ArticleBodyProps {
    body: string;
    pillarStyles: PillarStyles;
    feature: boolean;
}

const ArticleBody = ({ body, pillarStyles, feature }: ArticleBodyProps) => (
    <div css={[articleBodyCss(pillarStyles), sideMargins]} dangerouslySetInnerHTML={{__html: body.replace(/•/g, '<span class="bullet">•</span>')}} />
)

export default ArticleBody;
