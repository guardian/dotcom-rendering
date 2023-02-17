import { RequestHandler } from 'express';
import { logger } from './logging';
import { loggingStore } from './logging-store';

const hasPageId = (body: any): body is { pageId: string } => {
	return body && 'pageId' in body && typeof body.pageId === 'string';
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
		const { timing, request } = loggingStore.getStore() ?? {};

		if (!request?.type) return;

		logger.info('Rendered page', {
			response: {
				status: res.statusCode,
			},
			timing,
		});
	});

	loggingStore.run(loggerState, () => {
		next();
	});
};
