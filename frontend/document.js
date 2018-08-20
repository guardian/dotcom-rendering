// @flow

import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import htmlTemplate from './htmlTemplate';

import parseCAPI from './lib/parse-capi';
import App from './App';

type Props = {
    data: {
        page: string,
        site: string,
        body: { config?: {}, contentFields?: {} },
    },
    Page: React.ComponentType<{}>,
};

type renderToStringResult = {
    html: string,
    css: string,
    ids: Array<string>,
};

export default ({ Page, data: { body, ...data } }: Props) => {
    const cleanedData = { ...parseCAPI(body), ...data };

    const bundleJS = assets.dist(
        `${cleanedData.site}.${cleanedData.page.toLowerCase()}.js`,
    );

    const { html, css, ids: cssIDs }: renderToStringResult = extractCritical(
        renderToString(<App data={{ ...cleanedData }} Page={Page} />),
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
        data: cleanedData,
        cssIDs,
        fontFiles,
    });
};
