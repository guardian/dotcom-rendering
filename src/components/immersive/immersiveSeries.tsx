import React from 'react';
import { headlineFont, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from '../../capi';
import { PillarStyles } from 'pillar';
import { palette } from '@guardian/src-foundations';

const SeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${kicker};
    padding: ${basePx(.5, 1)};
    display: inline-block;
    position: relative;
    top: -78px;

    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${palette.neutral[100]};
        text-decoration: none;
        white-space: nowrap;
        ${headlineFont}
    }
`;

interface ImmersiveSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const ImmersiveSeries = ({ series, pillarStyles }: ImmersiveSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <nav css={SeriesStyles(pillarStyles)}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        )
    }

    return null;

}

export default ImmersiveSeries;
