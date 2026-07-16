import type { NextFunction, Request, RequestHandler, Response } from 'express';

const getTargetGroupHeaderValue = () => {
	if (process.env.NODE_ENV === 'production') {
		// See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-environment-variables.html
		return process.env.AWS_EXECUTION_ENV?.startsWith('AWS_ECS_') === true
			? 'ecs'
			: 'ec2';
	}

	return 'dev';
};

const getHeaders: () => Record<string, string> = () => {
	const backendApp = process.env.GU_APP ?? 'rendering';
	const targetGroup = getTargetGroupHeaderValue();

	return {
		'X-Gu-Backend-App': backendApp,
		'X-Gu-Backend-App-Target-Group': targetGroup,
	};
};

/**
 * Middleware to add response headers useful for debugging.
 *
 * @see https://expressjs.com/en/guide/using-middleware
 */
export const responseHeaderMiddleware: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const headers = getHeaders();

	for (const [key, value] of Object.entries(headers)) {
		res.setHeader(key, value);
	}
	next();
};
