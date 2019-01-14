import React from 'react';
import { headline, textSans } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import Dateline from '@frontend/web/components/Dateline';
import { ShareCount } from '@frontend/web/components/ShareCount';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import TwitterIcon from '@guardian/pasteup/icons/twitter.svg';
import { ShareIcons } from '@frontend/amp/components/ShareIcons';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { Elements } from '@frontend/amp/components/lib/Elements';

const byline = css`
    font-style: italic;
`;

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 15px;
    margin-bottom: 6px;
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

const profile = css`
    ${headline(2)};
    font-weight: 700;
    margin-bottom: 4px;
`;

const listStyles = css`
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

const standfirstCss = css`
    ${textSans(5)};
    font-weight: 700;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;
    ${listStyles};
    p {
        margin-bottom: 8px;
    }
`;

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

const headlinePillarColours = pillarMap(pillar => {
    if (pillar === 'news') {
        return css`
            color: ${palette.neutral[7]};
        `;
    }

    return css`
        color: ${pillarPalette[pillar].main};
    `;
});

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

const metaExtras = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    margin-left: -10px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const MainBlock: React.SFC<{
    config: ConfigType;
    articleData: ArticleModel;
}> = ({ config, articleData }) => (
    <header className={header}>
        <Elements
            pillar={articleData.pillar}
            elements={articleData.mainMediaElements}
        />
        <div className={headlineCss}>
            <h1
                className={cx(
                    headerStyle,
                    headlinePillarColours[articleData.pillar],
                )}
            >
                {articleData.headline}
            </h1>
            <div // tslint:disable-line:react-no-dangerous-html
                className={cx(
                    standfirstCss,
                    standfirstLinks[articleData.pillar],
                )}
                dangerouslySetInnerHTML={{
                    __html: articleData.standfirst,
                }}
            />
        </div>
        <div className={cx(meta, guardianLines)}>
            <div className={cx(profile, pillarColours[articleData.pillar])}>
                <span className={byline}>
                    {/* <RenderByline
                        bylineText={author.byline}
                        contributorTags={tags}
                        pillar={pillar}
                    /> */}
                </span>
            </div>
            {articleData.author.twitterHandle && (
                <div className={twitterHandle}>
                    <TwitterIcon />
                    <a
                        href={`https:// www.twitter.com/${
                            articleData.author.twitterHandle
                        }`}
                    >
                        @{articleData.author.twitterHandle}
                    </a>
                </div>
            )}
            <Dateline dateDisplay={articleData.webPublicationDateDisplay} />
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
