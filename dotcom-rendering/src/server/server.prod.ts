import compression from 'compression';
import type { ErrorRequestHandler, Request, Response } from 'express';
import express from 'express';
import responseTime from 'response-time';
import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr';
import { handleAllEditorialNewslettersPage } from './handler.allEditorialNewslettersPage.web';
import { handleAMPArticle } from './handler.article.amp';
import {
	handleAppsArticle,
	handleAppsBlocks,
	handleAppsInteractive,
} from './handler.article.apps';
import {
	handleArticle,
	handleBlocks,
	handleInteractive,
} from './handler.article.web';
import { handleEditionsCrossword } from './handler.editionsCrossword';
import { handleFront, handleTagPage } from './handler.front.web';
import {
	handleCricketMatchPage,
	handleFootballMatchListPage,
	handleFootballMatchPage,
	handleFootballTablesPage,
} from './handler.sportDataPage.web';
import { recordBaselineCloudWatchMetrics } from './lib/aws/metrics-baseline';
import { logger } from './lib/logging';
import { requestLoggerMiddleware } from './lib/logging-middleware';
import { recordError } from './lib/logging-store';

// Middleware to track route performance using 'response-time' lib
// Usage: app.post('/Article', logRenderTime, renderArticle);
const logRenderTime = responseTime(
	(_1: Request, _2: Response, renderTime: number) => {
		logger.info('Page render time', {
			renderTime,
		});
	},
);

export const prodServer = (): void => {
	logger.info('dotcom-rendering is GO.');

	const app = express();

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

	app.post('/Article', logRenderTime, handleArticle);
	app.post('/AMPArticle', logRenderTime, handleAMPArticle);
	app.post('/Interactive', logRenderTime, handleInteractive);
	app.post('/AMPInteractive', logRenderTime, handleAMPArticle);
	app.post('/Blocks', logRenderTime, handleBlocks);
	app.post('/Front', logRenderTime, handleFront);
	app.post('/TagPage', logRenderTime, handleTagPage);
	app.post(
		'/FootballMatchListPage',
		logRenderTime,
		handleFootballMatchListPage,
	);
	app.post('/CricketMatchPage', logRenderTime, handleCricketMatchPage);
	app.post('/FootballTablesPage', logRenderTime, handleFootballTablesPage);
	app.post(
		'/FootballMatchSummaryPage',
		logRenderTime,
		handleFootballMatchPage,
	);

	app.post(
		'/EmailNewsletters',
		logRenderTime,
		handleAllEditorialNewslettersPage,
	);
	app.post('/AppsArticle', logRenderTime, handleAppsArticle);
	app.post('/AppsInteractive', logRenderTime, handleAppsInteractive);
	app.post('/AppsBlocks', logRenderTime, handleAppsBlocks);
	app.post('/EditionsCrossword', logRenderTime, handleEditionsCrossword);

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
