// tslint:disable:react-no-dangerous-html

import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import {
    from,
    until,
    wide,
    leftCol,
    desktop,
    tablet,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';
import { clearFix, screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline, textSans, body } from '@guardian/pasteup/typography';
import { Byline } from '@guardian/guui/components/Byline/Byline';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { ArticleRenderer } from '@frontend/web/components/lib/ArticleRenderer';
import { ShareCount } from './ShareCount';
import { SharingIcons } from './ShareIcons';
import { SubMetaLinksList } from './SubMetaLinksList';
import { Dateline } from './Dateline';

import { MainMedia } from './MainMedia';
import { getSharingUrls } from '@frontend/model/sharing-urls';
import { getAgeWarning } from '@frontend/model/age-warning';
import { SyndicationButton } from './SyndicationButton';

const curly = (x: any) => x;

const wrapper = css`
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;
    ${clearFix}

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
            @supports (display: grid) {
                display: grid;
                grid-template-areas: 'section headline' 'meta main-media';
                grid-template-columns: 160px 1fr;
                margin-left: -160px;
            }
        }

        ${wide} {
            @supports (display: grid) {
                grid-template-columns: 240px 1fr;
                margin-left: -240px;
            }
        }
    }
`;

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

// TODO refactor  to use in Caption.tsx
// const pillarFigCaptionIconColor = pillarMap(
//     pillar =>
//         css`
//             figcaption {
//                 &::before {
//                     border-color: transparent transparent
//                         ${pillarPalette[pillar].main} transparent;
//                 }
//             }
//         `,
// );

const listStyles = css`
    li {
        ${textSans(5)};
        margin-bottom: 6px;
        padding-left: 20px;

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

const standfirst = css`
    ${body(2)};
    font-weight: 700;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;

    ${listStyles};

    p {
        margin-bottom: 8px;
    }
`;

const standfirstLinks = pillarMap(
    pillar =>
        css`
            a {
                color: ${pillarPalette[pillar].dark};
                text-decoration: none;
                border-bottom: 1px solid ${palette.neutral[86]};
                transition: border-color 0.15s ease-out;
            }
        `,
);

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
    @supports (display: grid) {
        grid-template-areas: 'section';
    }
    ${headline(2)};
    font-weight: 700;

    ${leftCol} {
        ${headline(3)};
    }

    ${until.phablet} {
        padding: 0 10px;
    }
`;

const headlineCSS = css`
    @supports (display: grid) {
        grid-template-areas: 'headline';
    }
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const meta = css`
    ${leftColWidth};
    @supports (display: grid) {
        grid-template-areas: 'meta';
    }
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
    ${textSans(1)};
    color: ${palette.neutral[46]};
`;

const mainMedia = css`
    @supports (display: grid) {
        grid-template-areas: 'main-media';
    }

    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    margin-bottom: 6px;

    ${until.tablet} {
        margin: 0;
        order: -1;

        figcaption {
            display: none;
        }
    }

    img {
        flex: 0 0 auto; /* IE */
        width: 100%;
        height: 100%;
    }

    figcaption {
        ${captionFont};
    }
`;

const headerStyle = css`
    ${headline(7)};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;

    ${tablet} {
        padding-bottom: 36px;
    }
`;

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }

    h2 {
        ${body(3)};
        margin-bottom: 0.0625rem;
        font-weight: 900;
    }

    strong {
        font-weight: bold;
    }

    img {
        width: 100%;
        height: auto;
    }

    figcaption {
        ${captionFont};
    }

    figure {
        margin-top: 16px;
        margin-bottom: 12px;
    }

    ul {
        margin-bottom: 12px;
    }

    ${tablet} {
        ul {
            margin-bottom: 16px;
        }
    }

    ${listStyles};
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline(7)};
        font-weight: 200;
    }
`;

const linkColour = pillarMap(
    pillar => css`
        a {
            text-decoration: none;
            border-bottom: 1px solid ${palette.neutral[86]};
            ${pillarColours[pillar]};

            :hover {
                border-bottom: 1px solid ${pillarPalette[pillar].main};
            }
        }
    `,
);

const ageWarningStyle = css`
    ${textSans(5)};
    color: ${palette.neutral[7]};
    background-color: ${palette.highlight.main};
    display: inline-block;
    margin-bottom: 6px;

    > strong {
        font-weight: bold;
    }

    padding: 6px 10px;
    margin-top: 6px;
    margin-left: -10px;

    ${mobileLandscape} {
        padding-left: 12px;
    }

    ${tablet} {
        margin-left: -20px;
    }

    ${leftCol} {
        margin-left: -10px;
        margin-top: -6px;
        padding-left: 10px;
    }
`;

const ageWarningScreenReader = css`
    ${screenReaderOnly};
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

const header = css`
    ${until.phablet} {
        margin: 0 -10px;
    }
`;

const sectionLabelLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const subMeta = css`
    margin-top: 12px;
    padding-top: 18px;
`;

const subMetaLabel = css`
    ${textSans(1)};
    display: block;
    color: ${palette.neutral[60]};
`;

const subMetaSharingIcons = css`
    :after {
        content: '';
        display: block;
        clear: left;
    }
`;

export const ArticleBody: React.FC<{
    CAPI: CAPIType;
    config: ConfigType;
}> = ({ CAPI, config }) => {
    const hasSubMetaSectionLinks = CAPI.subMetaSectionLinks.length > 0;
    const hasSubMetaKeywordLinks = CAPI.subMetaKeywordLinks.length > 0;
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);
    const ageWarning = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);
    return (
        <div className={wrapper}>
            <header className={header}>
                <div className={section}>
                    {CAPI.sectionLabel && CAPI.sectionUrl && (
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
                    )}
                </div>
                <div className={headlineCSS}>
                    {ageWarning && (
                        <div className={ageWarningStyle} aria-hidden="true">
                            <ClockIcon /> This article is more than{' '}
                            <strong>{ageWarning}</strong>
                        </div>
                    )}
                    <h1 className={headerStyle}>{curly(CAPI.headline)}</h1>
                    {ageWarning && (
                        <div className={ageWarningScreenReader}>
                            This article is more than {` ${ageWarning}`}
                        </div>
                    )}
                    <div
                        className={cx(standfirst, standfirstLinks[CAPI.pillar])}
                        dangerouslySetInnerHTML={{
                            __html: CAPI.standfirst,
                        }}
                    />
                </div>
                <div className={cx(meta, guardianLines)}>
                    <Byline
                        author={CAPI.author}
                        tags={CAPI.tags}
                        pillar={CAPI.pillar}
                    />
                    <Dateline
                        dateDisplay={CAPI.webPublicationDateDisplay}
                        descriptionText={'Published on'}
                    />
                    <div className={metaExtras}>
                        <SharingIcons
                            sharingUrls={sharingUrls}
                            pillar={CAPI.pillar}
                            displayIcons={['facebook', 'twitter', 'email']}
                        />
                        <ShareCount config={config} pageId={CAPI.pageId} />
                    </div>
                </div>
                <div className={cx(mainMedia)}>
                    {CAPI.mainMediaElements.map((element, i) => (
                        <MainMedia
                            element={element}
                            key={i}
                            pillar={CAPI.pillar}
                        />
                    ))}
                </div>
            </header>

            <div>
                <div
                    className={cx(bodyStyle, linkColour[CAPI.pillar], {
                        [immersiveBodyStyle]: CAPI.isImmersive,
                    })}
                >
                    <ArticleRenderer
                        elements={CAPI.blocks[0] ? CAPI.blocks[0].elements : []}
                        pillar={CAPI.pillar}
                    />
                </div>
                <div className={cx(subMeta, guardianLines)}>
                    {(hasSubMetaSectionLinks || hasSubMetaKeywordLinks) && (
                        <span className={subMetaLabel}>Topics</span>
                    )}
                    {hasSubMetaSectionLinks && (
                        <SubMetaLinksList
                            links={CAPI.subMetaSectionLinks}
                            isSectionLinkList={true}
                            pillar={CAPI.pillar}
                        />
                    )}
                    {hasSubMetaKeywordLinks && (
                        <SubMetaLinksList
                            links={CAPI.subMetaKeywordLinks}
                            isSectionLinkList={false}
                            pillar={CAPI.pillar}
                        />
                    )}
                    {CAPI.showBottomSocialButtons && (
                        <SharingIcons
                            className={subMetaSharingIcons}
                            sharingUrls={sharingUrls}
                            pillar={CAPI.pillar}
                            displayIcons={[
                                'facebook',
                                'twitter',
                                'email',
                                'linkedIn',
                                'pinterest',
                                'whatsApp',
                                'messenger',
                            ]}
                        />
                    )}
                    {CAPI.showBottomSocialButtons && (
                        <SyndicationButton
                            webUrl={CAPI.webURL}
                            internalPageCode={CAPI.pageId}
                        />
                    )}
                    }
                </div>
            </div>
        </div>
    );
};
