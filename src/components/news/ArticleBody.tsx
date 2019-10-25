import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { sidePadding, PillarStyles, darkModeCss, commonArticleStyles, basePx } from '../../styles';
import { palette } from '@guardian/src-foundations'
import { until } from '@guardian/src-utilities'
import { render } from "../../renderBlocks";
import { Block } from 'types/capi-thrift-models';

const ArticleBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;
    }

    iframe {
        width: 100%;
        border: none;
    }

    ${until.wide} {
        figure {
            margin-left: ${basePx(-1)};
            margin-right: ${basePx(-1)};
        }
    }

    ${sidePadding}
    ${commonArticleStyles(pillarStyles)}
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
    bodyElements: Block[];
    imageSalt: string;
}

const ArticleBody = ({ bodyElements, pillarStyles, imageSalt }: ArticleBodyProps): JSX.Element =>
    <article css={[ArticleBodyStyles(pillarStyles), ArticleBodyDarkStyles(pillarStyles)]}>
        {render(bodyElements, imageSalt).html}
    </article>

export default ArticleBody;
