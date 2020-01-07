import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { PulsingDot } from '@root/src/web/components/PulsingDot';

import { decidePillarLight } from '@frontend/web/components/lib/decidePillarLight';

const kickerStyles = (colour: string) => css`
    color: ${colour};
    font-weight: 700;
    margin-right: 4px;
`;

const slashStyles = css`
    &::after {
        content: '/';
        display: inline-block;
        margin-left: 4px;
    }
`;

const decideColour = (
    designType: DesignType,
    pillar: Pillar,
    inCard?: boolean,
) => {
    switch (designType) {
        case 'Live':
            // TODO: We need this colour in source foundation
            return inCard ? decidePillarLight(pillar) : palette[pillar].main;
        case 'Media':
            // On Media cards, when pillar is news we use the bright colour as this looks better on a dark background vs. main
            return inCard && pillar === 'news'
                ? palette[pillar].bright
                : palette[pillar].main;
        case 'Feature':
        case 'Interview':
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
            return palette[pillar].main;
    }
};

export const Kicker = ({
    text,
    designType,
    pillar,
    showPulsingDot,
    showSlash = true,
    inCard,
}: KickerType) => {
    const kickerColour = decideColour(designType, pillar, inCard);
    return (
        <span className={kickerStyles(kickerColour)}>
            {showPulsingDot && <PulsingDot colour={kickerColour} />}
            <span className={cx(showSlash && slashStyles)}>{text}</span>
        </span>
    );
};
