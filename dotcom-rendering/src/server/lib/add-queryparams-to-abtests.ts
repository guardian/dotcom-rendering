import type { Handler } from 'express';
import { validateAsFEArticle } from '../../../src/model/validate';

const SAFE_AB_VALUE = /^[a-zA-Z0-9_-]+$/;
const MAX_LENGTH = 100;

export const getABTestsFromQueryParams: Handler = async (req, res, next) => {
	try {
		const frontendData = validateAsFEArticle(req.body);
		const { config } = frontendData;
		const queryParamsAb = req.query;
		const filteredQuery: Record<string, string> = {};

		for (const [key, value] of Object.entries(queryParamsAb)) {
			// Only process AB test params
			if (!key.startsWith('ab-') || typeof value !== 'string') {
				continue;
			}

			const testId = key.replace(/^ab-/, '');

			// Validate both test ID and variant value
			// This prevents injection attacks and ensures safe values
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
				// Log suspicious input for monitoring
				console.warn(
					`Rejected invalid AB test parameter: ${key}=${value}`,
				);
			}
		}

		config.serverSideABTests = {
			...config.serverSideABTests,
			...filteredQuery,
		};
		req.body = frontendData;
	} catch (error) {
		return next();
	}
	next();
};
