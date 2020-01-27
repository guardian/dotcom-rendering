import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import {
    sidePadding,
    darkModeCss,
    basePx,
    adStyles
} from 'styles';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';

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

    .interactive {
        margin: 1rem 0;
    }

    iframe {
        width: 100%;
        border: none;
    }

    ${adStyles}
    ${sidePadding}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    a {
        color: ${inverted};
    }

    figcaption {
        color: ${neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }

    .rich-link,
    .element-membership {
        border-top: 1px solid ${neutral[60]};
        border-bottom: 1px solid ${neutral[60]};
        a {
            &::before {
                color: ${neutral[60]};
            }
        }
    }
`;

interface ArticleBodyProps {
    pillar: Pillar;
    className: SerializedStyles[];
    children: ReactNode[];
}

const ArticleBody = ({
    pillar,
    className,
    children,
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles, ArticleBodyDarkStyles(getPillarStyles(pillar)), ...className]}>
        {children}
    </div>

export default ArticleBody;
