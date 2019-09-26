import React from 'react';
import { basePx, sidePadding, PillarStyles, headlineFont } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const LiveblogHeadlineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    padding: ${basePx(0, 0, 4, 0)};
    background: ${kicker};
    h1 {
        font-size: 2.8rem;
        line-height: 3.2rem;
        margin: 0;
        ${headlineFont}
        ${sidePadding}
        font-weight: 500;
        color: ${palette.neutral[100]};
    }
`;

interface LiveblogHeadlineProps {
    headline: string;
    pillarStyles: PillarStyles;
}

const LiveblogHeadline = ({ headline, pillarStyles }: LiveblogHeadlineProps): JSX.Element => {
    return (
        <div css={LiveblogHeadlineStyles(pillarStyles)}>
            <h1>{ headline }</h1>
        </div>
    )
}

export default LiveblogHeadline;
