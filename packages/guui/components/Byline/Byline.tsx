import React from 'react';
import { css, cx } from 'emotion';
import TwitterIcon from '@guardian/pasteup/icons/twitter.svg';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { leftCol } from '@guardian/pasteup/breakpoints';

const profile = css`
    ${headline(2)};
    font-weight: 700;
    margin-bottom: 4px;
`;

const pillarColour = (pillar: Pillar) => css`
    color: ${palette[pillar].main};
`;

const byline = css`
    font-style: italic;
`;

const bylineLink = css`
    ${headline(2)};
    font-style: normal;
    font-weight: 700;
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }

    ${leftCol} {
        ${headline(3)};
        line-height: 28px;
    }
`;

const twitterHandle = css`
    ${textSans(1)};
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

// this crazy function aims to split bylines such as
// 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
const bylineAsTokens = (bylineText: string, tags: TagType[]): string[] => {
    const contributorTags = tags
        .filter(t => t.type === 'Contributor')
        .map(c => c.title);
    const regex = new RegExp(`(${contributorTags.join('|')})`);

    return bylineText.split(regex);
};

const RenderByline: React.FC<{
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
                    <BylineContributor
                        contributor={token}
                        contributorTagId={associatedTags[0].id}
                        pillar={pillar}
                        key={i}
                    />
                );
            }
            return token;
        },
    );

    return <>{renderedTokens}</>;
};

const BylineContributor: React.FC<{
    contributor: string;
    contributorTagId: string;
    pillar: Pillar;
}> = ({ contributor, contributorTagId, pillar }) => (
    <a
        rel="author"
        className={cx(pillarColour(pillar), bylineLink)}
        data-link-name="auto tag link"
        href={`//www.theguardian.com/${contributorTagId}`}
    >
        {contributor}
    </a>
);

export const Byline: React.FC<{
    author: AuthorType;
    tags: TagType[];
    pillar: Pillar;
}> = ({ author, tags, pillar }) => (
    <>
        <div className={cx(pillarColour(pillar), profile)}>
            <span className={byline}>
                <RenderByline
                    bylineText={author.byline}
                    contributorTags={tags}
                    pillar={pillar}
                />
            </span>
        </div>
        {author.twitterHandle && (
            <div className={twitterHandle}>
                <TwitterIcon />
                <a href={`https://www.twitter.com/${author.twitterHandle}`}>
                    @{author.twitterHandle}
                </a>
            </div>
        )}
    </>
);
