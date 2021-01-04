import React from 'react';
import { css, cx } from 'emotion';

import { PulsingDot } from '@root/src/web/components/PulsingDot';

import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';
import { pillarPalette } from '@frontend/lib/pillars';

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
    pillar: CAPIPillar,
    inCard?: boolean,
) => {
    switch (designType) {
        case 'Live':
            // TODO: We need this colour in source foundation
            return inCard
                ? decidePillarLight(pillar)
                : pillarPalette[pillar].main;
        case 'Media':
            // On Media cards, when pillar is news we use the bright colour as this looks better on a dark background vs. main
            return inCard && pillar === 'news'
                ? pillarPalette[pillar].bright
                : pillarPalette[pillar].main;
        case 'Feature':
        case 'PhotoEssay':
        case 'Interview':
        case 'Analysis':
        case 'Article':
        case 'Review':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Comment':
        default:
            return pillarPalette[pillar].main;
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
