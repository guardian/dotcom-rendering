import React from 'react';
import { css } from 'react-emotion';
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

const section = (colour: string) => css`
    ${leftColWidth};
    grid-template-areas: section;
    font-size: 16px;
    line-height: 20px;
    font-family: ${serif.headline};
    font-weight: 900;
    color: ${colour};

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

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
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
    font-weight: 400;
    padding-bottom: 24px;
    padding-top: 3px;
`;

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }

    p {
        font-size: 16px;
        line-height: 24px;
        font-family: ${serif.body};
        margin-bottom: 12px;
    }
`;

const profile = (colour: string) => css`
    color: ${colour};
    font-size: 16px;
    line-height: 20px;
    font-family: ${serif.headline};
    font-weight: 700;
    margin-bottom: 4px;
`;

const ageWarning = (colour: string) => css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${sans.body};
    display: inline-block;
    color: ${colour};
    margin-bottom: 12px;
    fill: ${colour};
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

const pillarColour = palette.lifestyle.main; // TODO make dynamic

const dtFormat = (date: Date) => dateformat(date, 'ddd d mmm yyyy HH:MM "GMT"');

const header = css`
    ${until.phablet} {
        margin: 0 -10px;
    }
`;

const ArticleBody: React.SFC<{
    CAPI: CAPIType;
    config: ConfigType;
}> = ({ CAPI, config }) => (
    <div className={wrapper}>
        <header className={header}>
            <div className={section(pillarColour)}>{CAPI.sectionName}</div>
            <div className={headline}>
                <h1 className={headerStyle}>{CAPI.headline}</h1>
                <div
                    className={standfirst}
                    dangerouslySetInnerHTML={{
                        __html: CAPI.standfirst,
                    }}
                />
            </div>
            <div className={meta}>
                <div className={profile(pillarColour)}>{CAPI.author}</div>
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
                        pillarColour={pillarColour}
                        displayIcons={['facebook', 'twitter', 'email']}
                    />
                    <ShareCount config={config} CAPI={CAPI} />
                    {CAPI.ageWarning && (
                        <div className={ageWarning(pillarColour)}>
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
                className={bodyStyle}
                dangerouslySetInnerHTML={{
                    __html: CAPI.body,
                }}
            />
            <div>Submeta</div>
        </div>
    </div>
);

export default ArticleBody;
