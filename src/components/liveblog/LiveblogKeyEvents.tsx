import React from 'react';
import { PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations/palette';

const LiveblogKeyEventsStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${palette.neutral[100]};
    margin-top: -8px;
    margin-bottom: 32px;
    border-bottom: solid 2px ${palette.neutral[93]};
    padding: 8px;

    h3 {
        color: ${kicker};
        margin: 0;
    }
`;

const LiveblogKeyEvents = ({ pillarStyles }: { pillarStyles: PillarStyles }): JSX.Element => {
    return (
        <div css={LiveblogKeyEventsStyles(pillarStyles)}>
            <h3>Key events (7)</h3>
        </div>
    )
}

export default LiveblogKeyEvents;
