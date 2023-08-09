import type { RequestHandler } from 'express';
import express from 'express';
import { logger } from './logging';
import {
	loggingStore,
	recordPageId,
	recordTimeStart,
	recordTimeStop,
} from './logging-store';

const hasPageId = (body: unknown): body is { pageId: string } => {
	return (
		!!body &&
		typeof body === 'object' &&
		'pageId' in body &&
		typeof body.pageId === 'string'
	);
};

/**
 * An Express middleware which wraps the inbuilt json() body-parser middleware to record execution time.
 */
const expressJsonMiddleware = express.json();
export const timedExpressJsonMiddleware: RequestHandler = (req, res, next) => {
	recordTimeStart('json');

	// Pass a wrapper around Express's next() callback which record when expressJsonMiddleware calls next()
	expressJsonMiddleware(req, res, () => {
		recordTimeStop('json');
		next();
	});
};

/**
 * An Express middleware which handles creating a logger store to save information to be logged in the request logger.
 */
export const loggingStoreMiddleware: RequestHandler = (req, res, next) => {
	const loggerState = {
		request: {
			pageId: 'before-request-logger-middleware',
			path: req.path,
			method: req.method,
		},
		timing: {
			total: performance.now(),
		},
	};

	loggingStore.run(loggerState, () => {
		next();
	});
};

/**
 * An Express middleware which handles logging requests and their associated details after they have been completed.
 */
export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
	// We don't have access to the page ID until after the express.json() middleware runs.
	recordPageId(hasPageId(req.body) ? req.body.pageId : 'no-page-id-found');

	res.on('finish', () => {
		recordTimeStop('total');

		logger.info('Rendered page', {
			response: {
				status: res.statusCode,
			},
			...loggingStore.getStore(),
		});
	});

	next();
};
