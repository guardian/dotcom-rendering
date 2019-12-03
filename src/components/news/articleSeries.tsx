import React from 'react';
import { sidePadding, headlineFont } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from '../../types/capi';
import { PillarStyles } from 'types/pillar';

const ArticleSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    ${sidePadding}
    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${kicker};
        text-decoration: none;
        ${headlineFont}
    }
`;

interface ArticleSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const ArticleSeries = ({ series, pillarStyles }: ArticleSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <nav css={ArticleSeriesStyles(pillarStyles)}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        )
    }

    return null;

}

export default ArticleSeries;
