import { isObject, isString } from '@guardian/libs';
import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FEFrontType } from '../../src/types/front';
import type { FENewsletterDetailPageType } from '../../src/types/newsletterDetailPage';
import type { FEArticleType } from '../types/frontend';
import type { FENewslettersPageType } from '../types/newslettersPage';
import type { FETagFrontType } from '../types/tagFront';
import articleSchema from './article-schema.json';
import blockSchema from './block-schema.json';
import frontSchema from './front-schema.json';
import newslettersPageSchema from './newsletter-page-schema.json';
import tagFrontSchema from './tag-front-schema.json';

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
const validateTagFront = ajv.compile<FETagFrontType>(tagFrontSchema);
const validateAllEditorialNewslettersPage = ajv.compile<FENewslettersPageType>(
	newslettersPageSchema,
);
// TO DO - proper validation function with ajv
const validateNewsletterDetailPage = (
	data: unknown,
): data is FENewsletterDetailPageType => {
	try {
		const castData = data as Partial<FENewsletterDetailPageType>;
		return !!castData.newsletter && !!castData.config && !!castData.nav;
	} catch (_err) {
		return false;
	}
};
const validateBlock = ajv.compile<Block[]>(blockSchema);

export const validateAsArticleType = (data: unknown): FEArticleType => {
	if (validateArticle(data)) return data;

	const url =
		isObject(data) && isString(data.webURL) ? data.webURL : 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateArticle.errors, null, 2)}`,
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

export const validateAsTagFrontType = (data: unknown): FETagFrontType => {
	if (validateTagFront(data)) return data;

	const url =
		isObject(data) && isString(data.webURL) ? data.webURL : 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateTagFront.errors, null, 2)}`,
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

export const validateAsNewsletterDetailPageType = (
	data: unknown,
): FENewsletterDetailPageType => {
	if (validateNewsletterDetailPage(data)) return data;

	throw new TypeError(
		`Unable to validate request body for newsletter detail page.\n
		${JSON.stringify(
			{ placeholderError: 'ValidateFunction not implemented' },
			null,
			2,
		)}`,
	);
};

export const validateAsBlock = (data: unknown): Block[] => {
	if (validateBlock(data)) return data;
	throw new TypeError(
		`Unable to validate request body for block.\n
            ${JSON.stringify(validateBlock.errors, null, 2)}`,
	);
};
