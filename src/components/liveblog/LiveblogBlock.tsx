import React from 'react';
import { sidePadding } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const LiveblogBlockStyles: SerializedStyles = css`
    ${sidePadding}
    background: white;
    padding: 8px;
    margin: 8px;
    border-top: solid 1px ${palette.neutral[86]};
    border-bottom: solid 2px ${palette.neutral[93]};
`;

const LiveblogBlock = (): JSX.Element => {
    return (
        <div css={LiveblogBlockStyles}>
            <h1>Block</h1>
        </div>
    )
}

export default LiveblogBlock;
