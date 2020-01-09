import React from 'react';
import { sidePadding, bulletStyles, headlineFont, darkModeCss, linkStyle } from 'styles';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { getPillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';
import { Article, Layout } from 'article';

const StandfirstFeatureStyles = `
    color: ${palette.neutral[46]};
    ${headlineFont}
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;
`;

function StandfirstStyles({ pillar, layout }: Article): SerializedStyles {
    const { kicker } = getPillarStyles(pillar);
    const includeFeatureStyles = layout === Layout.Feature || layout === Layout.Review;

    return css`
        padding-bottom: 6px;
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;

        p, ul {
            margin: 0;
        }

        ${linkStyle(kicker)}
        ${bulletStyles(kicker)}
        ${sidePadding}
        ${includeFeatureStyles ? StandfirstFeatureStyles : null}
    `;
}

const StandfirstDarkStyles = ({ pillar }: Article): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    a {
        color: ${getPillarStyles(pillar).inverted};
    }
`;

interface Props {
    standfirst: string;
    article: Article;
    className: SerializedStyles;
}

const Standfirst = ({ standfirst, article, className }: Props): JSX.Element =>
    <div css={[className, StandfirstStyles(article), StandfirstDarkStyles(article)]}>
        {componentFromHtml(standfirst)}
    </div>

export default Standfirst;
