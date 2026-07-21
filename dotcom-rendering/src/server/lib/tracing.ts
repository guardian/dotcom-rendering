import { context, type Span, SpanStatusCode, trace } from '@opentelemetry/api';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import type { RequestHandler } from 'express';

const OTEL_EXPORTER_ENDPOINT =
	process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318';

export const initTracing = (): void => {
	const exporter = new OTLPTraceExporter({
		url: `${OTEL_EXPORTER_ENDPOINT}/v1/traces`,
	});

	const provider = new BasicTracerProvider({
		resource: resourceFromAttributes({
			'service.name': 'tag-page-rendering',
			'service.version': '1.0.0',
		}),
		spanProcessors: [new BatchSpanProcessor(exporter)],
	});

	// Register the context manager so that nested startActiveSpan calls
	// produce proper parent-child relationships.
	const contextManager = new AsyncLocalStorageContextManager();
	context.setGlobalContextManager(contextManager);

	trace.setGlobalTracerProvider(provider);

	console.log('OpenTelemetry tracing initialised');

	process.on('SIGTERM', () => {
		void provider.shutdown().then(() => {
			console.log('OpenTelemetry tracing shut down');
		});
	});
};

const tracer = trace.getTracer('tag-page-rendering');

/**
 * Starts a span as a child of the current active context.
 * The caller is responsible for ending the span — use this for async operations
 * where the span must remain open across an async boundary.
 */
export const startSpan = (spanName: string): Span => {
	return tracer.startSpan(spanName, undefined, context.active());
};

/**
 * Starts an active span for async operations. The span becomes the active
 * context for any child spans created within the callback. The caller is
 * responsible for calling span.end() when the async work completes.
 */
export const traceAsync = (
	spanName: string,
	fn: (span: Span) => void,
): void => {
	tracer.startActiveSpan(spanName, (span) => {
		fn(span);
	});
};

/**
 * Wraps a synchronous function in an OpenTelemetry span, recording its duration
 * and any errors that occur.
 */
export const traceSync = <T>(spanName: string, fn: (span: Span) => T): T => {
	return tracer.startActiveSpan(spanName, (span) => {
		try {
			const result = fn(span);
			span.setStatus({ code: SpanStatusCode.OK });
			return result;
		} catch (error) {
			span.setStatus({
				code: SpanStatusCode.ERROR,
				message:
					error instanceof Error ? error.message : 'Unknown error',
			});
			span.recordException(
				error instanceof Error ? error : new Error(String(error)),
			);
			throw error;
		} finally {
			span.end();
		}
	});
};

/**
 * Express middleware that wraps the entire request lifecycle in a root span.
 * Placed before body parsing so it captures JSON deserialization time and any
 * event-loop queuing delays.
 */
export const tracingMiddleware: RequestHandler = (req, res, next) => {
	const spanName = `HTTP ${req.method} ${req.path}`;
	tracer.startActiveSpan(spanName, (span) => {
		span.setAttribute('http.method', req.method);
		span.setAttribute('http.path', req.path);

		const requestId = req.headers['x-request-id'];
		if (requestId) {
			span.setAttribute(
				'request.id',
				Array.isArray(requestId) ? (requestId[0] ?? '') : requestId,
			);
		}

		res.on('finish', () => {
			span.setAttribute('http.status_code', res.statusCode);
			span.setStatus({ code: SpanStatusCode.OK });
			span.end();
		});

		next();
	});
};
