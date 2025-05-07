import { isObject, isString } from '@guardian/libs';
import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FEArticle } from '../frontend/feArticle';
import type { FECricketMatchPage } from '../frontend/feCricketMatchPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { FEFootballMatchPage } from '../frontend/feFootballMatchPage';
import type { FEFootballTablesPage } from '../frontend/feFootballTablesPage';
import type { FEFront } from '../frontend/feFront';
import type { FETagPage } from '../frontend/feTagPage';
import articleSchema from '../frontend/schemas/feArticle.json';
import cricketMatchPageSchema from '../frontend/schemas/feCricketMatchPage.json';
import footballMatchListPageSchema from '../frontend/schemas/feFootballMatchListPage.json';
import footballMatchPageSchema from '../frontend/schemas/feFootballMatchPage.json';
import footballTablesPageSchema from '../frontend/schemas/feFootballTablesPage.json';
import frontSchema from '../frontend/schemas/feFront.json';
import tagPageSchema from '../frontend/schemas/feTagPage.json';
import type { Block } from '../types/blocks';
import type { CAPICrosswords } from '../types/editionsCrossword';
import type { FENewslettersPageType } from '../types/newslettersPage';
import blockSchema from './block-schema.json';
import editionsCrosswordSchema from './editions-crossword-schema.json';
import newslettersPageSchema from './newsletter-page-schema.json';

const options: Options = {
	verbose: false,
	allErrors: false,
	logger: false,
	useDefaults: 'empty',
};

const ajv = new Ajv(options);
addFormats(ajv);

const validateArticle = ajv.compile<FEArticle>(articleSchema);
const validateFront = ajv.compile<FEFront>(frontSchema);
const validateTagPage = ajv.compile<FETagPage>(tagPageSchema);
const validateAllEditorialNewslettersPage = ajv.compile<FENewslettersPageType>(
	newslettersPageSchema,
);
const validateBlock = ajv.compile<Block[]>(blockSchema);
const validateEditionsCrossword = ajv.compile<CAPICrosswords>(
	editionsCrosswordSchema,
);
const validateFootballMatchListPage = ajv.compile<FEFootballMatchListPage>(
	footballMatchListPageSchema,
);

const validateFootballTablesPage = ajv.compile<FEFootballTablesPage>(
	footballTablesPageSchema,
);
const validateCricketMatchPage = ajv.compile<FECricketMatchPage>(
	cricketMatchPageSchema,
);
const validateFootballMatchPage = ajv.compile<FEFootballMatchPage>(
	footballMatchPageSchema,
);

export const validateAsFEArticle = (data: unknown): FEArticle => {
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
): CAPICrosswords => {
	if (validateEditionsCrossword(data)) {
		return data;
	}
	throw new TypeError(
		`Unable to validate request body for editions crosswords.\n
		${JSON.stringify(validateEditionsCrossword.errors, null, 2)}`,
	);
};

export const validateAsFEFront = (data: unknown): FEFront => {
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

export const validateAsFootballMatchListPage = (
	data: unknown,
): FEFootballMatchListPage => {
	if (validateFootballMatchListPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFootballMatchListPage.errors, null, 2)}`,
	);
};

export const validateAsFootballTablesPage = (
	data: unknown,
): FEFootballTablesPage => {
	if (validateFootballTablesPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFootballMatchListPage.errors, null, 2)}`,
	);
};

export const validateAsCricketMatchPageType = (
	data: unknown,
): FECricketMatchPage => {
	if (validateCricketMatchPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateCricketMatchPage.errors, null, 2)}`,
	);
};

export const validateAsFootballMatchPageType = (
	data: unknown,
): FEFootballMatchPage => {
	if (validateFootballMatchPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFootballMatchPage.errors, null, 2)}`,
	);
};
