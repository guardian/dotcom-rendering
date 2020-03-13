import React from 'react';
import { sidePadding } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from '../../capi';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { headline } from '@guardian/src-foundations/typography';

const ArticleSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    a {
        ${headline.xxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
        color: ${kicker};
        text-decoration: none;
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
