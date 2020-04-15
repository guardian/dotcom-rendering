import React from 'react';
import { css, cx } from 'emotion';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { Hide } from '@frontend/web/components/Hide';

type Props = {
    tags: TagType[];
    sectionLabel: string;
    sectionUrl: string;
    guardianBaseURL: string;
    pillar: Pillar;
    badge?: BadgeType;
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

const secondaryStyle = css`
    ${headline.xxxsmall({ fontWeight: 'regular' })};
    display: block;
`;

export const SeriesSectionLink = ({
    tags,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    badge,
}: Props) => {
    // If we have a tag, use it to show 2 section titles
    const blogTag = tags.find(tag => tag.type === 'Blog');
    const seriesTag = tags.find(tag => tag.type === 'Series');
    const publicationTag = tags.find(tag => tag.type === 'Publication');

    if (
        blogTag ||
        seriesTag ||
        (publicationTag && publicationTag.title === 'The Observer')
    ) {
        // Chose tag to use based on this order of importance
        const tag = blogTag || seriesTag || publicationTag;

        return tag ? (
            // Sometimes the tags/titles are shown inline, sometimes stacked
            <div className={cx(!badge && rowBelowLeftCol)}>
                <a
                    href={`${guardianBaseURL}/${tag.id}`}
                    className={cx(
                        sectionLabelLink,
                        pillarColours[pillar],
                        primaryStyle,
                    )}
                    data-component="series"
                    data-link-name="article series"
                >
                    <span>{tag.title}</span>
                </a>

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
            </div>
        ) : null;
    }

    // Otherwise, there was no tag so just show 1 title
    return (
        <a
            href={`${guardianBaseURL}/${sectionUrl}`}
            className={cx(
                sectionLabelLink,
                pillarColours[pillar],
                primaryStyle,
            )}
            data-component="section"
            data-link-name="article section"
        >
            <span>{sectionLabel}</span>
        </a>
    );
};
