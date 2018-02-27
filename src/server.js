// @flow

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

const readFile = promisify(fs.readFile);

const renderPage = async function renderPage({ page, isProd }): string {
    const pageModule = await import(`./pages/${page}`);
    const Page = pageModule.default;
    const state = { page };
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page />),
    );

    return doc({ html, state, css, cssIDs, isProd });
};

const initCap = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export default async ({ url, isProd = true }): string => {
    if (url.includes('/healthcheck')) {
        return 'OK';
    }
    if (url.includes('/pages/')) {
        const page = url.split('/pages/')[1];

        return renderPage({
            page: initCap(page),
            isProd,
        });
    }

    // TODO: retreive static assets from CDN
    if (url.includes('/assets/javascript/')) {
        return readFile(
            path.join('dist', url.split('/assets/javascript/')[1]),
            'utf8',
        );
    }
};
