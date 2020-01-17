import React from 'react';
import { basePx, headlineFont, headlineFontStyles } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';

const LiveblogHeadlineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    padding: ${basePx(0, 0, 4, 0)};
    background: ${kicker};
    h1 {
        ${headlineFontStyles}
        ${headlineFont}
        font-weight: 500;
        color: ${palette.neutral[100]};
    }
`;

interface LiveblogHeadlineProps {
    headline: string;
    pillar: Pillar;
}

const LiveblogHeadline = ({ headline, pillar }: LiveblogHeadlineProps): JSX.Element =>
    <LeftColumn className={LiveblogHeadlineStyles(getPillarStyles(pillar))}>
        <h1>{ headline }</h1>
    </LeftColumn>

export default LiveblogHeadline;
