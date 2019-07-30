import React from 'react';
import { headline, textSans } from '@guardian/pasteup/typography';
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
import { LinkStyle } from '../elements/Text';

const headerStyle = css`
    ${headline(5)};
    font-weight: 100;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline(5)};
    color: ${pillarPalette[pillar].main};
    font-style: italic;
    font-weight: 100;
    padding-top: 3px;

    a {
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
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
    pillar: Pillar;
}> = ({ articleData, pillar }) => {
    const contributorTag = articleData.tags.find(t => t.type === 'Contributor');
    const bylineImageUrl = contributorTag
        ? contributorTag.bylineImageUrl
        : null;

    return (
        <div className={bylineWrapper}>
            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={pillar}
                guardianBaseURL={articleData.guardianBaseURL}
                className={cx(bylineStyle(pillar), {
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

const brandingStyle = (pillar: Pillar) => css`
    padding: 10px 0;
    ${LinkStyle(pillar)}

    a, a:hover {
        display: block;
        border-bottom: none;
        ${textSans(1)}
    }
`;

const brandingLabelStyle = css`
    ${textSans(1)};
`;

const brandingLogoStyle = css`
    padding: 10px 0;
`;

const Branding: React.FC<{
    branding: Branding;
    pillar: Pillar;
}> = ({ branding, pillar }) => {
    const { logo, sponsorName } = branding;

    return (
        <div className={brandingStyle(pillar)}>
            <div className={brandingLabelStyle}>{branding.logo.label}</div>
            {/* tslint:disable-next-line: react-a11y-anchors */}
            <a
                className={brandingLogoStyle}
                href={logo.link}
                data-sponsor={sponsorName.toLowerCase()}
                rel="nofollow"
                aria-label={`Visit the ${sponsorName} website`}
            >
                <amp-img
                    src={logo.src}
                    width={`140px`}
                    height={`90px`}
                    alt={sponsorName}
                />
            </a>
            <a href={branding.aboutThisLink}>About this content</a>
        </div>
    );
};

export const TopMetaOpinion: React.FC<{
    articleData: ArticleModel;
    pillar: Pillar;
}> = ({ articleData, pillar }) => {
    const branding =
        articleData.commercialProperties[articleData.editionId].branding;

    return (
        <header>
            {articleData.mainMediaElements.map((element, i) => (
                <MainMedia key={i} element={element} pillar={pillar} />
            ))}

            <SeriesLink
                baseURL={articleData.guardianBaseURL}
                tags={articleData.tags}
                pillar={pillar}
                fallbackToSection={false}
            />

            <h1 className={headerStyle}>{articleData.headline}</h1>

            {branding && <Branding branding={branding} pillar={pillar} />}

            <BylineMeta articleData={articleData} pillar={pillar} />

            <Standfirst text={articleData.standfirst} pillar={pillar} />

            <TopMetaExtras
                sharingUrls={getSharingUrls(
                    articleData.pageId,
                    articleData.webTitle,
                )}
                pillar={pillar}
                ageWarning={getAgeWarning(
                    articleData.tags,
                    articleData.webPublicationDate,
                )}
                webPublicationDate={articleData.webPublicationDateDisplay}
                twitterHandle={articleData.author.twitterHandle}
            />
        </header>
    );
};
