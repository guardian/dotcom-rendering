import React from 'react';
import { headline, textSans, body } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { ShareCount } from '@frontend/web/components/ShareCount';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import TwitterIcon from '@guardian/pasteup/icons/twitter.svg';
import { ShareIcons } from '@frontend/amp/components/ShareIcons';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import { bylineTokens } from '@frontend/amp/lib/byline-tokens';
import Star from '@guardian/pasteup/icons/star.svg';

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

const meta = css`
    @supports (display: grid) {
        grid-template-areas: 'meta';
    }

    padding-left: 10px;
    padding-right: 10px;
`;

const headerStyle = css`
    ${headline(5)};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const headlineCss = css`
    @supports (display: grid) {
        grid-template-areas: 'headline';
    }
    padding: 0 10px;
`;

const header = css`
    margin: 0 -10px;
`;

const listStyles = (pillar: Pillar) => css`
    .bullet {
        color: transparent;
        font-size: 1px;
    }

    .bullet:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 2px;
        background-color: ${pillarPalette[pillar].main};
        margin-left: 0px;
    }

    // TODO - unclear if we need the list styles as well here
    li {
        margin-bottom: 6px;
        padding-left: 20px;
        ${headline(2)};
        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }
`;

const standfirstCss = pillarMap(
    pillar => css`
        ${body(2)};
        font-weight: 700;
        color: ${palette.neutral[7]};
        margin-bottom: 12px;
        ${listStyles(pillar)};
        p {
            margin-bottom: 8px;
        }
    `,
);

const ageWarningCss = css`
    ${textSans(1)};
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;
`;

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
            }
        `,
);

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

const pillarFill = pillarMap(
    pillar =>
        css`
            fill: ${pillarPalette[pillar].main};
        `,
);

const metaExtras = css`
    border-top: 1px solid ${palette.neutral[86]};
    border-bottom: 1px solid ${palette.neutral[86]};
    padding-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const bylineExtras = css`
    ${textSans(1)};
    color: ${palette.neutral[46]};
    padding-top: 2px;
    margin-bottom: 6px;
    text-decoration: none;
`;

const twitterIcon = css`
    fill: ${palette.neutral[46]};
    height: 12px;
    margin-bottom: -2px;
    width: 12px;
`;

const ratingsWrapper = css`
    background-color: ${palette.highlight.main};
    display: inline-block;
    padding: 6px 10px 0;
    margin: 0 0 6px -10px;
    line-height: 24px;

    svg {
        width: 20px;
        height: 20px;
    }
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, standfirst, pillar, starRating }) => {
    const stars = (n: number) => {
        return Array(n)
            .fill(0)
            .map(i => <Star key={i} />);
    };

    return (
        <div className={headlineCss}>
            <h1 className={cx(headerStyle)}>{headlineText}</h1>

            {starRating && starRating > 0 && (
                <div className={ratingsWrapper}>{stars(starRating)}</div>
            )}

            <div // tslint:disable-line:react-no-dangerous-html
                className={cx(standfirstCss[pillar], standfirstLinks[pillar])}
                dangerouslySetInnerHTML={{
                    __html: standfirst,
                }}
            />
        </div>
    );
};

const Byline: React.FC<{
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

export const TopMeta: React.FC<{
    config: ConfigType;
    articleData: ArticleModel;
}> = ({ config, articleData }) => (
    <header className={header}>
        {articleData.mainMediaElements.map((element, i) => (
            <MainMedia key={i} element={element} />
        ))}

        <Headline
            headlineText={articleData.headline}
            standfirst={articleData.standfirst}
            pillar={articleData.pillar}
            starRating={articleData.starRating}
        />

        <div className={meta}>
            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={articleData.pillar}
                guardianBaseURL={articleData.guardianBaseURL}
            />

            {articleData.author.twitterHandle && (
                <a
                    className={bylineExtras}
                    href={`https://twitter.com/${
                        articleData.author.twitterHandle
                    }`}
                >
                    <TwitterIcon className={twitterIcon} /> @
                    {articleData.author.twitterHandle}
                </a>
            )}

            <div className={bylineExtras}>
                {articleData.webPublicationDateDisplay}
            </div>

            <div className={metaExtras}>
                <ShareIcons
                    sharingUrls={articleData.sharingUrls}
                    pillar={articleData.pillar}
                    displayIcons={['facebook', 'twitter', 'email']}
                />
                <ShareCount config={config} pageId={articleData.pageId} />
                {articleData.ageWarning && (
                    <div
                        className={cx(
                            ageWarningCss,
                            pillarColours[articleData.pillar],
                            pillarFill[articleData.pillar],
                        )}
                    >
                        <ClockIcon /> {articleData.ageWarning}
                    </div>
                )}
            </div>
        </div>
    </header>
);
