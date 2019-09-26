import React from 'react';
import { sidePadding, PillarStyles, icons } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';

const LiveblogLoadMoreStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    ${sidePadding}
    color: ${palette.neutral[100]};
    margin: 32px 0 24px 0;
    
    span {
        background: ${kicker};
        padding: 6px 16px;
        border-radius: 30px;
        text-overflow: ellipsis;
        max-width: 18.75rem;

        &::before {
            ${icons}
            content: '\\e050';
            margin-right: 16px;
            margin-top: -2px;
            font-size: 1.2rem;
        }
    }
`;

const LiveblogLoadMore = ({ pillarStyles }: { pillarStyles: PillarStyles }): JSX.Element => {
    return (
        <div css={LiveblogLoadMoreStyles(pillarStyles)}>
            <span>View more updates</span>
        </div>
    )
}

export default LiveblogLoadMore;
