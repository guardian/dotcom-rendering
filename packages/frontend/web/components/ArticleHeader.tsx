import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/pasteup/palette';
import ClockIcon from '@frontend/static/icons/clock.svg';
import { getAgeWarning } from '@frontend/lib/age-warning';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import {
    until,
    leftCol,
    tablet,
    mobileLandscape,
    headline,
    textSans,
    body,
} from '@guardian/src-foundations';

import { MainMedia } from './MainMedia';

const curly = (x: any) => x;

const standfirst = css`
    ${body({ level: 2 })};
    font-weight: 700;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;

    li {
        ${textSans({ level: 3 })};
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

    p {
        margin-bottom: 8px;
    }

    li {
        ${headline({ level: 1 })};
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

const captionFont = css`
    ${textSans({ level: 1 })};
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
    ${headline({ level: 5 })};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;

    ${tablet} {
        padding-bottom: 36px;
    }
`;

const headlineCSS = css`
    max-width: 630px;
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const ageWarningStyle = css`
    ${textSans({ level: 3 })};
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

const headerStyles = css`
    ${until.phablet} {
        margin: 0 -10px;
    }

    display: flex;
    flex-direction: column;
`;

type Props = {
    CAPI: CAPIType;
    config: ConfigType;
};

export const ArticleHeader = ({ CAPI, config }: Props) => {
    const ageWarning = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);
    return (
        <header className={headerStyles}>
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
                <div // tslint:disable-line:react-no-dangerous-html
                    className={cx(standfirst, standfirstLinks[CAPI.pillar])}
                    dangerouslySetInnerHTML={{
                        __html: CAPI.standfirst,
                    }}
                />
            </div>
            <div className={cx(mainMedia)}>
                {CAPI.mainMediaElements.map((element, i) => (
                    <MainMedia element={element} key={i} pillar={CAPI.pillar} />
                ))}
            </div>
        </header>
    );
};
