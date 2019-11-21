import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@frontend/web/components/lib/dateTime';

const ageStyles = css`
    ${textSans.xsmall()};
    color: ${palette.neutral[60]};
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
};

export const CardAge = ({ webPublicationDate }: Props) => {
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
            <ClockIcon />
            <time dateTime={webPublicationDate}>{displayString}</time>
        </span>
    );
};
