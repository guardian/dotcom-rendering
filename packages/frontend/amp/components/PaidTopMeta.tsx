// tslint:disable: react-a11y-role-has-required-aria-props
// How do we do these input dropdowns?

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
import Star from '@guardian/pasteup/icons/star.svg';
import { Byline } from '@frontend/amp/components/Byline';
import { string as curly } from 'curlyquotes';

const meta = css`
    @supports (display: grid) {
        grid-template-areas: 'meta';
    }

    padding-left: 10px;
    padding-right: 10px;
`;

const headerStyle = css`
    ${headline(5)};
    color: ${palette.neutral[7]};
    font-size: 1.75rem;
    line-height: 2rem;
    font-weight: 400;
    letter-spacing: -0.02rem;
    padding-top: 0.375rem;
    padding-bottom: 1.5rem;
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

// TODO - unclear if we need the list styles as well here
const listStyles = (pillar: Pillar) => css`
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
        color: ${palette.neutral[7]};
        margin-bottom: 12px;
        ${listStyles(pillar)};
        p {
            margin-bottom: 8px;
            font-weight: 300;
            margin-top: 0;
            line-height: 1.25rem;
        }
        strong {
            font-weight: 700;
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

const emptyStar = css`
    fill: transparent;
    stroke: ${palette.neutral[7]};
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, standfirst, pillar, starRating }) => {
    const stars = (n: number) => {
        return Array(5)
            .fill(0)
            .map((el, i) => {
                if (i < n) {
                    return <Star key={i} />;
                }
                return <Star className={emptyStar} key={i} />;
            });
    };

    return (
        <div className={headlineCss}>
            <h1 className={cx(headerStyle)}>{curly(headlineText)}</h1>

            {starRating !== undefined && (
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

const paidHeaderStyle = `
                background: #69d1ca;
                font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
                    sans-serif;
                font-size: 14px;
                width: 100%;
                line-height: 1.5;
            `;
export const PaidTopMeta: React.FC<{
    config: ConfigType;
    articleData: ArticleModel;
}> = ({ config, articleData }) => (
    <header className={header}>
        <div css={paidHeaderStyle}>
            <div
                css={`
                    padding: 0 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    box-sizing: border-box;
                `}
            >
                <div
                    css={`
                        display: flex;
                    `}
                >
                    <span
                        css={`
                            padding: 4px 6px;
                            align-items: center;
                            display: flex;
                        `}
                    >
                        Paid content
                    </span>
                    <div
                        css={`
                            position: relative;
                            align-items: center;
                            display: flex;
                            input:not(:checked) ~ div {
                                display: none;
                            }
                        `}
                    >
                        <input
                            type="checkbox"
                            value="selected"
                            id="paidforAbout"
                            css={`
                                display: none;
                            `}
                        />
                        <label
                            css={`
                                border-left: 1px solid rgba(0, 0, 0, 0.2);
                                border-right: 1px solid rgba(0, 0, 0, 0.2);
                                display: inline-block;
                                padding: 19px 10px;
                                ::after {
                                    content: '';
                                    display: inline-block;
                                    width: 4px;
                                    height: 4px;
                                    transform: translateY(-2px) rotate(45deg);
                                    border: 1px solid currentColor;
                                    border-top-color: currentcolor;
                                    border-top-style: solid;
                                    border-top-width: 1px;
                                    border-left-color: currentcolor;
                                    border-left-style: solid;
                                    border-left-width: 1px;
                                    border-left: transparent;
                                    border-top: transparent;
                                    margin-left: 2px;
                                    vertical-align: middle;
                                }
                            `}
                            htmlFor="paidforAbout"
                        >
                            About
                        </label>
                        <div
                            css={`
                                position: absolute;
                                background: #121212;
                                font-weight: normal;
                                left: 100px;
                                top: 38px;
                                padding: 16px;
                                color: #ffffff;
                                transform: translate(-50%, 0);
                                width: 234px;
                                border-radius: 4px;
                                z-index: 32000;
                            `}
                        >
                            <span
                                css={`
                                    display: block;
                                    margin: 0 0 1em;
                                    font-weight: normal;
                                    color: #ffffff;
                                `}
                            >
                                Paid content is paid for and controlled by an
                                advertiser and produced by the Guardian Labs
                                team.
                            </span>
                            <a
                                href="https://www.theguardian.com/content-funding"
                                css={`
                                    color: #69d1ca;
                                    display: block;
                                    text-decoration: none;
                                `}
                            >
                                Learn more about Guardian Labs content
                                <span>
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        css={`
                                            display: inline-block;
                                            vertical-align: middle;
                                            fill: #69d1ca;
                                            height: 20px;
                                            width: 20px;
                                        `}
                                    >
                                        <path d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <a
                    href="https://www.theguardian.com/guardian-labs"
                    css={`
                        margin: auto 0;
                    `}
                >
                    <span>
                        <svg width="88.9" height="47">
                            <path d="M20.2 15.6l1.5-.8V2.6h-1.2l-2.9 3.8h-.3l.2-4.2H30l.2 4.2h-.3l-2.8-3.8h-1.2v12.2l1.6.8v.4h-7.2v-.4zm11.2-.6V1.5L30.2 1V.8l4.4-.8h.4v6.4l.1-.1a6 6 0 0 1 3.7-1.4c1.9 0 2.7 1.1 2.7 3.1v7l1 .6v.4h-5.7v-.4l1-.6V8c0-1.1-.5-1.5-1.4-1.5-.6 0-1.1.2-1.5.5v8l1 .6v.4h-5.7v-.4l1.2-.6zm14.3-4.1c.1 2.2 1.1 4 3.5 4 1.1 0 2-.5 2.7-.9v.4c-.6.8-2.1 1.9-4.2 1.9-3.7 0-5.5-2-5.5-5.6 0-3.5 2.1-5.6 5.4-5.6 3.1 0 4.7 1.6 4.7 5.7v.1h-6.6zm0-.5l3.2-.2c0-2.8-.5-4.6-1.4-4.6-1 0-1.8 2.1-1.8 4.8zM0 21.4c0-5.9 3.9-8 8.2-8 1.8 0 3.6.3 4.5.7l.1 4.1h-.4l-2.5-4C9.5 14 9 14 8.3 14c-2.3 0-3.5 2.7-3.4 7 0 5.2 1 7.6 3.1 7.6l1.3-.2v-5.6L7.8 22v-.5h6.7v.5l-1.4.8v5.5c-1.1.4-3.1.9-5.1.9-4.9 0-8-2.3-8-7.8z" />
                            <path d="M13.9 18.6v-.3l4.5-.8h.5v8.9c0 1.1.5 1.4 1.4 1.4.6 0 1.1-.2 1.5-.7v-8l-1.2-.5v-.4l4.5-.8h.5v10.2l1.2.5v.3l-4.5.6h-.5v-1.3h-.1c-.8.8-2 1.4-3.4 1.4-2.2 0-3.2-1.3-3.2-3.2v-6.8l-1.2-.5zm28.5-1.1h.4v3.3h.1c.5-2.4 1.6-3.3 2.9-3.3l.6.1V21l-.9-.1c-1 0-1.8.2-2.5.5v6.5l1 .6v.4h-6v-.4l1.1-.6V19l-1.2-.4v-.3l4.5-.8zm11.3.2v-3.5l-1.2-.4v-.3l4.6-.8.4.1v15l1.3.5v.4l-4.5.6h-.4v-1.2h-.1a4 4 0 0 1-3 1.3c-2.5 0-4.3-1.9-4.3-5.7 0-4.1 2.1-6.1 5.3-6.1.9-.2 1.6 0 1.9.1zm0 9.6v-9c-.3-.2-.5-.4-1.3-.4-1.2 0-2 1.9-2 5.2 0 3 .5 4.6 2.2 4.6.5 0 .9-.1 1.1-.4zm10-9.8h.4v10.4l1 .6v.4h-5.9v-.4l1.1-.6v-8.8l-1.3-.5v-.3l4.7-.8zm.4-2.9c0 1.1-.9 1.9-2 1.9s-2-.8-2-1.9c0-1.1.9-1.9 2-1.9s2 .8 2 1.9zm13.2 13.3V19l-1.2-.4v-.4l4.5-.8h.5v1.3h.1c1-.9 2.4-1.4 3.9-1.4 2 0 2.8.9 2.8 3v7.6l1.1.6v.4h-6v-.4l1.1-.6v-7.4c0-1.1-.5-1.6-1.4-1.6a3 3 0 0 0-1.6.5v8.5l1 .6v.4h-5.9v-.4l1.1-.6zm-6.4-5.6v-1.5c0-2.2-.5-3-1.9-3h-.5L66 21.1h-.3V18c1.1-.3 2.4-.7 4.1-.7 3 0 4.8.8 4.8 3.4v7.2l1.1.3v.3c-.4.3-1.3.5-2.2.5-1.5 0-2.2-.5-2.5-1.3h-.1c-.6.9-1.5 1.3-2.9 1.3-1.8 0-3-1.1-3-3.1 0-1.9 1.2-2.9 3.5-3.3l2.4-.3zm0 5v-4.5l-.8.1c-1.2.1-1.6.9-1.6 2.5 0 1.8.6 2.3 1.4 2.3.6 0 .8-.1 1-.4zm-38.1-5v-1.5c0-2.2-.5-3-1.9-3h-.5L28 21.3h-.3v-3.1c1.1-.3 2.4-.7 4.1-.7 3 0 4.8.8 4.8 3.4v7.2l1.1.3v.3c-.4.3-1.3.5-2.2.5-1.5 0-2.2-.5-2.5-1.3h-.1c-.6.9-1.5 1.3-2.9 1.3-1.8 0-3-1.1-3-3.1 0-1.9 1.2-2.9 3.5-3.3l2.3-.5zm0 5v-4.5l-.8.1c-1.2.1-1.6.9-1.6 2.5 0 1.8.6 2.3 1.4 2.3.5 0 .8-.1 1-.4zm-12.7 19l1.4-.3V32.4l-1.4-.3v-.4h7.2v.4l-1.5.3v13.9h2.4l3.4-5.3h.4l-.3 5.7H20.1v-.4zM38.6 40v-1.5c0-2.3-.5-3-1.8-3h-.4l-2.8 3.8h-.4l.1-3.5c1.1-.3 2.4-.7 4.2-.7 3.1 0 4.8.8 4.8 3.4v7.4l1.1.3v.3c-.4.3-1.3.5-2.3.5-1.5 0-2.2-.5-2.6-1.3h-.1c-.6.9-1.6 1.4-3 1.4-1.8 0-3.1-1.1-3.1-3.1 0-1.9 1.2-2.9 3.6-3.4l2.7-.6zm0 5.1v-4.6l-.8.1c-1.2.1-1.6.9-1.6 2.6 0 1.8.6 2.3 1.4 2.3.6 0 .8-.1 1-.4zm16.6-4.4c0 4.4-2.5 6.3-6.2 6.3-1.9 0-3.8-.4-4.8-1V31.8l-1.3-.5V31l4.5-.7.5.1v6.1h.1c.6-.7 1.7-1.4 3.3-1.4 2.1 0 3.9 1.5 3.9 5.6zm-4 .4c0-3.4-.7-4.4-2-4.4l-1.2.2v9.3c.3.3.7.4 1.2.4 1.2 0 2-1.4 2-5.5zm13.3 2.1c0 2.3-1.6 3.7-4.7 3.7-1.4 0-2.8-.2-3.9-.6l-.1-3.3h.4l3 3.5.6.1c1.3 0 1.8-.7 1.8-1.7 0-.9-.5-1.3-1.8-1.9l-.7-.3c-2.1-1-3.3-2-3.3-3.9 0-2.3 1.6-3.7 4.4-3.7 1.1 0 2.4.1 3.3.4l.1 3.1h-.4l-2.3-3-.7-.1c-1.1 0-1.6.6-1.6 1.6s.5 1.3 1.9 2l.6.3c2.3.9 3.4 1.7 3.4 3.8z" />
                        </svg>
                    </span>
                    <span
                        css={`
                            border: 0;
                            clip: rect(0 0 0 0);
                            height: 0.0625rem;
                            margin: -0.0625rem;
                            overflow: hidden;
                            padding: 0;
                            position: absolute;
                            width: 0.0625rem;
                        `}
                    >
                        Guardian Labs
                    </span>
                </a>
            </div>
        </div>
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
