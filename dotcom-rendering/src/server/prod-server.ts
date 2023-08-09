import compression from 'compression';
import type { ErrorRequestHandler, Request, Response } from 'express';
import express from 'express';
import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr';
import { handleAllEditorialNewslettersPage } from '../server/index.allEditorialNewslettersPage.web';
import {
	handleAMPArticle,
	handlePerfTest as handleAMPArticlePerfTest,
} from '../server/index.article.amp';
import { handleAppsArticle } from '../server/index.article.apps';
import {
	handleArticle,
	handleArticleJson,
	handleArticlePerfTest,
	handleBlocks,
	handleInteractive,
	handleKeyEvents,
} from '../server/index.article.web';
import {
	handleFront,
	handleFrontJson,
	handleTagFront,
	handleTagFrontJson,
} from '../server/index.front.web';
import { recordBaselineCloudWatchMetrics } from './lib/aws/metrics-baseline';
import { getContentFromURLMiddleware } from './lib/get-content-from-url';
import { logger } from './lib/logging';
import {
	loggingStoreMiddleware,
	requestLoggerMiddleware,
	timedExpressJsonMiddleware,
} from './lib/logging-middleware';
import { recordError } from './lib/logging-store';

export const prodServer = (): void => {
	logger.info('dotcom-rendering is GO.');

	const app = express();

	/**
	 * The order of these middleware is important for correctly collecting statistics
	 *
	 * - loggingStoreMiddleware needs to be the first middleware to run in order to
	 *   setup the logging store before timedExpressJsonMiddleware and to record when
	 *   the request has started.
	 *
	 * - requestLoggerMiddleware needs access to the parsed request body meaning it
	 *	 has to run after the timedExpressJsonMiddleware
	 */
	app.use(loggingStoreMiddleware);
	app.use(timedExpressJsonMiddleware);
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
	app.post('/Interactive', handleInteractive);
	app.post('/AMPInteractive', handleAMPArticle);
	app.post('/Blocks', handleBlocks);
	app.post('/KeyEvents', handleKeyEvents);
	app.post('/Front', handleFront);
	app.post('/FrontJSON', handleFrontJson);
	app.post('/TagFront', handleTagFront);
	app.post('/TagFrontJSON', handleTagFrontJson);
	app.post('/EmailNewsletters', handleAllEditorialNewslettersPage);
	app.post('/AppsArticle', handleAppsArticle);

	// These GET's are for checking any given URL directly from PROD
	app.get('/Article/*', getContentFromURLMiddleware, handleArticle);
	app.use('/ArticleJson/*', handleArticleJson);

	app.get(
		'/AMPArticle/*',

		getContentFromURLMiddleware,
		handleAMPArticle,
	);

	app.get('/Front/*', getContentFromURLMiddleware, handleFront);
	app.get(
		'/FrontJSON/*',

		getContentFromURLMiddleware,
		handleFrontJson,
	);

	app.get('/TagFront/*', getContentFromURLMiddleware, handleTagFront);
	app.get('/TagFrontJSON/*', getContentFromURLMiddleware, handleTagFrontJson);

	app.get(
		'/EmailNewsletters',
		getContentFromURLMiddleware,
		handleAllEditorialNewslettersPage,
	);

	app.get('/AppsArticle/*', getContentFromURLMiddleware, handleAppsArticle);

	app.use('/ArticlePerfTest/*', handleArticlePerfTest);
	app.use('/AMPArticlePerfTest/*', handleAMPArticlePerfTest);

	app.get('/', (req, res) => {
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
	});

	// All params to error handlers must be declared for express to identify them as error middleware
	// https://expressjs.com/en/api.html#:~:text=Error%2Dhandling%20middleware%20always,see%3A%20Error%20handling
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- all params to error handlers must be declared
	const handleError: ErrorRequestHandler = (e, _req, res, _next) => {
		const message =
			e instanceof Error ? e.stack ?? 'Unknown stack' : 'Unknown error';

		if (e instanceof TypeError) {
			res.status(400).send(`<pre>${message}</pre>`);
		} else if (e instanceof NotRenderableInDCR) {
			res.status(415).send(`<pre>${message}</pre>`);
		} else if (e instanceof Error) {
			res.status(500).send(`<pre>${message}</pre>`);
		} else {
			res.status(500).send(`<pre>${message}</pre>`);
		}

		recordError(e);
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
