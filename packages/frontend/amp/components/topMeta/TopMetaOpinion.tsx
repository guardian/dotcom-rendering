import React from 'react';
import { headline } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import { Byline } from '@frontend/amp/components/topMeta/Byline';
import { TopMetaExtras } from '@frontend/amp/components/topMeta/TopMetaExtras';
import { Standfirst } from '@frontend/amp/components/topMeta/Standfirst';
import { SeriesLink } from '@frontend/amp/components/topMeta/SeriesLink';
import { getSharingUrls } from '@frontend/model/sharing-urls';
import { getAgeWarning } from '@frontend/model/age-warning';

const headerStyle = css`
    ${headline(5)};
    font-weight: 100;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline(5)};
    font-weight: 100;
    padding-top: 3px;

    a {
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: italic;
    }
`;

const bylineImageStyle = css`
    display: block;
    margin-right: -18px;
    flex-shrink: 0;
`;

const bylineWrapper = css`
    display: flex;
    justify-content: space-between;

    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 1px 29px;
    margin: 0 -10px;
    padding: 0 10px;
`;

const bottomPadding = css`
    padding-bottom: 72px;
`;

const BylineMeta: React.SFC<{
    articleData: ArticleModel;
}> = ({ articleData }) => {
    const contributorTag = articleData.tags.find(t => t.type === 'Contributor');
    const bylineImageUrl = contributorTag
        ? contributorTag.bylineImageUrl
        : null;

    return (
        <div className={bylineWrapper}>
            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={articleData.pillar}
                guardianBaseURL={articleData.guardianBaseURL}
                className={cx(bylineStyle(articleData.pillar), {
                    [bottomPadding]: !bylineImageUrl,
                })}
            />

            {contributorTag && bylineImageUrl && (
                <amp-img
                    class={bylineImageStyle}
                    src={bylineImageUrl}
                    alt={`Contributor image for: ${contributorTag.title}`}
                    width="180"
                    height="150"
                />
            )}
        </div>
    );
};

export const TopMetaOpinion: React.FC<{
    articleData: ArticleModel;
}> = ({ articleData }) => (
    <header>
        {articleData.mainMediaElements.map((element, i) => (
            <MainMedia key={i} element={element} pillar={articleData.pillar} />
        ))}

        <SeriesLink
            baseURL={articleData.guardianBaseURL}
            tags={articleData.tags}
            pillar={articleData.pillar}
            fallbackToSection={false}
        />

        <h1 className={headerStyle}>{articleData.headline}</h1>

        <BylineMeta articleData={articleData} />

        <Standfirst text={articleData.standfirst} pillar={articleData.pillar} />

        <TopMetaExtras
            sharingUrls={getSharingUrls(
                articleData.pageId,
                articleData.webTitle,
            )}
            pillar={articleData.pillar}
            ageWarning={getAgeWarning(
                articleData.tags,
                articleData.webPublicationDate,
            )}
            webPublicationDate={articleData.webPublicationDateDisplay}
            twitterHandle={articleData.author.twitterHandle}
        />
    </header>
);
