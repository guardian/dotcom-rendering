import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

type Props = {
    text: string;
    designType: DesignType;
    pillar: Pillar;
    size: SmallHeadlineSize;
};

const bylineStyles = (size: SmallHeadlineSize) => css`
    display: block;
    ${headline[size]()};
    font-style: italic;
`;

const colourStyles = (designType: DesignType, pillar: Pillar) => {
    switch (designType) {
        // Sometimes comment pieces can have the news pillar but should still be styled as opinion
        case 'Comment':
            return css`
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
                color: ${palette[pillar].main};
            `;
    }
};

export const Byline = ({ text, designType, pillar, size }: Props) => (
    <span className={cx(bylineStyles(size), colourStyles(designType, pillar))}>
        {text}
    </span>
);
