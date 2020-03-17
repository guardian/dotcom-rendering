import React from 'react';
import { sidePadding, textPadding } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import { Series } from '../../capi';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    background: ${kicker};
    ${sidePadding}
    a {
        font-weight: 700;
        color: ${neutral[100]};
        text-decoration: none;
        ${textPadding}
    }
`;

interface LiveblogSeriesProps {
    series: Series;
    pillar: Pillar;
}

const LiveblogSeries = ({ series, pillar }: LiveblogSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <LeftColumn className={LiveblogSeriesStyles(getPillarStyles(pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </LeftColumn>
        );
    }

    return null;

}

export default LiveblogSeries;
