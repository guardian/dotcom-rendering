import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import {
    sidePadding,
    darkModeCss,
    basePx,
    adStyles
} from 'styles';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles } from 'pillar';

const richLinkWidth = "13.75rem";

const ArticleBodyStyles = css`
    position: relative;
    clear: both;

    .rich-link,
    .element-membership {
        float: left;
        clear: left;
        width: ${richLinkWidth};
        margin: ${basePx(1, 2, 1, 0)};

        ${from.wide} {
            margin-left: calc(-${richLinkWidth} - 16px - 24px);
        }
    }

    iframe {
        width: 100%;
        border: none;
    }

    ${adStyles}
    ${sidePadding}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
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

    .rich-link,
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
    className: SerializedStyles[];
    children: ReactNode[];
}

const ArticleBody = ({
    pillarStyles,
    className,
    children,
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles, ArticleBodyDarkStyles(pillarStyles), ...className]}>
        {children}
    </div>

export default ArticleBody;
