import * as path from 'path';
import express from 'express';
import React from 'react';

import recordBaselineCloudWatchMetrics from './aws/metrics-baseline';
import {
    getGuardianConfiguration,
    GuardianConfiguration,
} from './aws/aws-parameters';
import document from '@frontend/web/document';
import AMPDocument from '@frontend/amp/document';
import AMPArticle from '@frontend/amp/pages/Article';
import { dist, root, port } from '@root/scripts/frontend/config';
import { log, warn } from '@root/scripts/env/log';

import { extract as extractCAPI } from '@frontend/lib/model/extract-capi';
import { extract as extractNAV } from '@frontend/lib/model/extract-nav';
import { extract as extractGA } from '@frontend/lib/model/extract-ga';
import { extract as extractConfig } from '@frontend/lib/model/extract-config';

import { extractScripts } from '@frontend/amp/components/lib/AMPScripts';

const renderArticle = ({ body }: express.Request, res: express.Response) => {
    try {
        const resp = document({
            data: {
                site: 'frontend',
                page: 'Article',
                CAPI: extractCAPI(body),
                NAV: extractNAV(body),
                config: extractConfig(body),
                GA: extractGA(body),
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};

const renderAMPArticle = ({ body }: express.Request, res: express.Response) => {
    try {
        const CAPI = extractCAPI(body);
        const resp = AMPDocument({
            scripts: extractScripts(CAPI.elements),
            body: (
                <AMPArticle
                    articleData={CAPI}
                    nav={extractNAV(body)}
                    config={extractConfig(body)}
                />
            ),
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};

// this export is the function used by webpackHotServerMiddleware in /scripts/frontend-dev-server
export default (options: any) => {
    if ('amp' in options) return renderAMPArticle;
    return renderArticle;
};

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
    getGuardianConfiguration('prod')
        .then((config: GuardianConfiguration) => {
            log(`loaded ${config.size()} configuration parameters`);
        })
        .catch((err: any) => {
            warn('Failed to get configuration. Bad AWS credentials?');
            warn(err);
        });

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
                    path.resolve(root, 'packages', 'frontend', 'static'),
                ),
            ),
        );

        app.use('/assets', express.static(path.relative(__dirname, dist)));
    }

    app.use('/Article', renderArticle);
    app.use('/AMPArticle', renderAMPArticle);

    app.get('/', (req, res) => {
        try {
            res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                        <li><a href="/Article">Article</a></li>
                        <li><a href="/AMPArticle">⚡️Article</a></li>

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

    app.listen(port);
}
