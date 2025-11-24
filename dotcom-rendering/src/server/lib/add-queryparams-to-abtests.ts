import type { Handler } from 'express';
import { validateAsFEArticle } from '../../../src/model/validate';

export const getABTestsFromQueryParams: Handler = async (req, res, next) => {
	try {
		const frontendData = validateAsFEArticle(req.body);

		const { config } = frontendData;

		const queryParamsAb = req.query;

		const SAFE_KEY = /^[a-zA-Z0-9_-]{1,100}$/;
		const SAFE_VALUE = /^[a-zA-Z0-9_-]{1,40}$/;

		const filteredQuery: Record<string, string> = {};
		for (const [key, value] of Object.entries(queryParamsAb)) {
			if (typeof value == 'string' && key.startsWith('ab-')) {
				const testId = key.replace(/^ab-/, '');
				if (SAFE_VALUE.test(value) && SAFE_KEY.test(key)) {
					filteredQuery[testId] = value;
				}
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
