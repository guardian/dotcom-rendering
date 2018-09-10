import * as path from 'path';
import express from 'express';

import recordBaselineCloudWatchMetrics from './lib/metrics-baseline';
import document from '../../frontend/document';
import Article from '../../frontend/pages/Article';
import { dist, getPagesForSite, root } from '../../config';

import {
    extractArticleMeta,
    extractNavMeta,
} from '../../frontend/lib/parse-capi';

const renderArticle = ({ body }: express.Request, res: express.Response) => {
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

    app.use('/:page', renderArticle);

    app.get('/', async (req, res) => {
        try {
            const pages = (await getPagesForSite()) as string[];
            res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                    ${pages
                        .map(page => `<li><a href="/${page}">${page}</a></li>`)
                        .join('')}
                    </ul>
                </body>
                </html>
            `);
        } catch (e) {
            res.status(500).send(`<pre>${e.stack}</pre>`);
        }
    });

    // express requires all 4 args here:
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).send(`<pre>${err.stack}</pre>`);
    });

    setInterval(() => {
        recordBaselineCloudWatchMetrics();
    }, 10 * 1000);

    app.listen(9000);
}
