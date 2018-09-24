import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import htmlTemplate from './htmlTemplate';
import Article from './pages/Article';

interface Props {
    data: {
        page: string;
        site: string;
        CAPI: CAPIType;
        NAV: NavType;
        config: ConfigType;
    };
}

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

export default ({ data }: Props) => {
    const { page, site, CAPI, NAV, config } = data;
    const title = `${CAPI.headline} | ${CAPI.sectionName} | The Guardian`;
    const bundleJS = assets.dist(`${site}.${page.toLowerCase()}.js`);

    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(<Article data={{ CAPI, NAV, config }} />),
    );

    /**
     * Preload the following woff2 font files
     * TODO: Identify critical fonts to preload
     */
    const fontFiles = [
        'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
        'fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Regular.woff2',
        'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
        'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Medium.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-MediumItalic.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BoldItalic.woff2',
        'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Black.woff2',
        // 'fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-BlackItalic.woff2',
        'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Medium.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-MediumItalic.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-BoldItalic.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Black.woff2',
        // 'fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-BlackItalic.woff2',
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
