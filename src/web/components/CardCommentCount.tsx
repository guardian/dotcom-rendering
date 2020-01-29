import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';

type Props = {
    short: string;
    long: string;
};

const containerStyles = css`
    display: flex;
    flex-direction: row;
    ${textSans.xsmall()};
    color: ${palette.neutral[60]};
`;

const iconContainerStyles = css`
    svg {
        fill: ${palette.neutral[46]};
        margin-bottom: -7px;
        height: 16px;
        width: 16px;
        margin-right: 2px;
    }
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

export const CardCommentCount = ({ short, long }: Props) => {
    return (
        <div className={containerStyles} aria-label={`${short} Comments`}>
            <div className={iconContainerStyles}>
                <CommentIcon />
            </div>
            <div className={longStyles} aria-hidden="true">
                {long}
            </div>
            <div className={shortStyles} aria-hidden="true">
                {short}
            </div>
        </div>
    );
};
