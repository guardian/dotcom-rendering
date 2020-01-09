import React from 'react';
import { sidePadding, headlineFont, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { Series } from '../../capi';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';
import { from } from '@guardian/src-foundations/mq';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    background: ${kicker};
    ${sidePadding}
    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${palette.neutral[100]};
        text-decoration: none;
        ${headlineFont}

        ${from.wide} {
            padding: ${basePx(0, 1)};
        }
    }
`;

interface LiveblogSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const LiveblogSeries = ({ series, pillarStyles }: LiveblogSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <LeftColumn className={LiveblogSeriesStyles(pillarStyles)}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </LeftColumn>
        );
    }

    return null;

}

export default LiveblogSeries;
