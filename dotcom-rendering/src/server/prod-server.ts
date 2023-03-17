import compression from 'compression';
import type { ErrorRequestHandler, Request, Response } from 'express';
import express from 'express';
import responseTime from 'response-time';
import {
	handleAMPArticle,
	handlePerfTest as handleAMPArticlePerfTest,
} from '../amp/server';
import { handleAppsArticle } from '../apps/server';
import type { FEArticleType } from '../types/frontend';
import {
	handleWebArticle,
	handleWebArticleJson,
	handleWebPerfTest as handleWebArticlePerfTest,
	handleWebBlocks,
	handleWebFront,
	handleWebFrontJson,
	handleWebInteractive,
	handleWebKeyEvents,
} from '../web/server';
import { recordBaselineCloudWatchMetrics } from './lib/aws/metrics-baseline';
import { getContentFromURLMiddleware } from './lib/get-content-from-url';
import { logger } from './lib/logging';

// Middleware to track route performance using 'response-time' lib
// Usage: app.post('/Article', logRenderTime, renderArticle);
const logRenderTime = responseTime(
	({ body, path }: Request, _: Response, renderTime: number) => {
		const { pageId = 'no-page-id-found' } = body as FEArticleType;
		logger.info('Page render time', {
			path,
			pageId,
			renderTime,
		});
	},
);

export const prodServer = (): void => {
	logger.info('dotcom-rendering is GO.');

	const app = express();

	app.use(express.json({ limit: '50mb' }));
	app.use(compression());

	app.get('/_healthcheck', (req: Request, res: Response) => {
		res.status(200).send('OKAY');
	});

	// if running prod server locally, serve local assets
	if (!process.env.GU_PUBLIC) {
		app.use('/static/frontend', express.static(__dirname));

		app.use('/assets', express.static(__dirname));
	}

	app.post('/Article/web', logRenderTime, handleWebArticle);
	app.post('/Article/apps', logRenderTime, handleAppsArticle);
	app.post('/Article/amp', logRenderTime, handleAMPArticle);
	app.post('/Interactive/web', logRenderTime, handleWebInteractive);
	app.post('/Interactive/amp', logRenderTime, handleAMPArticle);
	app.post('/Front/web', logRenderTime, handleWebFront);
	app.post('/FrontJSON/web', logRenderTime, handleWebFrontJson);
	app.post('/Blocks/web', logRenderTime, handleWebBlocks);
	app.post('/KeyEvents/web', logRenderTime, handleWebKeyEvents);

	/**
	 * @deprecated
	 * These POST endpoints are the old URL structure, and should not be used. Instead use
	 * the render target suffixed endpoints above.
	 *
	 * Remove these once Frontend has been updated to use the new structure.
	 */
	app.post('/Article', logRenderTime, handleWebArticle);
	app.post('/AMPArticle', logRenderTime, handleAMPArticle);
	app.post('/Interactive', logRenderTime, handleWebInteractive);
	app.post('/AMPInteractive', logRenderTime, handleAMPArticle);
	app.post('/Blocks', logRenderTime, handleWebBlocks);
	app.post('/KeyEvents', logRenderTime, handleWebKeyEvents);
	app.post('/Front', logRenderTime, handleWebFront);
	app.post('/FrontJSON', logRenderTime, handleWebFrontJson);
	app.post('/AppsArticle', logRenderTime, handleAppsArticle);

	// These GET's are for checking any given URL directly from PROD
	app.get(
		'/Article/web/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleWebArticle,
	);
	app.get(
		'/Article/apps/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleAppsArticle,
	);
	app.get(
		'/Article/amp/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleAMPArticle,
	);

	app.get(
		'/Interactive/web/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleWebInteractive,
	);
	app.get(
		'/Interactive/web/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleWebInteractive,
	);
	app.get(
		'/Interactive/amp/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleAMPArticle,
	);

	app.get(
		'/Front/web/*',
		logRenderTime,
		getContentFromURLMiddleware,
		handleWebFront,
	);

	app.use('/ArticleJson/web/*', handleWebArticleJson);
	app.use('/FrontJSON/web/*', handleWebFrontJson);

	app.use('/ArticlePerfTest/*', handleWebArticlePerfTest);
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
			res.status(500).send(`<pre>${message}</pre>`);
		}
	});

	// All params to error handlers must be declared for express to identify them as error middleware
	// https://expressjs.com/en/api.html#:~:text=Error%2Dhandling%20middleware%20always,see%3A%20Error%20handling
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- all params to error handlers must be declared
	const handleError: ErrorRequestHandler = (e, _req, res, _next) => {
		const message =
			e instanceof Error ? e.stack ?? 'Unknown stack' : 'Unknown error';
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
