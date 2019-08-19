import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';

import { htmlTemplate } from './htmlTemplate';
import { Article } from '../pages/Article';
import { getDist } from '@frontend/lib/assets';

import { makeWindowGuardian } from '@frontend/model/window-guardian';

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

export const document = ({ data }: Props) => {
    const { page, site, CAPI, NAV, config, linkedData } = data;
    const title = `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;
    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(
            // TODO: CacheProvider can be removed when we've moved over to using @emotion/core
            <CacheProvider value={cache}>
                <Article data={{ CAPI, NAV, config }} />
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

    /**
     * The highest priority scripts.
     * These scripts have a considerable impact on site performance.
     * Only scripts critical to application execution may go in here.
     * Please talk to the dotcom platform team before adding more.
     * Scripts will be executed in the order they appear in this array
     */
    const bundleJS = getDist(`${site}.${page.toLowerCase()}.js`);
    const vendorJS = getDist('vendor.js');
    const polyfillIO =
        'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry&flags=gated&callback=guardianPolyfilled&unknown=polyfill';
    const commercialBundle = config.commercialBundleUrl;

    const priorityScripts = [polyfillIO, vendorJS, bundleJS, commercialBundle];

    /**
     * Low priority scripts.
     * These scripts will be requested asynchronously after the main
     * HTML has been parsed. Execution order is not guaranteed.
     */
    const lowPriorityScripts = [
        'https://www.google-analytics.com/analytics.js',
    ];

    const windowGuardian = makeWindowGuardian(data, cssIDs);

    const ampLink = `https://amp.theguardian.com/${data.CAPI.pageId}`;

    return htmlTemplate({
        linkedData,
        priorityScripts,
        lowPriorityScripts,
        css,
        html,
        fontFiles,
        title,
        windowGuardian,
        ampLink,
    });
};
