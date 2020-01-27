import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

import { BylineLink } from '@root/src/web/components/BylineLink';

const wrapperStyles = css`
    margin-left: 6px;
    margin-top: 5px;
    /* Without z-index here the byline appears behind the main image for showcase views */
    z-index: 1;
`;

const yellowBoxStyles = css`
    ${headline.xxsmall({
        fontWeight: 'regular',
        lineHeight: 'loose',
    })}
    font-style: italic;
    background-color: ${palette.brandYellow.main};
    box-shadow: 4px 0 0 ${palette.brandYellow.main},
        -6px 0 0 ${palette.brandYellow.main};
    display: inline-block;
    box-decoration-break: clone;

    a {
        color: inherit;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

const opinionStyles = (pillar: Pillar) => css`
    ${headline.medium({
        fontWeight: 'light',
        lineHeight: 'loose',
    })}
    font-style: italic;
    color: ${palette[pillar].main};

    a {
        color: inherit;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

const determineStyles = (designType: DesignType, pillar: Pillar) => {
    switch (designType) {
        case 'Interview':
            return yellowBoxStyles;
        case 'Comment':
            return opinionStyles(pillar);
        case 'Feature':
        case 'Review':
        case 'Live':
        case 'Media':
        case 'Analysis':
        case 'Article':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return undefined;
    }
};

type Props = {
    designType: 'Interview' | 'Comment';
    pillar: Pillar;
    byline: string;
    tags: TagType[];
};

export const HeadlineByline = ({ designType, pillar, byline, tags }: Props) => (
    <div className={wrapperStyles}>
        <div className={determineStyles(designType, pillar)}>
            <BylineLink byline={byline} tags={tags} />
        </div>
    </div>
);
