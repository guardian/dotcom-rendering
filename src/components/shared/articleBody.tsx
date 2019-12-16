import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import {
    sidePadding,
    darkModeCss,
    commonArticleStyles,
    basePx,
    adStyles
} from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { render } from "renderBlocks";
import { BlockElement } from 'capiThriftModels';
import { PillarStyles } from 'pillar';

const richLinkWidth = "13.75rem";

const ArticleBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
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

    ${until.wide} {
        figure:not(.interactive) {
            margin-left: ${basePx(-1)};
            margin-right: ${basePx(-1)};
        }
    }

    ${adStyles}
    ${sidePadding}
    ${commonArticleStyles(pillarStyles)}
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
    bodyElements: BlockElement[];
    imageSalt: string;
    className: SerializedStyles;
}

const ArticleBody = ({
    bodyElements,
    pillarStyles,
    imageSalt,
    className,
}: ArticleBodyProps): JSX.Element =>
    <div css={[className, ArticleBodyStyles(pillarStyles), ArticleBodyDarkStyles(pillarStyles)]} className="article__body">
        {render(bodyElements, imageSalt).html}
    </div>

export default ArticleBody;
