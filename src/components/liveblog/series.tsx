import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import { Series } from '../../capi';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { Option } from 'types/option';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    background: ${kicker};
    a {
        font-weight: 700;
        color: ${neutral[100]};
        text-decoration: none;
    }
`;

interface LiveblogSeriesProps {
    series: Option<Series>;
    pillar: Pillar;
}

const LiveblogSeries = (props: LiveblogSeriesProps): JSX.Element | null =>

    props.series.fmap<JSX.Element | null>(series =>
            <LeftColumn className={LiveblogSeriesStyles(getPillarStyles(props.pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </LeftColumn>
    ).withDefault(null);

export default LiveblogSeries;
