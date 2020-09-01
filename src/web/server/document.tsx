import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';

import { escapeData } from '@root/src/lib/escapeData';
import { getDist } from '@root/src/lib/assets';

import { makeWindowGuardian } from '@root/src/model/window-guardian';
import { DecideLayout } from '../layouts/DecideLayout';
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
                <React.StrictMode>
                    <DecideLayout CAPI={CAPI} NAV={NAV} />
                </React.StrictMode>
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

    // Built with yarn getPfUrl (only get he 'features' from the returned result)
    const polyfillIOFeatures =
        'Array.from,Array.isArray,Array.prototype.entries,Array.prototype.every,Array.prototype.fill,Array.prototype.filter,Array.prototype.find,Array.prototype.findIndex,Array.prototype.forEach,Array.prototype.includes,Array.prototype.indexOf,Array.prototype.keys,Array.prototype.lastIndexOf,Array.prototype.map,Array.prototype.reduce,Array.prototype.some,Array.prototype.sort,Array.prototype.values,ArrayBuffer,Blob,console,CustomEvent,DataView,Date.now,Date.prototype.toISOString,document,Element,Event,fetch,Function.prototype.bind,globalThis,JSON,localStorage,Map,modernizr:es5object,Number.isNaN,Object.assign,Object.entries,Object.freeze,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.setPrototypeOf,Promise,Promise.prototype.finally,Reflect,Reflect.construct,requestAnimationFrame,Set,String.prototype.endsWith,String.prototype.includes,String.prototype.startsWith,String.prototype.trim,String.raw,Symbol,Symbol.for,Symbol.iterator,Symbol.prototype.description,Symbol.toStringTag,Uint16Array,Uint8Array,URL,URLSearchParams,WeakMap,WeakSet,XMLHttpRequest';
    const polyfillIO = `https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=${polyfillIOFeatures}&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1`;

    /**
     * The highest priority scripts.
     * These scripts have a considerable impact on site performance.
     * Only scripts critical to application execution may go in here.
     * Please talk to the dotcom platform team before adding more.
     * Scripts will be executed in the order they appear in this array
     */
    const priorityScripts = [
        polyfillIO,
        CAPI.config && CAPI.config.commercialBundleUrl,
    ];
    const priorityLegacyScripts = [
        getDist({ path: 'sentry.js', legacy: true }),
        getDist({ path: 'dynamicImport.js', legacy: true }),
        getDist({ path: 'react.js', legacy: true }),
    ];
    const priorityNonLegacyScripts = [
        getDist({ path: 'sentry.js', legacy: false }),
        getDist({ path: 'dynamicImport.js', legacy: false }),
        getDist({ path: 'react.js', legacy: false }),
    ];

    /**
     * Low priority scripts. These scripts will be requested
     * asynchronously after the main HTML has been parsed. Execution
     * order is not guaranteed. It is even possible that these execute
     * *before* the high priority scripts, although this is very
     * unlikely.
     */
    const lowPriorityScripts = [
        'https://www.google-analytics.com/analytics.js',
    ];
    const lowPriorityLegacyScripts = [
        getDist({ path: 'ga.js', legacy: true }),
        getDist({ path: 'ophan.js', legacy: true }),
        getDist({ path: 'lotame.js', legacy: true }),
    ];
    const lowPriorityNonLegacyScripts = [
        getDist({ path: 'ga.js', legacy: false }),
        getDist({ path: 'ophan.js', legacy: false }),
        getDist({ path: 'lotame.js', legacy: false }),
    ];

    /**
     * We escape windowGuardian here to prevent errors when the data
     * is placed in a script tag on the page
     */
    const windowGuardian = escapeData(
        JSON.stringify(makeWindowGuardian(data, cssIDs)),
    );

    const ampLink = `https://amp.theguardian.com/${data.CAPI.pageId}`;

    const { openGraphData } = CAPI;
    const { twitterData } = CAPI;
    const keywords =
        typeof CAPI.config.keywords === 'undefined' ||
        CAPI.config.keywords === 'Network Front'
            ? ''
            : CAPI.config.keywords;

    return htmlTemplate({
        linkedData,

        priorityScripts,
        priorityLegacyScripts,
        priorityNonLegacyScripts,

        lowPriorityScripts,
        lowPriorityLegacyScripts,
        lowPriorityNonLegacyScripts,

        css,
        html,
        fontFiles,
        title,
        description: CAPI.trailText,
        windowGuardian,
        ampLink,
        openGraphData,
        twitterData,
        keywords,
    });
};
