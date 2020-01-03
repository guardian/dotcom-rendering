import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';

import { BylineLink } from '@frontend/web/components/BylineLink';

import TwitterIcon from '@frontend/static/icons/twitter.svg';

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

export const Contributor: React.FC<{
    designType: DesignType;
    author: AuthorType;
    tags: TagType[];
    pillar: Pillar;
}> = ({ designType, author, tags, pillar }) => {
    if (!author.byline) {
        return null;
    }

    const onlyOneContributor: boolean =
        tags.filter(tag => tag.type === 'Contributor').length === 1;

    return (
        <address aria-label="Contributor info">
            {designType !== 'Interview' && (
                <div className={bylineStyle(pillar)}>
                    <BylineLink byline={author.byline} tags={tags} />
                </div>
            )}
            {onlyOneContributor && author.twitterHandle && (
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
