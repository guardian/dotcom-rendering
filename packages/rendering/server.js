// @flow
/* eslint-disable global-require */

import path from 'path';
import express from 'express';
import type { $Request, $Response } from 'express';

import {
    extractArticleMeta,
    extractNavMeta,
} from '../../frontend/lib/parse-capi';
import document from '../../frontend/document';
import { dist, root } from '../../config';

const renderArticle = async ({ body }: $Request, res: $Response) => {
    try {
        const resp = document({
            data: {
                site: 'frontend',
                page: 'Article',
                CAPI: extractArticleMeta(body),
                NAV: extractNavMeta(body),
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};

// this export is the function used by webpackHotServerMiddleware in /dev-server.js
export default () => renderArticle;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
    const app = express();

    app.use(express.json({ limit: '50mb' }));

    app.get('/_healthcheck', (req, res) => {
        res.status(200).send('OKAY');
    });

    // if running prod server locally, serve local assets
    if (!process.env.GU_PUBLIC) {
        app.use(
            '/static/:site',
            express.static(
                path.relative(
                    __dirname,
                    path.resolve(root, 'frontend', 'static'),
                ),
            ),
        );

        app.use('/assets', express.static(path.relative(__dirname, dist)));
    }

    app.use('/Article', renderArticle);

    app.get('/', (req, res) => {
        try {
            res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                        <li><a href="/Article">Article</a></li>
                    </ul>
                </body>
                </html>
            `);
        } catch (e) {
            res.status(500).send(`<pre>${e.stack}</pre>`);
        }
    });

    // express requires all 4 args here:
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send(`<pre>${err.stack}</pre>`);
    });
    app.listen(9000);
}
