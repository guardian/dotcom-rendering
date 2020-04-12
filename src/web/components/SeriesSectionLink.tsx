import React from 'react';
import { css, cx } from 'emotion';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { Hide } from '@frontend/web/components/Hide';

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

const TagLink: React.FC<{
    pillar: Pillar;
    guardianBaseURL: string;
    tagTitle: string;
    tagUrl: string;
    dataComponentName: string;
    dataLinkName: string;
    weightingClass: string;
}> = ({
    pillar,
    guardianBaseURL,
    tagTitle,
    tagUrl,
    dataComponentName,
    dataLinkName,
    weightingClass,
}) => {
    return (
        <a
            href={`${guardianBaseURL}/${tagUrl}`}
            className={cx(
                sectionLabelLink,
                pillarColours[pillar],
                weightingClass,
            )}
            data-component={dataComponentName}
            data-link-name={dataLinkName}
        >
            <span>{tagTitle}</span>
        </a>
    );
};

export const SeriesSectionLink: React.FC<{
    tags: TagType[];
    sectionLabel: string;
    sectionUrl: string;
    guardianBaseURL: string;
    pillar: Pillar;
    fallbackToSection?: boolean;
    badge?: BadgeType;
}> = ({
    tags,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    fallbackToSection,
    badge,
}) => {
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
            <div className={cx(!badge && rowBelowLeftCol)}>
                <TagLink
                    pillar={pillar}
                    guardianBaseURL={guardianBaseURL}
                    tagTitle={tag.title}
                    tagUrl={tag.id}
                    dataComponentName="series"
                    dataLinkName="article series"
                    weightingClass={primaryStyle}
                />

                <Hide when="below" breakpoint="tablet">
                    <TagLink
                        pillar={pillar}
                        guardianBaseURL={guardianBaseURL}
                        tagTitle={sectionLabel}
                        tagUrl={sectionUrl}
                        dataComponentName="section"
                        dataLinkName="article section"
                        weightingClass={secondaryStyle}
                    />
                </Hide>
            </div>
        ) : null;
    }

    if (fallbackToSection) {
        return (
            <TagLink
                pillar={pillar}
                guardianBaseURL={guardianBaseURL}
                tagTitle={sectionLabel}
                tagUrl={sectionUrl}
                dataComponentName="Section"
                dataLinkName="article section"
                weightingClass={primaryStyle}
            />
        );
    }

    return null;
};
