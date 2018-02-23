// @flow

import fs from 'fs';
import path from 'path';
import pify from 'pify';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import requireDir from 'require-dir';

import doc from 'lib/__html';

const pages = requireDir('./pages');

const renderPage = async function renderPage(page: string): string => {
    const Page = pages[page].default;
    const state = { page };
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page />),
    );

    return doc({ html, state, css, cssIDs });
};

export default async (req: {}): string => {
    if (req.url.includes('/pages/')) {
        return renderPage(req.url.split('/pages/')[1]);
    }

    // TODO: retreive static assets from CDN
    if (req.url.includes('/assets/javascript/')) {
        return readFile(
            path.join('dist', req.url.split('/assets/javascript/')[1]),
            'utf8',
        );
    }
};
