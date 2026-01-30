import type { RequestHandler } from 'express';
import type { ConfigType } from '../../types/config';
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

const hasConfig = (body: unknown): body is { config: ConfigType } => {
	return (
		!!body &&
		typeof body === 'object' &&
		'config' in body &&
		typeof body.config === 'object'
	);
};

/**
 * An Express middleware which handles creating our logger store and logging requests after they've
 * completed.
 */
export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
	const start = process.hrtime.bigint();
	const headerValue = req.headers['x-request-id'];
	const requestId = Array.isArray(headerValue) ? headerValue[0] : headerValue;
	const loggerState = {
		request: {
			pageId: hasPageId(req.body) ? req.body.pageId : 'no-page-id-found',
			path: req.path,
			method: req.method,
		},
		requestId: requestId ?? 'request-id-not-provided',
		timing: {},
		abTests: hasConfig(req.body)
			? JSON.stringify(req.body.config.abTests)
			: '{no-ab-tests-found}',
	};

	res.on('finish', () => {
		const { error } = loggingStore.getStore() ?? {};

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

		if (error?.message ?? error?.stack) {
			logger.error('Error rendering page', logArgs);
		} else {
			logger.debug('Rendered page', logArgs);
		}
	});

	res.on('close', () => {
		loggingStore.run(loggerState, () => {
			if (!res.writableFinished) {
				const durationMs = Number(
					(process.hrtime.bigint() - start) / 1000000n,
				);
				logger.error(
					`Connection closed before the response was sent, approximate time spent so far: ${durationMs}ms`,
					{ durationMs },
				);
			}
		});
	});

	loggingStore.run(loggerState, () => {
		next();
	});
};
