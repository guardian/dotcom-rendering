import compression from 'compression';
import type { ErrorRequestHandler, Request, Response } from 'express';
import express from 'express';
import responseTime from 'response-time';
import {
	handleAMPArticle,
	handlePerfTest as handleAMPArticlePerfTest,
} from '../amp/server';
import { handleAppsArticle } from '../apps/server';

import {
	handleArticle,
	handleArticleJson,
	handlePerfTest as handleArticlePerfTest,
	handleBlocks,
	handleFront,
	handleFrontJson,
	handleInteractive,
	handleKeyEvents,
} from '../web/server';
import { recordBaselineCloudWatchMetrics } from './lib/aws/metrics-baseline';
import { getContentFromURLMiddleware } from './lib/get-content-from-url';
import { logger } from './lib/logging';

import { recordTotalTime } from './lib/logging-store';
import { requestLoggerMiddleware } from './lib/logging-middleware';

// Middleware to track route performance using 'response-time' lib
// Usage: app.post('/Article', logRenderTime, renderArticle);
const logResponseTime = responseTime((_1, _2, time: number) =>
	recordTotalTime(time),
);

export const prodServer = (): void => {
	logger.info('dotcom-rendering is GO.');

	const app = express();

	app.use(logResponseTime);
	app.use(express.json({ limit: '50mb' }));

	app.use(requestLoggerMiddleware);

	app.use(compression());

	app.get('/_healthcheck', (req: Request, res: Response) => {
		res.status(200).send('OKAY');
	});

	// if running prod server locally, serve local assets
	if (!process.env.GU_PUBLIC) {
		app.use('/static/frontend', express.static(__dirname));

		app.use('/assets', express.static(__dirname));
	}

	app.post('/Article', handleArticle);
	app.post('/AMPArticle', handleAMPArticle);
	app.post('/AppsArticle', handleAppsArticle);
	app.post('/Interactive', handleInteractive);
	app.post('/AMPInteractive', handleAMPArticle);
	app.post('/Blocks', handleBlocks);
	app.post('/KeyEvents', handleKeyEvents);
	app.post('/Front', handleFront);
	app.post('/FrontJSON', handleFrontJson);

	// These GET's are for checking any given URL directly from PROD
	app.get('/Article/*', getContentFromURLMiddleware, handleArticle);
	app.use('/ArticleJson/*', handleArticleJson);

	app.get('/AMPArticle/*', getContentFromURLMiddleware, handleAMPArticle);

	app.get('/AppsArticle/*', getContentFromURLMiddleware, handleAppsArticle);

	app.get('/Front/*', getContentFromURLMiddleware, handleFront);

	app.get('/FrontJSON/*', getContentFromURLMiddleware, handleFrontJson);

	app.use('/ArticlePerfTest/*', handleArticlePerfTest);
	app.use('/AMPArticlePerfTest/*', handleAMPArticlePerfTest);

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
			const message =
				e instanceof Error
					? e.stack ?? 'Unknown stack'
					: 'Unknown error';
			logger.error(message);
			res.status(500).send(`<pre>${message}</pre>`);
		}
	});

	// All params to error handlers must be declared for express to identify them as error middleware
	// https://expressjs.com/en/api.html#:~:text=Error%2Dhandling%20middleware%20always,see%3A%20Error%20handling
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- all params to error handlers must be declared
	const handleError: ErrorRequestHandler = (e, _req, res, _next) => {
		const message =
			e instanceof Error ? e.stack ?? 'Unknown stack' : 'Unknown error';

		logger.error(message);
		res.status(500).send(`<pre>${message}</pre>`);
	};

	app.use(handleError);

	if (process.env.DISABLE_LOGGING_AND_METRICS !== 'true') {
		setInterval(() => {
			recordBaselineCloudWatchMetrics();
		}, 10 * 1000);
	}

	const port = process.env.PORT ?? 9000;
	app.listen(port);

	console.log(`Started production server on port ${port}\nready`);
};
