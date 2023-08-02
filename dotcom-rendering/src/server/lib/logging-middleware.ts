import type { MiddlewareHandler } from 'hono';
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
export const requestLoggerMiddleware: MiddlewareHandler = async (c, next) => {
	const loggerState = {
		request: {
			pageId: hasPageId(c.req.body)
				? c.req.body.pageId
				: 'no-page-id-found',
			path: c.req.path,
			method: c.req.method,
		},
		timing: {},
	};

	await next();

	loggingStore.run(loggerState, () => {
		const { request, error } = loggingStore.getStore() ?? {};

		if (!request?.type) return;

		logger.info('Rendered page', {
			response: {
				status: c.res.status,
			},
			// Anything could extend the error type and have all sorts of fields.
			// We should be explicit in which fields we're looking for.
			error: {
				message: error?.message,
				stack: error?.stack,
			},
		});
	});
};
