import React from 'react';
import { css } from 'emotion';

import { pillarPalette } from '@root/src/lib/pillars';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';

type Props = {
    pillar: Pillar;
    short: string;
    long: string;
};

const containerStyles = (pillar: Pillar) => css`
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    ${textSans.medium()};
    font-weight: bold;
    color: ${pillarPalette[pillar].main};
`;

const iconContainerStyles = css`
    height: 15px;
    margin: 0;
    text-align: right;
    margin-bottom: -2px;
    svg {
        height: 18px;
        width: 18px;
    }
`;

const iconStyles = (pillar: Pillar) => css`
    fill: ${pillarPalette[pillar].main};
`;

const longStyles = css`
    display: block;

    ${between.leftCol.and.wide} {
        display: none;
    }
`;

const shortStyles = css`
    display: none;

    ${between.leftCol.and.wide} {
        display: block;
    }
`;

export const CommentCount = ({ short, long, pillar }: Props) => {
    return (
        <div
            className={containerStyles(pillar)}
            aria-label={`${short} Shares`}
            data-cy="share-comment-counts"
        >
            <div className={iconContainerStyles}>
                <CommentIcon className={iconStyles(pillar)} />
            </div>
            <div
                data-testid="long-share-count"
                className={longStyles}
                aria-hidden="true"
            >
                {long}
            </div>
            <div
                data-testid="short-share-count"
                className={shortStyles}
                aria-hidden="true"
            >
                {short}
            </div>
        </div>
    );
};
