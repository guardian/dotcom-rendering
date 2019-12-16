import React from 'react';
import { css } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';

import { palette } from '@guardian/src-foundations';

type Props = {
    letter: string;
    pillar: Pillar;
    designType: DesignType;
};

const outerStyles = (pillar: Pillar, designType: DesignType) => {
    const baseStyles = css`
        ${headline.large({
            fontWeight: 'light',
        })}
        float: left;
        text-transform: uppercase;
        box-sizing: border-box;
        margin-right: 4px;
    `;

    switch (designType) {
        case 'Comment':
            return css`
                ${baseStyles};
                color: ${palette.opinion.main};
            `;
        case 'Comment':
        case 'Analysis':
        case 'Feature':
        case 'Interview':
        case 'Article':
        case 'Media':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return css`
                ${baseStyles};
                color: ${palette[pillar].dark};
            `;
    }
};

const innerStyles = (designType: DesignType) => {
    const baseStyles = css`
        font-size: 109px;
        line-height: 90px;

        display: inline-block;
        vertical-align: text-top;
    `;

    switch (designType) {
        case 'Comment':
            return css`
                ${baseStyles};
                font-weight: 200;
            `;
        case 'Comment':
        case 'Analysis':
        case 'Feature':
        case 'Interview':
        case 'Article':
        case 'Media':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return css`
                ${baseStyles};
                font-weight: 700;
            `;
    }
};

export const DropCap = ({ letter, pillar, designType }: Props) => (
    <span className={outerStyles(pillar, designType)}>
        <span className={innerStyles(designType)}>{letter}</span>
    </span>
);
