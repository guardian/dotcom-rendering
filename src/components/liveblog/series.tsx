import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import { Series } from '../../capi';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { Option, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    padding-bottom: 0;
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
    pipe2(
        props.series,
        map(series =>
            <LeftColumn className={LiveblogSeriesStyles(getPillarStyles(props.pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </LeftColumn>
        ),
        withDefault<JSX.Element | null>(null),
    );

export default LiveblogSeries;
