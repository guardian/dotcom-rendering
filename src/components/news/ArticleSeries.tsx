import React from 'react';
import { sidePadding, PillarStyles } from '../../styles';
import { css } from '@emotion/core'

const ArticleSeriesStyles = ({ kicker }: PillarStyles) => css`    
    ${sidePadding}
    a {
        font-weight: 900;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${kicker};
        text-decoration: none;
    }
`;

interface ArticleSeriesProps {
    series: {
        webTitle?: string;
        webUrl?: string;
    };
    pillarStyles: PillarStyles;
}

const ArticleSeries = ({ series, pillarStyles }: ArticleSeriesProps) =>
    series ? <div css={ArticleSeriesStyles(pillarStyles)}><a href={series.webUrl}>{series.webTitle}</a></div> : null

export default ArticleSeries;
