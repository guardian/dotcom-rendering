// @flow

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

const readFile = promisify(fs.readFile);

const renderPage = async function renderPage(page: string): string {
    const pageModule = await import(`./pages/${page}`);
    const Page = pageModule.default;
    const state = { page };
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page />),
    );

    return doc({ html, state, css, cssIDs });
};

const initCap = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export default async (req: {}): string => {
    if (req.url.includes('/healthcheck')) {
        return 'OK';
    }
    if (req.url.includes('/pages/')) {
        const page = req.url.split('/pages/')[1];

        return renderPage(initCap(page));
    }

    // TODO: retreive static assets from CDN
    if (req.url.includes('/assets/javascript/')) {
        return readFile(
            path.join('dist', req.url.split('/assets/javascript/')[1]),
            'utf8',
        );
    }
};
