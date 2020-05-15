import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from 'capi';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { headline } from '@guardian/src-foundations/typography';
import { Option } from 'types/option';

const ArticleSeriesStyles = ({ inverted }: PillarStyles): SerializedStyles => css`    
    a {
        ${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
        color: ${inverted};
        text-decoration: none;
    }
`;

interface ArticleSeriesProps {
    series: Option<Series>;
    pillar: Pillar;
}

const ArticleSeries = (props: ArticleSeriesProps): JSX.Element | null =>

    props.series.fmap<ReactElement | null>(series =>
        <nav css={ArticleSeriesStyles(getPillarStyles(props.pillar))}>
            <a href={series.webUrl}>{series.webTitle}</a>
        </nav>
    ).withDefault(null);

export default ArticleSeries;
