// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';

import { headlineFont, basePx } from 'styles';
import { Series } from 'capi';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${kicker};
    padding: ${basePx(.5, 1)};
    display: inline-block;
    position: relative;
    top: -78px;

    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${neutral[100]};
        text-decoration: none;
        white-space: nowrap;
        ${headlineFont}
    }
`;


// ----- Component ----- //

interface Props {
    series: Series;
    pillar: Pillar;
}

const Series = ({ series, pillar }: Props): JSX.Element | null => {

    if (series) {
        return (
            <nav css={Styles(getPillarStyles(pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        );
    }

    return null;

}


// ----- Exports ----- //

export default Series;
