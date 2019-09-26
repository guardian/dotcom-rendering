import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { sidePadding, textSans, headlineFont, icons, PillarStyles, bulletStyles, darkModeCss } from '../../styles';
import { palette } from '@guardian/src-foundations'
import { render } from "../../renderBlocks";

const articleBodyStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
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
        ${headlineFont}

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

    .element-rich-link,
    .element-membership {
        border-top: 1px solid ${palette.neutral[86]};
        border-bottom: 1px solid ${palette.neutral[86]};
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;

        p {
            margin: 8px 0;
        }

        span {
            display: none;
        }

        a {
            text-decoration: none;
            &::before {
                content: 'More on this topic';
                font-weight: bold;
                display: block;
                color: ${palette.neutral[7]};
            }
        }
    }

    h2 {
        font-size: 1.8rem;
        line-height: 2.2rem;
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

    p {
        hyphens: auto;
        overflow-wrap: break-word;
    }

    ${bulletStyles(kicker)}
    ${sidePadding}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    a {
        color: ${inverted};
    }

    figcaption {
        color: ${palette.neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }

    .element-rich-link,
    .element-membership {
        border-top: 1px solid ${palette.neutral[60]};
        border-bottom: 1px solid ${palette.neutral[60]};
        a {
            &::before {
                color: ${palette.neutral[60]};
            }
        }
    }
`;

interface ArticleBodyProps {
    pillarStyles: PillarStyles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bodyElements: any;
}

const ArticleBody = ({ bodyElements, pillarStyles }: ArticleBodyProps): JSX.Element =>
    <article css={[articleBodyStyles(pillarStyles), ArticleBodyDarkStyles(pillarStyles)]}>
        {render(bodyElements).html}
    </article>

export default ArticleBody;
