import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { opinion } from '@guardian/src-foundations/palette';
import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
    letter: string;
    pillar: Pillar;
    designType: DesignType;
};

const dropCapStyles = (pillar: Pillar, designType: DesignType) => {
    const baseStyles = css`
        ${headline.large({
            fontWeight: 'light',
        })}
        text-transform: uppercase;
        box-sizing: border-box;
        margin-right: 4px;

        font-size: 109px;
        line-height: 90px;

        display: inline-block;
        vertical-align: text-top;
        pointer-events: none;
    `;

    switch (designType) {
        case 'GuardianView':
        case 'Comment':
            return css`
                ${baseStyles};
                color: ${opinion[400]};
                font-weight: 200;
            `;
        case 'Analysis':
        case 'Feature':
        case 'Interview':
        case 'Article':
        case 'Media':
        case 'PhotoEssay':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return css`
                ${baseStyles};
                color: ${pillarPalette[pillar].dark};
                font-weight: 700;
            `;
    }
};

export const DropCap = ({ letter, pillar, designType }: Props) => (
    <span className={dropCapStyles(pillar, designType)}>{letter}</span>
);
