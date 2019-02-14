import React from 'react';
import { bylineTokens } from '@frontend/amp/lib/byline-tokens';
import { css } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { pillarPalette } from '@frontend/lib/pillars';

const bylineStyle = (pillar: Pillar) => css`
    ${headline(2)};
    color: ${pillarPalette[pillar].main};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
    }
`;

export const Byline: React.FC<{
    byline: string;
    tags: TagType[];
    pillar: Pillar;
    guardianBaseURL: string;
}> = ({ byline, tags, pillar, guardianBaseURL }) => {
    const contributorTags = tags.filter(tag => tag.type === 'Contributor');
    const tokens = bylineTokens(byline, contributorTags);

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

    return <div className={bylineStyle(pillar)}>{linkedByline}</div>;
};
