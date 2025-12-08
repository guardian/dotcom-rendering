import { isObject } from '@guardian/libs';
import type { Handler } from 'express';
import { logger } from './logging';

type AbServerSideTestType = {
	config: {
		serverSideABTests?: Record<string, string>;
	};
};

const SAFE_AB_VALUE = /^[a-zA-Z0-9_-]+$/;
const MAX_LENGTH = 100;

export const getABTestsFromQueryParams: Handler = (req, res, next) => {
	const body = req.body as AbServerSideTestType | undefined;
	try {
		if (body?.config && isObject(body.config)) {
			const { config } = req.body as AbServerSideTestType;
			const queryParamsAb = req.query;
			const filteredQuery: Record<string, string> = {};

			for (const [key, value] of Object.entries(queryParamsAb)) {
				if (!key.startsWith('ab-') || typeof value !== 'string') {
					continue;
				}

				const testId = key.replace(/^ab-/, '');

				if (
					testId.length > 0 &&
					testId.length <= MAX_LENGTH &&
					value.length > 0 &&
					value.length <= MAX_LENGTH &&
					SAFE_AB_VALUE.test(testId) &&
					SAFE_AB_VALUE.test(value)
				) {
					filteredQuery[testId] = value;
				} else {
					logger.warn(
						`Rejected invalid AB test parameter: ${key}=${value}`,
					);
				}
			}
			config.serverSideABTests = {
				...config.serverSideABTests,
				...filteredQuery,
			};
		}
	} catch (error) {
		logger.error('Error processing AB test query params', error);
		return next();
	}
	next();
};
