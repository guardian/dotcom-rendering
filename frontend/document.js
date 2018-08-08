// @flow

import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from '@guardian/guui/lib/assets';
import htmlTemplate from '@guardian/guui/htmlTemplate';

import parseCAPI from './lib/parse-capi';
import App from './App';
import { keyRegister } from './components/CapiComponent';

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

    const bundle = assets.dist(
        `${cleanedData.site}.${cleanedData.page.toLowerCase()}.js`,
    );

    const { html, css, ids: cssIDs }: renderToStringResult = extractCritical(
        renderToString(<App data={{ ...cleanedData }} Page={Page} />),
    );

    /**
     * To save sending CAPI data twice (in the HEAD and BODY)
     * we replace any keys present in the CapiComponent keyRegister
     * with document.querySelectors, therefore sending the data in the BODY only
     * */
    const CAPI = Object.keys(cleanedData.CAPI).reduce((acc, key) => {
        if (keyRegister.has(key)) {
            acc[
                key
            ] = `document.querySelector('[data-capi-key=${key}]').innerHTML`;
        } else {
            acc[key] = cleanedData.CAPI[key];
        }
        return acc;
    }, {});

    return htmlTemplate({
        bundle,
        css,
        html,
        data: {
            ...cleanedData,
            CAPI,
        },
        cssIDs,
    });
};
