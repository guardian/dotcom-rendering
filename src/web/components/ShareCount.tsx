import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import ShareIcon from '@frontend/static/icons/share.svg';

type Props = {
    short: string;
    long: string;
};

const containerStyles = css`
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    ${textSans.medium()};
    font-weight: bold;
    color: ${palette.neutral[46]};
`;

const iconContainerStyles = css`
    height: 15px;
    margin: 0;
    text-align: right;
    margin-bottom: 3px;
`;

const iconStyles = css`
    fill: ${palette.neutral[46]};
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

export const ShareCount = ({ short, long }: Props) => {
    return (
        <div
            className={containerStyles}
            aria-label={`${short} Shares`}
            data-cy="share-counts"
        >
            <div className={iconContainerStyles}>
                <ShareIcon className={iconStyles} />
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
