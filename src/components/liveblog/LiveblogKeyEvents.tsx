import React from 'react';
import { sidePadding, PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'

const LiveblogKeyEventsStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    ${sidePadding}
    h3 {
        color: ${kicker};
    }
`;

const LiveblogKeyEvents = ({ pillarStyles }: { pillarStyles: PillarStyles }): JSX.Element => {
    return (
        <div css={LiveblogKeyEventsStyles(pillarStyles)}>
            <h3>Key events</h3>
        </div>
    )
}

export default LiveblogKeyEvents;
