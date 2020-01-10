import React from 'react';
import { sidePadding, headlineFont } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from '../../capi';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';

const ArticleSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${kicker};
        text-decoration: none;
        ${headlineFont}
        ${sidePadding}
    }
`;

interface ArticleSeriesProps {
    series: Series;
    pillar: Pillar;
}

const ArticleSeries = ({ series, pillar }: ArticleSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <nav css={ArticleSeriesStyles(getPillarStyles(pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        )
    }

    return null;

}

export default ArticleSeries;
