import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from 'capi';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { headline } from '@guardian/src-foundations/typography';

const ArticleSeriesStyles = ({ inverted }: PillarStyles): SerializedStyles => css`    
    a {
        ${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
        color: ${inverted};
        text-decoration: none;
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
