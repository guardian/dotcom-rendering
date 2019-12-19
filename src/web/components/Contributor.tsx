import React from 'react';
import { css } from 'emotion';
import TwitterIcon from '@frontend/static/icons/twitter.svg';
import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';

const twitterHandle = css`
    ${textSans.xsmall()};
    font-weight: bold;
    color: ${palette.neutral[46]};

    padding-right: 10px;
    display: inline-block;

    svg {
        height: 10px;
        max-width: 12px;
        margin-right: 0px;
        fill: ${palette.neutral[46]};
    }

    a {
        color: ${palette.neutral[46]};
        text-decoration: none;
    }
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline.xxxsmall()};
    color: ${pillarPalette[pillar].main};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
        :hover {
            text-decoration: underline;
        }
    }
`;

// This crazy function aims to split bylines such as
// 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
// Or
// 'Jane Doe and John Smith` to ['Jane Doe', ' and ', 'John Smith']
// It does this so we can have separate links to both contributors
const bylineAsTokens = (bylineText: string, tags: TagType[]): string[] => {
    const contributorTags = tags
        .filter(t => t.type === 'Contributor')
        .map(c => c.title);
    // The contributor tag title should exist inside the bylineText for this regex to work
    const regex = new RegExp(`(${contributorTags.join('|')})`);

    return bylineText.split(regex);
};

const RenderContributor: React.FC<{
    bylineText: string;
    tags: TagType[];
}> = ({ bylineText, tags }) => {
    const renderedTokens = bylineAsTokens(bylineText, tags).map((token, i) => {
        const associatedTags = tags.filter(t => t.title === token);
        if (associatedTags.length > 0) {
            return (
                <ContributorLink
                    contributor={token}
                    contributorTagId={associatedTags[0].id}
                    key={i}
                />
            );
        }
        return token;
    });

    return <>{renderedTokens}</>;
};

const ContributorLink: React.FC<{
    contributor: string;
    contributorTagId: string;
}> = ({ contributor, contributorTagId }) => (
    <a
        rel="author"
        data-link-name="auto tag link"
        href={`//www.theguardian.com/${contributorTagId}`}
    >
        {contributor}
    </a>
);

export const Contributor: React.FC<{
    author: AuthorType;
    tags: TagType[];
    pillar: Pillar;
}> = ({ author, tags, pillar }) => {
    if (!author.byline) {
        return null;
    }

    return (
        <address aria-label="Contributor info">
            <div className={bylineStyle(pillar)}>
                <RenderContributor bylineText={author.byline} tags={tags} />
            </div>
            {author.twitterHandle && (
                <div className={twitterHandle}>
                    <TwitterIcon />
                    <a
                        href={`https://www.twitter.com/${author.twitterHandle}`}
                        aria-label={`@${author.twitterHandle} on Twitter`}
                    >
                        @{author.twitterHandle}
                    </a>
                </div>
            )}
        </address>
    );
};
