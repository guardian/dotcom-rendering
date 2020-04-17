// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { border } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

import { Format } from 'format';
import { getPillarStyles } from 'pillarStyles';


// ----- Component ----- //

interface Props extends Format {
    count: number;
    commentable: boolean;
}

const styles = (colour: string): SerializedStyles => css`
    ${textSans.medium({ fontWeight: 'bold' })}
    border: none;
    background: none;
    border-left: 1px solid ${border.secondary};
    padding-top: ${remSpace[2]};
    color: ${colour};
`;

const bubbleStyles = (colour: string): SerializedStyles => css`
    width: 1rem;
    display: block;
    margin-left: auto;
    fill: ${colour};
`;

const getStyles = ({ pillar }: Format): SerializedStyles => {
    const colours = getPillarStyles(pillar);

    return styles(colours.kicker);
}

const getBubbleStyles = ({ pillar }: Format): SerializedStyles => {
    const colours = getPillarStyles(pillar);

    return bubbleStyles(colours.kicker);
}

const CommentCount: FC<Props> = ({ count, commentable, ...format }: Props) => {
    if (!commentable) {
        return null;
    }

    return (
        <button css={getStyles(format)}>
            <svg css={getBubbleStyles(format)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 8">
                <rect x="0" y="0" width="9" height="6" rx="1.2" />
                <polygon points="2,6 2,8 2.5,8 4,6" />
            </svg>
            { count.toLocaleString() }
        </button>
    );
}

// ----- Exports ----- //

export default CommentCount;
