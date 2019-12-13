import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@frontend/web/components/lib/dateTime';

const ageStyles = (designType?: DesignType) => css`
    ${textSans.xsmall()};
    color: ${palette.neutral[60]};

    /* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
    padding-left: ${designType === `Media` ? 0 : `5px`};
    padding-right: ${designType === `Media` ? 0 : `5px`};

    svg {
        fill: ${palette.neutral[46]};
        margin-bottom: -1px;
        height: 11px;
        width: 11px;
        margin-right: 2px;
    }

    > time {
        ${textSans.xsmall({
            fontWeight: designType === `Media` ? `bold` : `regular`,
        })};
    }
`;

type Props = {
    webPublicationDate: string;
    showClock?: boolean;
    designType?: DesignType;
};

export const CardAge = ({
    designType,
    webPublicationDate,
    showClock,
}: Props) => {
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
        <span className={ageStyles(designType)}>
            {showClock && <ClockIcon />}
            <time dateTime={webPublicationDate}>{displayString}</time>
        </span>
    );
};
