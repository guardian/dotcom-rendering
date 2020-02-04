import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const sectionLabelLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
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
    dataLinkName: string;
    weightingClass: string;
}> = ({
    pillar,
    guardianBaseURL,
    tagTitle,
    tagUrl,
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
            data-link-name={dataLinkName}
        >
            <span>{tagTitle}</span>
        </a>
    );
};

export const SeriesSectionLink: React.FC<{
    tags: CAPIType['tags'];
    sectionLabel: CAPIType['sectionLabel'];
    sectionUrl: CAPIType['sectionUrl'];
    guardianBaseURL: CAPIType['guardianBaseURL'];
    pillar: CAPIType['pillar'];
    fallbackToSection: boolean;
}> = ({
    tags,
    sectionLabel,
    sectionUrl,
    guardianBaseURL,
    pillar,
    fallbackToSection,
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
            <>
                <TagLink
                    pillar={pillar}
                    guardianBaseURL={guardianBaseURL}
                    tagTitle={tag.title}
                    tagUrl={tag.id}
                    dataLinkName="article series"
                    weightingClass={primaryStyle}
                />
                <TagLink
                    pillar={pillar}
                    guardianBaseURL={guardianBaseURL}
                    tagTitle={sectionLabel}
                    tagUrl={sectionUrl}
                    dataLinkName="article section"
                    weightingClass={secondaryStyle}
                />
            </>
        ) : null;
    }

    if (fallbackToSection && (sectionLabel && sectionUrl)) {
        return (
            <TagLink
                pillar={pillar}
                guardianBaseURL={guardianBaseURL}
                tagTitle={sectionLabel}
                tagUrl={sectionUrl}
                dataLinkName="article section"
                weightingClass={primaryStyle}
            />
        );
    }

    return null;
};
