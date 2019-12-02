import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';

import { escapeData } from '@root/src/lib/escapeData';
import { getDist } from '@root/src/lib/assets';

import { makeWindowGuardian } from '@root/src/model/window-guardian';
import { Article } from '../pages/Article';
import { htmlTemplate } from './htmlTemplate';

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

export const document = ({ data }: Props) => {
    const { CAPI, NAV, linkedData } = data;
    const title = `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;
    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(
            // TODO: CacheProvider can be removed when we've moved over to using @emotion/core
            <CacheProvider value={cache}>
                <Article data={{ CAPI, NAV }} />
            </CacheProvider>,
        ),
    );

    /**
     * Preload the following woff2 font files
     * TODO: Identify critical fonts to preload
     */
    const fontFiles = [
        // 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
        // 'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
        'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
        'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
        'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
        'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
        'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
        'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
        'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
    ];

    const polyfillIO =
        'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,default,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,fetch,NodeList.prototype.forEach&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

    /**
     * The highest priority scripts.
     * These scripts have a considerable impact on site performance.
     * Only scripts critical to application execution may go in here.
     * Please talk to the dotcom platform team before adding more.
     * Scripts will be executed in the order they appear in this array
     */
    const priorityScripts = [
        polyfillIO,
        getDist('sentry.js'),
        getDist('react.js'),
        CAPI.config && CAPI.config.commercialBundleUrl,
    ];

    /**
     * Low priority scripts. These scripts will be requested
     * asynchronously after the main HTML has been parsed. Execution
     * order is not guaranteed. It is even possible that these execute
     * *before* the high priority scripts, although this is very
     * unlikely.
     */
    const lowPriorityScripts = [
        getDist('ga.js'),
        getDist('ophan.js'),
        getDist('lotame.js'),
        'https://www.google-analytics.com/analytics.js',
    ];

    /**
     * We escape windowGuardian here to prevent errors when the data
     * is placed in a script tag on the page
     */
    const windowGuardian = escapeData(
        JSON.stringify(makeWindowGuardian(data, cssIDs)),
    );

    const ampLink = `https://amp.theguardian.com/${data.CAPI.pageId}`;

    const description = `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;

    const openGraphData = CAPI.openGraphData;
    const twitterData = CAPI.twitterData;

    return htmlTemplate({
        linkedData,
        priorityScripts,
        lowPriorityScripts,
        css,
        html,
        fontFiles,
        title,
        description,
        windowGuardian,
        ampLink,
        openGraphData,
        twitterData,
    });
};
