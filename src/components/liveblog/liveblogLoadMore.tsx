import React from 'react';
import { sidePadding, icons, textSans } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { PillarStyles } from 'types/pillar';

const LiveblogLoadMoreStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    all: unset;
    ${sidePadding}
    color: ${palette.neutral[100]};
    margin: 32px 0 24px 0;
    
    &:focus {
        text-decoration: underline;
    }
    
    span {
        background: ${kicker};
        padding: 6px 16px;
        border-radius: 30px;
        text-overflow: ellipsis;
        max-width: 18.75rem;
        ${textSans}

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
        <button css={LiveblogLoadMoreStyles(pillarStyles)}>
            <span>View more updates</span>
        </button>
    )
}

export default LiveblogLoadMore;
