import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@frontend/web/components/lib/dateTime';
import { decidePillarLight } from '@frontend/web/components/lib/decidePillarLight';

const ageStyles = (designType?: DesignType) => css`
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

    > time {
        ${textSans.xsmall({
            fontWeight: designType === `Media` ? `bold` : `regular`,
        })};
    }
`;

const colourStyles = (designType: DesignType, pillar: Pillar) => {
    switch (designType) {
        case 'Live':
            return css`
                /* stylelint-disable-next-line color-no-hex */
                color: ${decidePillarLight(pillar)};
            `;
        case 'Feature':
        case 'Interview':
        case 'Media':
        case 'Analysis':
        case 'Article':
        case 'Review':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Comment':
        case 'Immersive':
        default:
            return css`
                color: ${palette.neutral[60]};
            `;
    }
};

type Props = {
    designType: DesignType;
    pillar: Pillar;
    webPublicationDate: string;
    showClock?: boolean;
};

export const CardAge = ({
    designType,
    pillar,
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
        <span
            className={cx(
                ageStyles(designType),
                colourStyles(designType, pillar),
            )}
        >
            {showClock && <ClockIcon />}
            <time dateTime={webPublicationDate}>{displayString}</time>
        </span>
    );
};
