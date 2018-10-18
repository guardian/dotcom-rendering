import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import htmlTemplate from './htmlTemplate';
import Article from './pages/Article';
import { GADataType } from './lib/parse-capi';

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
    const bundleJS = assets.dist(`${site}.${page.toLowerCase()}.js`);
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

    return htmlTemplate({
        bundleJS,
        css,
        html,
        cssIDs,
        fontFiles,
        data,
        title,
    });
};
