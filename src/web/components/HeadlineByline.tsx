import React from 'react';
import { css } from 'emotion';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

import { BylineLink } from '@root/src/web/components/BylineLink';
import { pillarPalette } from '@frontend/lib/pillars';

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
    background-color: ${brandAltBackground.primary};
    box-shadow: 4px 0 0 ${brandAltBackground.primary},
        -6px 0 0 ${brandAltBackground.primary};
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
    })}
    line-height: 38px;
    font-style: italic;
    color: ${pillarPalette[pillar].main};

    a {
        color: inherit;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

type Props = {
    designType: DesignType;
    pillar: Pillar;
    byline: string;
    tags: TagType[];
};

export const HeadlineByline = ({ designType, pillar, byline, tags }: Props) => {
    switch (designType) {
        case 'Interview':
            return (
                <div className={wrapperStyles}>
                    <div className={yellowBoxStyles}>
                        <BylineLink byline={byline} tags={tags} />
                    </div>
                </div>
            );
        case 'GuardianView':
        case 'Comment':
            return (
                <div className={opinionStyles(pillar)}>
                    <BylineLink byline={byline} tags={tags} />
                </div>
            );

        case 'Analysis':
        case 'Feature':
        case 'Article':
        case 'Media':
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
            return null;
    }
};
