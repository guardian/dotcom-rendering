import React from 'react';
import { css, cx } from 'react-emotion';
import TwitterIcon from '@guardian/pasteup/icons/twitter.svg';
import { palette } from '@guardian/pasteup/palette';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import dateformat from 'dateformat';
import { sans, serif } from '@guardian/pasteup/fonts';
import { ShareCount } from './ShareCount';
import { SharingIcons } from './ShareIcons';

// tslint:disable:react-no-dangerous-html

import {
    from,
    until,
    wide,
    leftCol,
    desktop,
} from '@guardian/pasteup/breakpoints';
import { pillarMap, pillarPalette } from '../pillars';

const wrapper = css`
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;

    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }

    ${leftCol} {
        margin-left: 150px;
        margin-right: 310px;
        position: relative;
        :before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 1px;
            background: ${palette.neutral[86]};
        }
    }

    ${wide} {
        margin-left: 230px;
    }

    header {
        display: flex;
        flex-direction: column;

        ${leftCol} {
            display: grid;
            grid-template-areas: 'section headline' 'meta main-media';
            grid-template-columns: 160px 1fr;
            margin-left: -160px;
        }

        ${wide} {
            grid-template-columns: 240px 1fr;
            margin-left: -240px;
        }
    }
`;

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

const standfirst = css`
    font-family: ${serif.body};
    font-weight: 700;
    font-size: 17px;
    line-height: 22px;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;
`;

const leftColWidth = css`
    ${leftCol} {
        width: 140px;
    }

    ${wide} {
        width: 220px;
    }
`;

const section = css`
    ${leftColWidth};
    grid-template-areas: section;
    font-size: 16px;
    line-height: 20px;
    font-family: ${serif.headline};
    font-weight: 700;

    ${leftCol} {
        font-size: 22px;
        line-height: 28px;
    }

    ${until.phablet} {
        padding: 0 10px;
    }
`;

const headline = css`
    grid-template-areas: headline;

    ${until.phablet} {
        padding: 0 10px;
    }
`;

const meta = css`
    ${leftColWidth};
    grid-template-areas: meta;

    ${from.tablet.until.leftCol} {
        order: 1;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
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

const captionFont = css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${sans.body};
    color: ${palette.neutral[46]};
`;

const mainMedia = css`
    grid-template-areas: main-media;
    margin-bottom: 6px;

    ${until.tablet} {
        margin: 0;
        order: -1;

        figcaption {
            display: none;
        }
    }

    img {
        width: 100%;
        height: 100%;
    }

    figcaption {
        ${captionFont};
    }
`;

const headerStyle = css`
    font-size: 34px;
    line-height: 38px;
    font-family: ${serif.headline};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;
`;

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }

    p {
        font-size: 17px;
        line-height: 24px;
        font-family: ${serif.body};
        margin-bottom: 12px;
    }
`;

const linkColour = pillarMap(
    pillar => css`
        a {
            text-decoration: none;
            border-bottom: 1px solid #dcdcdc;
            ${pillarColours[pillar]};

            :hover {
                border-bottom: 1px solid ${pillarPalette[pillar].main};
            }
        }
    `,
);

const profile = css`
    font-size: 16px;
    line-height: 20px;
    font-family: ${serif.headline};
    font-weight: 700;
    margin-bottom: 4px;
`;

const ageWarning = css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${sans.body};
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;

    ${leftCol} {
        margin-top: 6px;
    }
`;

const twitterHandle = css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${sans.body};
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
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

