import React from 'react';
import { bylineTokens } from '@frontend/amp/lib/byline-tokens';
import { css } from 'emotion';

const profileImageStyle = css``;

const profileImage = (contributorTag: TagType) => {
    const url = contributorTag.bylineImageUrl;

    if (url) {
        return (
            <amp-img
                className={profileImageStyle}
                src={url}
                alt={contributorTag.title}
                width="180"
                height="150"
            />
        );
    }

    return null;
};

export const Byline: React.FC<{
    byline: string;
    tags: TagType[];
    pillar: Pillar;
    guardianBaseURL: string;
    className?: string;
}> = ({ byline, tags, guardianBaseURL, className }) => {
    const contributorTags = tags.filter(tag => tag.type === 'Contributor');
    const tokens = bylineTokens(byline, contributorTags);
    const mainContributor = contributorTags[0];

    const linkedByline = tokens.map(token => {
        const matchedTag = contributorTags.find(tag => tag.title === token);

        if (matchedTag) {
            return (
                <a href={`${guardianBaseURL}/${matchedTag.id}`}>
                    {matchedTag.title}
                </a>
            );
        }

        return token;
    });

    return (
        <div className={className}>
            {linkedByline}
            {mainContributor && profileImage(mainContributor)}
        </div>
    );
};
