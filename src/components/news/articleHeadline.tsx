import React from 'react';
import ArticleRating from 'components/shared/articleRating';
import { basePx, sidePadding, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { PillarStyles } from 'pillar';
import { until } from '@guardian/src-foundations/mq';

const AnalysisHeadlineStyles = (kicker: string) => css`
    font-weight: 200;
    line-height: 3.6rem;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent calc(3.6rem - 1px), ${kicker});
    background-size: 100vw 3.6rem;
    background-repeat: repeat-y;

    ${until.wide} {
        background-position: ${basePx(1)} 0;
    }
`
const HeadlineStyles = (feature: boolean, analysis: boolean, { featureHeadline, kicker }: PillarStyles): SerializedStyles => css`
    padding: ${basePx(0, 0, 4, 0)};
    h1 {
        ${headlineFontStyles}
        ${headlineFont}
        ${sidePadding}
        font-weight: ${feature ? 700 : 500};
        color: ${feature ? featureHeadline : palette.neutral[7]};
        ${analysis ? AnalysisHeadlineStyles(kicker) : null}
    }
`;

const HeadlineDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};
`;

interface ArticleHeadlineProps {
    headline: string;
    feature: boolean;
    analysis: boolean;
    pillarStyles: PillarStyles;
    rating?: string;
}

const ArticleHeadline = ({
    headline,
    feature,
    analysis,
    pillarStyles,
    rating,
}: ArticleHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles(feature, analysis, pillarStyles), HeadlineDarkStyles]}>
        <h1>{headline}</h1>
        { rating ? <ArticleRating rating={rating} /> : null }
    </div>

export default ArticleHeadline;
