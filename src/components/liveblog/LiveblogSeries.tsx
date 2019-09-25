import React from 'react';
import { sidePadding, PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { Series } from '../../types/Capi';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    background: ${kicker};
    ${sidePadding}
    padding-top: 8px;
    a {
        font-weight: 900;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${palette.neutral[93]};
        text-decoration: none;
    }
`;

interface LiveblogSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const LiveblogSeries = ({ series, pillarStyles }: LiveblogSeriesProps): JSX.Element | null =>
    series ? <div css={LiveblogSeriesStyles(pillarStyles)}><a href={series.webUrl}>{series.webTitle}</a></div> : null

export default LiveblogSeries;
