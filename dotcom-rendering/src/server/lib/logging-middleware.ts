import type { RequestHandler } from 'express';
import { logger } from './logging';
import { loggingStore } from './logging-store';

const hasPageId = (body: unknown): body is { pageId: string } => {
	return (
		!!body &&
		typeof body === 'object' &&
		'pageId' in body &&
		typeof body.pageId === 'string'
	);
};

/**
 * An Express middleware which handles creating our logger store and logging requests after they've
 * completed.
 */
export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
	const loggerState = {
		request: {
			pageId: hasPageId(req.body) ? req.body.pageId : 'no-page-id-found',
			path: req.path,
			method: req.method,
		},
		timing: {},
	};

	res.on('finish', () => {
		const { request, error } = loggingStore.getStore() ?? {};

		if (!request?.type) return;

		const logArgs = {
			response: {
				status: res.statusCode,
			},
			// Anything could extend the error type and have all sorts of fields.
			// We should be explicit in which fields we're looking for.
			error: {
				message: error?.message,
				stack: error?.stack,
			},
		};

		if (error?.message || error?.stack) {
			logger.error('Error rendering page', logArgs);
		} else {
			logger.info('Rendered page', logArgs);
		}
	});

	loggingStore.run(loggerState, () => {
		next();
	});
};
