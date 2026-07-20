import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware that parses the raw string body (set by rawBodyReader) as JSON.
 * Exists as a separate named middleware so it appears as its own span
 * in OpenTelemetry auto-instrumentation traces.
 */
export function jsonBodyParser(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	if (typeof req.body === 'string' && req.body.length > 0) {
		try {
			req.body = JSON.parse(req.body) as unknown;
		} catch (e) {
			next(e);
			return;
		}
	}
	next();
}
