import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { headline } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';

const LiveblogHeadlineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${kicker};
    h1 {
        ${headline.medium()};
        margin: 0 0 ${remSpace[6]} 0;
        color: ${neutral[100]};
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
