import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/pasteup/palette';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import { Byline } from '@guardian/guui/components/Byline/Byline';
import { getAgeWarning } from '@frontend/model/age-warning';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline, textSans, body } from '@guardian/pasteup/typography';
import { getSharingUrls } from '@frontend/model/sharing-urls';
import {
    from,
    until,
    leftCol,
    tablet,
    mobileLandscape,
    wide,
} from '@guardian/pasteup/breakpoints';

import { ShareCount } from './ShareCount';
import { Dateline } from './Dateline';
import { MainMedia } from './MainMedia';
import { SeriesSectionLink } from './SeriesSectionLink';
import { SharingIcons } from './ShareIcons';

const curly = (x: any) => x;

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

    li {
        ${headline(2)};
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

const headlineCSS = css`
    @supports (display: grid) {
        grid-template-areas: 'headline';
    }
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const leftColWidth = css`
    ${leftCol} {
        width: 140px;
    }

    ${wide} {
        width: 220px;
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

const section = css`
    ${leftColWidth};
    @supports (display: grid) {
        grid-template-areas: 'section';
    }
    ${until.phablet} {
        padding: 0 10px;
    }
`;

type Props = {
    CAPI: CAPIType;
    config: ConfigType;
};

export const ArticleHeader = ({ CAPI, config }: Props) => {
    const ageWarning = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);
    return (
        <header className={header}>
            <div className={section}>
                <SeriesSectionLink CAPI={CAPI} fallbackToSection={true} />
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
                    <MainMedia element={element} key={i} pillar={CAPI.pillar} />
                ))}
            </div>
        </header>
    );
};
