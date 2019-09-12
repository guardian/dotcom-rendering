import React from 'react';
import { basePx, sideMargins, PillarStyles, headlineFont } from '../../styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const HeadlineStyles = (feature: boolean, { featureHeadline }: PillarStyles) => css`
    padding: ${basePx(1, 0, 4, 0)};
    font-size: 2.8rem;
    line-height: 3.2rem;
    margin: 0;
    ${headlineFont}
    ${sideMargins}
    font-weight: ${feature ? 700 : 500};
    color: ${feature ? featureHeadline : palette.neutral[7]};
`;

interface ArticleHeadlineProps {
    headline: string;
    feature: boolean;
    pillarStyles: PillarStyles;
}

const ArticleHeadline = ({ headline, feature, pillarStyles }: ArticleHeadlineProps) => (
    <h1 css={HeadlineStyles(feature, pillarStyles)}>{headline}</h1>
)

export default ArticleHeadline;
