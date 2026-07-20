import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware that reads the raw request body and stores it as a string
 * on req.body for the handler to JSON.parse itself.
 */
export function rawBodyReader(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	if (!req.headers['content-type']?.includes('application/json')) {
		next();
		return;
	}

	const chunks: Buffer[] = [];

	req.on('data', (chunk: Buffer) => {
		chunks.push(chunk);
	});

	req.on('end', () => {
		req.body = Buffer.concat(chunks).toString();
		next();
	});

	req.on('error', (err) => {
		next(err);
	});
}
