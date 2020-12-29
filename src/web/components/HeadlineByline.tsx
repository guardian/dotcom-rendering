import React from 'react';
import { css, cx } from 'emotion';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

import { BylineLink } from '@root/src/web/components/BylineLink';
import { pillarPalette } from '@frontend/lib/pillars';
import { Display } from '@guardian/types/Format';

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

const whiteText = css`
    color: white;
`;

const immersiveStyles = css`
    ${headline.xsmall({
        fontWeight: 'light',
    })}
    margin-bottom: ${space[6]}px;
`;

const immersiveLinkStyles = (pillar: Pillar) => css`
    a {
        color: ${pillarPalette[pillar].main};
        border-bottom: 1px solid ${pillarPalette[pillar].main};
        text-decoration: none;
        :hover {
            border-bottom: 1px solid ${pillarPalette[pillar].dark};
            color: ${pillarPalette[pillar].dark};
            text-decoration: none;
        }
    }
`;

// If there is an image reduce the width of the author div
const authorBylineWithImage = css`
    width: 68%;
`;

type Props = {
    display: Display;
    designType: DesignType;
    pillar: Pillar;
    byline: string;
    tags: TagType[];
};

export const HeadlineByline = ({
    display,
    designType,
    pillar,
    byline,
    tags,
}: Props) => {
    switch (display) {
        case Display.Immersive: {
            switch (designType) {
                case 'GuardianView':
                case 'Comment':
                    return (
                        <div className={cx(opinionStyles(pillar), whiteText)}>
                            <BylineLink byline={byline} tags={tags} />
                        </div>
                    );
                case 'Interview':
                case 'Analysis':
                case 'Feature':
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
                default:
                    if (byline) {
                        return (
                            <div className={immersiveStyles}>
                                by{' '}
                                <span className={immersiveLinkStyles(pillar)}>
                                    <BylineLink byline={byline} tags={tags} />
                                </span>
                            </div>
                        );
                    }

                    return null;
            }
        }
        case Display.Showcase:
        case Display.Standard:
        default: {
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
                        <div
                            className={`${opinionStyles(pillar)} ${
                                tags.filter((tag) => tag.type === 'Contributor')
                                    .length === 1
                                    ? authorBylineWithImage
                                    : ''
                            }`}
                        >
                            <BylineLink byline={byline} tags={tags} />
                        </div>
                    );

                case 'Analysis':
                case 'Feature':
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
                default:
                    return null;
            }
        }
    }
};
