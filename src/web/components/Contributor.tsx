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

// this crazy function aims to split bylines such as
// 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
const bylineAsTokens = (bylineText: string, tags: TagType[]): string[] => {
    const contributorTags = tags
        .filter(t => t.type === 'Contributor')
        .map(c => c.title);
    const regex = new RegExp(`(${contributorTags.join('|')})`);

    return bylineText.split(regex);
};

const RenderContributor: React.FC<{
    bylineText: string;
    contributorTags: TagType[];
    pillar: Pillar;
}> = ({ bylineText, contributorTags, pillar }) => {
    const renderedTokens = bylineAsTokens(bylineText, contributorTags).map(
        (token, i) => {
            const associatedTags = contributorTags.filter(
                t => t.title === token,
            );
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
        },
    );

    return <div className={bylineStyle(pillar)}>{renderedTokens}</div>;
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
            <RenderContributor
                bylineText={author.byline}
                contributorTags={tags}
                pillar={pillar}
            />
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
