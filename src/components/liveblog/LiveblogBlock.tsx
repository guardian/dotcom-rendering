import React from 'react';
import { sidePadding, PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    ${sidePadding}
    background: ${palette.neutral[100]};
    padding: 8px;
    margin: 8px;
    border-top: solid 1px ${highlighted ? palette.neutral[86] : kicker};
    border-bottom: solid 2px ${palette.neutral[93]};
`;

interface LiveblogBlockProps {
    pillarStyles: PillarStyles;
    highlighted: boolean
}

const LiveblogBlock = ({ pillarStyles, highlighted }: LiveblogBlockProps): JSX.Element => {
    return (
        <div css={LiveblogBlockStyles(pillarStyles, highlighted)}>
            <h1>Block</h1>
        </div>
    )
}

export default LiveblogBlock;
