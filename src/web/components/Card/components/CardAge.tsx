import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@frontend/web/components/lib/dateTime';

const ageStyles = css`
    ${textSans.xsmall()};
    color: ${palette.neutral[60]};

    /* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
    padding-left: 5px;
    padding-right: 5px;

    svg {
        fill: ${palette.neutral[46]};
        margin-bottom: -1px;
        height: 11px;
        width: 11px;
        margin-right: 2px;
    }
`;

type Props = {
    webPublicationDate: string;
    showClock?: boolean;
};

export const CardAge = ({ webPublicationDate, showClock }: Props) => {
    const displayString = makeRelativeDate(
        new Date(webPublicationDate).getTime(),
        {
            format: 'short',
        },
    );

    if (!displayString) {
        return null;
    }

    return (
        <span className={ageStyles}>
            {showClock && <ClockIcon />}
            <time dateTime={webPublicationDate}>{displayString}</time>
        </span>
    );
};
