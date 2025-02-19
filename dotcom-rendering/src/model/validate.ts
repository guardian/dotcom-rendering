import { isObject, isString } from '@guardian/libs';
import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FEFrontType } from '../../src/types/front';
import type { FEFootballDataPage } from '../feFootballDataPage';
import type { FETagPage } from '../frontend/feTagPage';
import tagPageSchema from '../frontend/schemas/feTagPage.json';
import type { Block } from '../types/blocks';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';
import type { FEArticleType } from '../types/frontend';
import type { FENewslettersPageType } from '../types/newslettersPage';
import articleSchema from './article-schema.json';
import blockSchema from './block-schema.json';
import editionsCrosswordSchema from './editions-crossword-schema.json';
import footballDataPageSchema from './fe-football-data-page-schema.json';
import frontSchema from './front-schema.json';
import newslettersPageSchema from './newsletter-page-schema.json';

const options: Options = {
	verbose: false,
	allErrors: false,
	logger: false,
	useDefaults: 'empty',
};

const ajv = new Ajv(options);
addFormats(ajv);

const validateArticle = ajv.compile<FEArticleType>(articleSchema);
const validateFront = ajv.compile<FEFrontType>(frontSchema);
const validateTagPage = ajv.compile<FETagPage>(tagPageSchema);
const validateAllEditorialNewslettersPage = ajv.compile<FENewslettersPageType>(
	newslettersPageSchema,
);
const validateBlock = ajv.compile<Block[]>(blockSchema);
const validateEditionsCrossword = ajv.compile<FEEditionsCrosswords>(
	editionsCrosswordSchema,
);
const validateFootballDataPage = ajv.compile<FEFootballDataPage>(
	footballDataPageSchema,
);

export const validateAsArticleType = (data: unknown): FEArticleType => {
	if (validateArticle(data)) return data;

	const url =
		isObject(data) && isString(data.webURL) ? data.webURL : 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateArticle.errors, null, 2)}`,
	);
};

export const validateAsEditionsCrosswordType = (
	data: unknown,
): FEEditionsCrosswords => {
	if (validateEditionsCrossword(data)) {
		return data;
	}
	throw new TypeError(
		`Unable to validate request body for editions crosswords.\n
		${JSON.stringify(validateEditionsCrossword.errors, null, 2)}`,
	);
};

export const validateAsFrontType = (data: unknown): FEFrontType => {
	if (validateFront(data)) return data;

	const url =
		isObject(data) && isString(data.webURL) ? data.webURL : 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFront.errors, null, 2)}`,
	);
};

export const validateAsFETagPage = (data: unknown): FETagPage => {
	if (validateTagPage(data)) return data;

	const url =
		isObject(data) && isString(data.webURL) ? data.webURL : 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateTagPage.errors, null, 2)}`,
	);
};

export const validateAsAllEditorialNewslettersPageType = (
	data: unknown,
): FENewslettersPageType => {
	if (validateAllEditorialNewslettersPage(data)) return data;
	throw new TypeError(
		`Unable to validate request body for newsletters page.\n
		${JSON.stringify(validateAllEditorialNewslettersPage.errors, null, 2)}`,
	);
};

export const validateAsBlock = (data: unknown): Block[] => {
	if (validateBlock(data)) return data;
	throw new TypeError(
		`Unable to validate request body for block.\n
            ${JSON.stringify(validateBlock.errors, null, 2)}`,
	);
};

export const validateAsFootballDataPageType = (
	data: unknown,
): FEFootballDataPage => {
	if (validateFootballDataPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFootballDataPage.errors, null, 2)}`,
	);
};
