import React from 'react';
import { PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${palette.neutral[100]};
    padding: 8px;
    margin: 8px;
    border-top: solid 1px ${highlighted ? kicker : palette.neutral[86]};
    border-bottom: solid 2px ${palette.neutral[93]};
`;

interface LiveblogBlockProps {
    pillarStyles: PillarStyles;
    highlighted: boolean;
}

const LiveblogBlock = ({ pillarStyles, highlighted }: LiveblogBlockProps): JSX.Element => {
    return (
        <article css={LiveblogBlockStyles(pillarStyles, highlighted)}>
            <h3>Block</h3>
        </article>
    )
}

export default LiveblogBlock;
