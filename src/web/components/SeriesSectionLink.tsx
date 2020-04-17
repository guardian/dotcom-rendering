import React from 'react';
import { css, cx } from 'emotion';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space, neutral, brandAltBackground } from '@guardian/src-foundations';

import { Hide } from '@frontend/web/components/Hide';

type Props = {
    display: Display;
    tags: TagType[];
    sectionLabel: string;
    sectionUrl: string;
    guardianBaseURL: string;
    pillar: Pillar;
    badge?: BadgeType;
    isSpecial?: boolean;
};

const sectionLabelLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const rowBelowLeftCol = css`
    display: flex;
    flex-direction: column;
    ${until.leftCol} {
        flex-direction: row;
    }
`;

const marginBottom = css`
    margin-bottom: 5px;
`;

const yellowBackground = css`
    background-color: ${brandAltBackground.primary};
    padding-left: 2px;
`;

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

const primaryStyle = css`
    font-weight: 700;
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    ${from.leftCol} {
        ${headline.xxsmall({ fontWeight: 'bold' })};
    }

    padding-right: ${space[2]}px;
`;

const invertedStyle = (pillar: Pillar) => css`
    font-weight: 700;
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    ${from.leftCol} {
        ${headline.xxsmall({ fontWeight: 'bold' })};
    }
    color: ${neutral[100]};
    background-color: ${pillarPalette[pillar].main};

    padding-left: ${space[2]}px;
    padding-right: ${space[2]}px;
    padding-top: ${space[1]}px;
    padding-bottom: ${space[1]}px;
`;

const secondaryStyle = css`
    ${headline.xxxsmall({ fontWeight: 'regular' })};
    display: block;
`;

export const SeriesSectionLink = ({
    display,
    tags,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    badge,
    isSpecial,
}: Props) => {
    // If we have a tag, use it to show 2 section titles
    const tag = tags.find(
        thisTag =>
            thisTag.type === 'Blog' ||
            thisTag.type === 'Series' ||
            thisTag.title === 'The Observer',
    );

    if (tag) {
        return (
            // Sometimes the tags/titles are shown inline, sometimes stacked
            <div
                className={cx(
                    !badge && display !== 'immersive' && rowBelowLeftCol,
                    display === 'immersive' && marginBottom,
                )}
            >
                <a
                    href={`${guardianBaseURL}/${tag.id}`}
                    className={cx(
                        sectionLabelLink,
                        pillarColours[pillar],
                        display === 'immersive'
                            ? invertedStyle(pillar)
                            : primaryStyle,
                        isSpecial && yellowBackground,
                    )}
                    data-component="series"
                    data-link-name="article series"
                >
                    <span>{tag.title}</span>
                </a>

                {display !== 'immersive' && (
                    <Hide when="below" breakpoint="tablet">
                        <a
                            href={`${guardianBaseURL}/${sectionUrl}`}
                            className={cx(
                                sectionLabelLink,
                                pillarColours[pillar],
                                secondaryStyle,
                            )}
                            data-component="section"
                            data-link-name="article section"
                        >
                            <span>{sectionLabel}</span>
                        </a>
                    </Hide>
                )}
            </div>
        );
    }

    // Otherwise, there was no tag so just show 1 title
    return (
        <a
            href={`${guardianBaseURL}/${sectionUrl}`}
            className={cx(
                sectionLabelLink,
                pillarColours[pillar],
                display === 'immersive' ? invertedStyle(pillar) : primaryStyle,
            )}
            data-component="section"
            data-link-name="article section"
        >
            <span>{sectionLabel}</span>
        </a>
    );
};