const metaExtras = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    ${until.phablet} {
        margin-left: -10px;
        margin-right: -10px;
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const dtFormat = (date: Date) => dateformat(date, 'ddd d mmm yyyy HH:MM "GMT"');

const header = css`
    ${until.phablet} {
        margin: 0 -10px;
    }
`;

const subMeta = css`
    margin-top: 12px;
    padding-top: 18px;
`;

const subMetaLabel = css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${sans.body};
    display: block;
    color: ${palette.neutral[60]};
`;

const subMetaLink = css`
    display: inline-block;
    font-family: ${serif.body};
    a {
        position: relative;
        display: block;
        padding: 0 5px;
        text-decoration: none;
    }
    a::after {
        content: '/';
        font-size: 16px;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -3px;
        color: ${palette.neutral[86]};
    }
    a:hover {
        text-decoration: underline;
    }
`;

const hideSlash = css`
    a::after {
        content: '';
    }
`;

const SubMetaLink: React.SFC<{
    text: string;
    url: string;
    isLastIndex: boolean;
}> = ({ text, url, isLastIndex }) => (
    <>
        <li className={cx(subMetaLink, { [hideSlash]: isLastIndex })}>
            <a href={url}>{text}</a>
        </li>
    </>
);

const subMetaLinks = css`
    list-style: none;
    margin-left: -5px;
`;

const SubMetaSectionLinks: React.SFC<{
    CAPI: CAPIType;
}> = ({ CAPI }) => {
    const { subMetaSectionLinks } = CAPI;

    if (subMetaSectionLinks.length) {
        return (
            <ul className={subMetaLinks}>
                {subMetaSectionLinks.map((link, i) => (
                    <SubMetaLink
                        text={link.title}
                        url={link.url}
                        key={link.url}
                        isLastIndex={i === subMetaSectionLinks.length - 1}
                    />
                ))}
            </ul>
        );
    }

    return <></>;
};

const sectionLabelLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

// const SubMetaKeywordLinks: React.SFC<{
//     CAPI: CAPIType;
// }> = ({ CAPI }) => {
//     const links: SubMetaLink[] = [];
//     const { tags } = CAPI;

//     if (tags) {
//         const keywordTags = tags
//             .filter(tag => tag.type === 'Keyword')
//             .slice(1, 6);

//         keywordTags.forEach(tag => {
//             links.push({
//                 url: tag.id,
//                 text: tag.title,
//             });
//         });
//     }

//     if (links.length) {
//         return (
//             <ul className={subMetaLinks}>
//                 {links.map((link, i) => (
//                     <SubMetaLink
//                         text={link.text}
//                         url={link.url}
//                         key={link.url}
//                         isLastIndex={i === links.length - 1}
//                     />
//                 ))}
//             </ul>
//         );
//     }

//     return <></>;
// };

const ArticleBody: React.SFC<{
    CAPI: CAPIType;
    config: ConfigType;
}> = ({ CAPI, config }) => (
    <div className={wrapper}>
        <header className={header}>
            {CAPI.sectionLabel &&
                CAPI.sectionUrl && (
                    <div>
                        <a
                            className={cx(
                                sectionLabelLink,
                                pillarColours[CAPI.pillar],
                            )}
                            href={`https://www.theguardian.com/${
                                CAPI.sectionUrl
                            }`}
                            data-link-name="article section"
                        >
                            {CAPI.sectionLabel}
                        </a>
                    </div>
                )}
            <div className={headline}>
                <h1 className={headerStyle}>{CAPI.headline}</h1>
                <div
                    className={standfirst}
                    dangerouslySetInnerHTML={{
                        __html: CAPI.standfirst,
                    }}
                />
            </div>
            <div className={cx(meta, guardianLines)}>
                <div className={cx(profile, pillarColours[CAPI.pillar])}>
                    {CAPI.author}
                </div>
                <div className={twitterHandle}>
                    {/* TODO - from the contributor type tag */}
                    <TwitterIcon /> @ByRobDavies
                </div>
                <div className={dateline}>
                    {dtFormat(CAPI.webPublicationDate)}
                </div>
                <div className={metaExtras}>
                    <SharingIcons
                        sharingUrls={CAPI.sharingUrls}
                        pillar={CAPI.pillar}
                        displayIcons={['facebook', 'twitter', 'email']}
                    />
                    <ShareCount config={config} CAPI={CAPI} />
                    {CAPI.ageWarning && (
                        <div
                            className={cx(
                                ageWarning,
                                pillarColours[CAPI.pillar],
                                pillarFill[CAPI.pillar],
                            )}
                        >
                            <ClockIcon /> {CAPI.ageWarning}
                        </div>
                    )}
                </div>
            </div>
            <div
                className={mainMedia}
                dangerouslySetInnerHTML={{
                    __html: CAPI.main,
                }}
            />
        </header>
        <div>
            <div
                className={cx(bodyStyle, linkColour[CAPI.pillar])}
                dangerouslySetInnerHTML={{
                    __html: CAPI.body,
                }}
            />
            <div className={cx(subMeta, guardianLines)}>
                <span className={subMetaLabel}>Topics</span>
                <SubMetaSectionLinks CAPI={CAPI} />
                {/* <SubMetaKeywordLinks CAPI={CAPI} /> */}
            </div>
        </div>
    </div>
);

export default ArticleBody;
