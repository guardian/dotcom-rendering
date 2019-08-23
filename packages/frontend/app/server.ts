import * as path from 'path';
import express from 'express';
import compression from 'compression';

import { recordBaselineCloudWatchMetrics } from './aws/metrics-baseline';
import {
    getGuardianConfiguration,
    GuardianConfiguration,
} from './aws/aws-parameters';
import { dist, root, port } from '@root/scripts/frontend/config';
import { log, warn } from '@root/scripts/env/log';
import {
    render as renderAMPArticle,
    renderPerfTest as renderAMPArticlePerfTest,
} from '@frontend/amp/server/render';
import {
    render as renderArticle,
    renderPerfTest as renderArticlePerfTest,
} from '@frontend/web/server/render';
import { logger } from './logging';

// this export is the function used by webpackHotServerMiddleware in /scripts/frontend-dev-server
// tslint:disable-next-line:no-default-export
export default (options: any) => {
    if ('amp' in options) {
        return renderAMPArticle;
    }

    return renderArticle;
};

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
    logger.info('dotcom-rendering is GO.');
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
    app.use(compression());

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

    app.use('/ArticlePerfTest', renderArticlePerfTest);
    app.use('/AMPArticlePerfTest', renderAMPArticlePerfTest);

    app.get('/', (req, res) => {
        try {
            res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                        <li><a href="/Article">Article</a></li>
                        <li><a href="/AMPArticle">⚡️Article</a></li>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
                    </ul>
                    <ul>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
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
