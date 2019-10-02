import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { sidePadding, PillarStyles, darkModeCss, commonArticleStyles } from '../../styles';
import { palette } from '@guardian/src-foundations'
import { render } from "../../renderBlocks";

const ArticleBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;
    }

    ${commonArticleStyles(pillarStyles)}
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bodyElements: any;
}

const ArticleBody = ({ bodyElements, pillarStyles }: ArticleBodyProps): JSX.Element =>
    <article css={[ArticleBodyStyles(pillarStyles), ArticleBodyDarkStyles(pillarStyles)]}>
        {render(bodyElements).html}
    </article>

export default ArticleBody;
