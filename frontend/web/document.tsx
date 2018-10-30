import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import htmlTemplate from './htmlTemplate';
import Article from './pages/Article';
import assets from '../lib/assets';
import { GADataType } from '../lib/parse-capi';

interface Props {
    data: {
        page: string;
        site: string;
        CAPI: CAPIType;
        NAV: NavType;
        config: ConfigType;
        GA: GADataType;
    };
}

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

export default ({ data }: Props) => {
    const { page, site, CAPI, NAV, config } = data;
    const title = `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;
    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(<Article data={{ CAPI, NAV, config }} />),
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
     * Only scripts critical to application execution may go in here.
     * Scripts will be executed in the order they appear in this array
     */
    const bundleJS = assets.dist(`${site}.${page.toLowerCase()}.js`);
    const vendorJS = assets.dist('vendor.js');
    const polyfillIO =
        'https://assets.guim.co.uk/polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,es2017,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry&flags=gated&unknown=polyfill';
    const priorityScripts = [polyfillIO, vendorJS, bundleJS];

    return htmlTemplate({
        priorityScripts,
        css,
        html,
        cssIDs,
        fontFiles,
        data,
        title,
    });
};
