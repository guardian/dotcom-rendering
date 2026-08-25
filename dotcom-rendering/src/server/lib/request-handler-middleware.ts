import { trace } from '@opentelemetry/api';
import type { RequestHandler } from 'express';

// Spans are hand-made because @opentelemetry/instrumentation-express hooks
// `require`, and webpack has inlined express into the server bundle.
// There is a community plugin for webpack that enables this auto-instrumentation
// but we'd prefer to avoid using it.
// @see https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation/README.md#limitations
// @see https://opentelemetry.io/docs/languages/js/instrumentation/#acquiring-a-tracer
const tracer = trace.getTracer('dotcom-rendering');

export const createExpressJsonWrapper = (
	expressJson: RequestHandler,
): RequestHandler => {
	return (req, res, next) => {
		const span = tracer.startSpan('express.json');
		expressJson(req, res, (error) => {
			span.end();
			next(error);
		});
	};
};

export const createRequestTracingMiddleware = (): RequestHandler => {
	// Starts a span before the request handler and ends it once per request.
	// `finish` represents a fully written response; `close` catches early disconnects.
	return (req, res, next) => {
		const span = tracer.startSpan('request handler');
		let ended = false;

		const endSpan = (eventName: 'finish' | 'close') => {
			if (ended) return;
			ended = true;

			// Prefer the declared Express route template (e.g. /AppsComponent/thrasher/:name)
			// and fall back to only the first URL segment to keep cardinality bounded.
			const routeTemplate =
				typeof req.route?.path === 'string'
					? req.route.path
					: undefined;
			const firstPathSegment = req.path.split('/').filter(Boolean)[0];
			const routeTag =
				routeTemplate ??
				(firstPathSegment ? `/${firstPathSegment}` : '/');

			// Keep request metrics queryable by method/route/status while avoiding high-cardinality paths.
			span.setAttribute('http.request.method', req.method);
			span.setAttribute('http.route', routeTag);
			span.setAttribute('http.response.status_code', res.statusCode);
			// Distinguish normal response completion from connection close.
			span.setAttribute('http.lifecycle.event', eventName);
			// A `close` before writable end indicates an aborted/incomplete response.
			span.setAttribute(
				'http.aborted',
				eventName === 'close' && !res.writableEnded,
			);

			span.end();
		};

		res.on('finish', () => endSpan('finish'));
		res.on('close', () => endSpan('close'));
		next();
	};
};
