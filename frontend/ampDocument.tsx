import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import { GADataType } from './lib/parse-capi';
import ampTemplate from './ampTemplate';
import { Amp } from './pages/AMP';

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
        renderToString(<Amp data={{ CAPI, NAV, config }} />),
    );
    return ampTemplate({
        bundleJS,
        css,
        html,
        cssIDs,
        data,
        title,
    });
};
