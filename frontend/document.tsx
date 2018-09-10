import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import htmlTemplate from './htmlTemplate';
import Article from './pages/Article';

// import App, { Data } from './App';

interface Props {
    data: {
        page: string;
        site: string;
        CAPI: CAPIType;
        NAV: NavType;
    };
}

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

export default ({ data }: Props) => {
    const { page, site, CAPI, NAV } = data;
    const bundleJS = assets.dist(`${site}.${page.toLowerCase()}.js`);

    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(<Article data={{ CAPI, NAV }} />),
    );

    /**
     * Preload the following woff2 font files
     * TODO: Identify critical fonts to preload
     */
    const fontFiles = [
        'GHGuardianHeadline/GHGuardianHeadline-Bold.woff2',
        'GHGuardianHeadline/GHGuardianHeadline-Regular.woff2',
        'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff2',
        // 'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff2',
        'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff2',
        // 'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff2',
        // 'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff2',
        // 'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff2',
        'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff2',
        // 'GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff2',
        'GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-Black.woff2',
        // 'GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff2',
        'GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff2',
        'GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2',
        // 'GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2',
    ];

    return htmlTemplate({
        bundleJS,
        css,
        html,
        cssIDs,
        fontFiles,
        data,
    });
};
