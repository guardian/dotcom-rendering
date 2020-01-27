// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette'
import { until } from '@guardian/src-foundations/mq';

import ArticleRating from 'components/shared/articleRating';
import { basePx, sidePadding, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { getPillarStyles } from 'pillar';
import { Layout, Article } from 'article';


// ----- Styles ----- //

const AnalysisStyles = (kicker: string): SerializedStyles => css`
    font-weight: 200;
    line-height: 3.6rem;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent calc(3.6rem - 1px), ${kicker});
    background-size: 100vw 3.6rem;

    ${until.wide} {
        background-position: ${basePx(1)} 0;
    }
`;

function Styles({ layout, pillar }: Article): SerializedStyles {

    const isFeature = layout === Layout.Feature;
    const isAnalysis = layout === Layout.Analysis;
    const { featureHeadline, kicker } = getPillarStyles(pillar);

    return css`
        padding: ${basePx(0, 0, 4, 0)};
        h1 {
            ${headlineFontStyles}
            ${headlineFont}
            ${sidePadding}
            font-weight: ${isFeature ? 700 : 500};
            color: ${isFeature ? featureHeadline : neutral[7]};
            ${isAnalysis ? AnalysisStyles(kicker) : null}
        }
    `;

}

const DarkStyles = darkModeCss`
    background: ${background.inverse};

    h1 {
        color: ${neutral[86]};
    }
`;


// ----- Component ----- //

interface Props {
    headline: string;
    article: Article;
}

const Headline = ({ headline, article }: Props): JSX.Element =>
    <div css={[Styles(article), DarkStyles]}>
        <h1>{headline}</h1>
        { article.layout === Layout.Review ? <ArticleRating rating={article.starRating} /> : null }
    </div>


// ----- Exports ----- //

export default Headline;
