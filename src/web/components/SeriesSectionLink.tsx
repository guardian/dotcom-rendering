import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const sectionLabelText = css`
    font-weight: 700;
`;

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
    ${headline({ level: 1 })};
    ${from.leftCol} {
        ${headline({ level: 2 })};
    }
`;

const secondaryStyle = css`
    ${headline({ level: 1 })};
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
            <span className={sectionLabelText}>{tagTitle}</span>
        </a>
    );
};

export const SeriesSectionLink: React.FC<{
    CAPI: CAPIType;
    fallbackToSection: boolean;
}> = ({ CAPI, fallbackToSection }) => {
    const tag = CAPI.tags.find(t => t.type === 'Blog' || t.type === 'Series');

    if (!tag && !fallbackToSection) {
        return null;
    }

    if (!tag && (CAPI.sectionLabel && CAPI.sectionUrl)) {
        return (
            <TagLink
                pillar={CAPI.pillar}
                guardianBaseURL={CAPI.guardianBaseURL}
                tagTitle={CAPI.sectionLabel}
                tagUrl={CAPI.sectionUrl}
                dataLinkName="article section"
                weightingClass={primaryStyle}
            />
        );
    }

    if (tag) {
        return (
            <>
                <TagLink
                    pillar={CAPI.pillar}
                    guardianBaseURL={CAPI.guardianBaseURL}
                    tagTitle={tag.title}
                    tagUrl={tag.id}
                    dataLinkName="article series"
                    weightingClass={primaryStyle}
                />
                <TagLink
                    pillar={CAPI.pillar}
                    guardianBaseURL={CAPI.guardianBaseURL}
                    tagTitle={CAPI.sectionLabel}
                    tagUrl={CAPI.sectionUrl}
                    dataLinkName="article section"
                    weightingClass={secondaryStyle}
                />
            </>
        );
    }

    return null;
};
