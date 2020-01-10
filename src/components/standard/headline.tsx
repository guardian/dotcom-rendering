import React from 'react';
import ArticleRating from 'components/shared/articleRating';
import { basePx, sidePadding, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { getPillarStyles } from 'pillar';
import { until } from '@guardian/src-foundations/mq';
import { Layout, Article } from 'article';

const AnalysisHeadlineStyles = (kicker: string): SerializedStyles => css`
    font-weight: 200;
    line-height: 3.6rem;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent calc(3.6rem - 1px), ${kicker});
    background-size: 100vw 3.6rem;

    ${until.wide} {
        background-position: ${basePx(1)} 0;
    }
`
function HeadlineStyles({ layout, pillar }: Article): SerializedStyles {

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
            color: ${isFeature ? featureHeadline : palette.neutral[7]};
            ${isAnalysis ? AnalysisHeadlineStyles(kicker) : null}
        }
    `;

}

const HeadlineDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};

    h1 {
        color: ${palette.neutral[86]};
    }
`;

interface ArticleHeadlineProps {
    headline: string;
    article: Article;
    rating?: string;
}

const ArticleHeadline = ({
    headline,
    article,
    rating,
}: ArticleHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles(article), HeadlineDarkStyles]}>
        <h1>{headline}</h1>
        { rating ? <ArticleRating rating={rating} /> : null }
    </div>

export default ArticleHeadline;
