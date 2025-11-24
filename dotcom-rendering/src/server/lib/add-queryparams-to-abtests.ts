import type { Handler } from 'express';
import { validateAsFEArticle } from '../../../src/model/validate';

export const addQueryParamsToABTests: Handler = async (req, res, next) => {
	try {
		const frontendData = validateAsFEArticle(req.body);

		const { config } = frontendData;

		const queryParamsAb = req.query;

		const filteredQuery: Record<string, string> = {};
		for (const [key, value] of Object.entries(queryParamsAb)) {
			if (typeof value == 'string' && key.startsWith('ab-')) {
				const testId = key.replace(/^ab-/, '');
				filteredQuery[testId] = value;
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
