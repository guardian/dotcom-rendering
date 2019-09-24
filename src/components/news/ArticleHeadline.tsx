import React from 'react';
import ArticleRating from './ArticleRating';
import { basePx, sidePadding, PillarStyles, headlineFont, darkModeCss } from '../../styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const HeadlineStyles = (feature: boolean, { featureHeadline }: PillarStyles) => css`
    padding: ${basePx(0, 0, 4, 0)};
    h1 {
        font-size: 2.8rem;
        line-height: 3.2rem;
        margin: 0;
        ${headlineFont}
        ${sidePadding}
        font-weight: ${feature ? 700 : 500};
        color: ${feature ? featureHeadline : palette.neutral[7]};
    }
`;

const HeadlineDarkStyles = darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};
`;

interface ArticleHeadlineProps {
    headline: string;
    feature: boolean;
    pillarStyles: PillarStyles;
    rating?: string;
}

const ArticleHeadline = ({ headline, feature, pillarStyles, rating }: ArticleHeadlineProps) =>
    <div css={[HeadlineStyles(feature, pillarStyles), HeadlineDarkStyles]}>
        <h1>{headline}</h1>
        { rating ? <ArticleRating rating={rating} /> : null }
    </div>

export default ArticleHeadline;
