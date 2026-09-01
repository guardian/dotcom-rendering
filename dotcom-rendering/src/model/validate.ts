import { isObject, isString } from '@guardian/libs';
import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FEArticle } from '../frontend/feArticle';
import type { FEFootballMatchInfoPage } from '../frontend/feFootballMatchInfoPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { FEFootballTablesPage } from '../frontend/feFootballTablesPage';
import type { FEFront } from '../frontend/feFront';
import type { FETagPage } from '../frontend/feTagPage';
import articleSchema from '../frontend/schemas/feArticle.json';
import footballMatchInfoPageSchema from '../frontend/schemas/feFootballMatchInfoPage.json';
import footballMatchListPageSchema from '../frontend/schemas/feFootballMatchListPage.json';
import footballTablesPageSchema from '../frontend/schemas/feFootballTablesPage.json';
import frontSchema from '../frontend/schemas/feFront.json';
import tagPageSchema from '../frontend/schemas/feTagPage.json';
import type { Block } from '../types/blocks';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';
import type { FENewslettersPageType } from '../types/newslettersPage';
import {
	type FEPuzzlesPageType,
	puzzleCardVariants,
	puzzleContainerVariants,
	puzzlePageVariants,
} from '../types/puzzlesPage';
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
const validateEditionsCrossword = ajv.compile<FEEditionsCrosswords>(
	editionsCrosswordSchema,
);
const validateFootballMatchListPage = ajv.compile<FEFootballMatchListPage>(
	footballMatchListPageSchema,
);

const validateFootballTablesPage = ajv.compile<FEFootballTablesPage>(
	footballTablesPageSchema,
);

const validateFootballMatchInfoPage = ajv.compile<FEFootballMatchInfoPage>(
	footballMatchInfoPageSchema,
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
): FEEditionsCrosswords => {
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

export const validateAsFootballMatchPageType = (
	data: unknown,
): FEFootballMatchInfoPage => {
	if (validateFootballMatchInfoPage(data)) return data;

	const url =
		isObject(data) && isObject(data.config) && isString(data.config.pageId)
			? data.config.pageId
			: 'unknown url';

	throw new TypeError(
		`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFootballMatchInfoPage.errors, null, 2)}`,
	);
};
const stableIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const colourPattern = /^#[0-9a-f]{6}$/i;
const editions = new Set(['UK', 'US', 'AU', 'INT', 'EUR']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.trim().length > 0;

const isOptionalString = (value: unknown): boolean =>
	value === undefined || typeof value === 'string';

const isOptionalColour = (value: unknown): boolean =>
	value === undefined ||
	(typeof value === 'string' && colourPattern.test(value));

const isStringRecord = (value: unknown): boolean =>
	isRecord(value) && Object.values(value).every(isString);

const isPuzzlesConfig = (value: unknown): boolean =>
	isRecord(value) && isStringRecord(value.serverSideABTests);

const isPuzzleItem = (value: unknown, archiveSlot: boolean): boolean => {
	if (!isRecord(value)) return false;
	const cardVariant = value.cardVariant;
	const pageVariant = value.variant;

	return (
		isNonEmptyString(value.id) &&
		stableIdPattern.test(value.id) &&
		isNonEmptyString(value.title) &&
		isNonEmptyString(value.type) &&
		isNonEmptyString(value.set) &&
		isString(cardVariant) &&
		puzzleCardVariants.includes(
			cardVariant as (typeof puzzleCardVariants)[number],
		) &&
		(archiveSlot
			? cardVariant === 'archive'
			: cardVariant !== 'archive' && isNonEmptyString(value.cadence)) &&
		isOptionalString(value.cadence) &&
		isOptionalString(value.url) &&
		isOptionalString(value.image) &&
		isOptionalString(value.slug) &&
		(value.index === undefined || Number.isInteger(value.index)) &&
		(pageVariant === undefined ||
			(isString(pageVariant) &&
				puzzlePageVariants.includes(
					pageVariant as (typeof puzzlePageVariants)[number],
				))) &&
		isOptionalColour(value.backgroundColour) &&
		isOptionalString(value.filterId)
	);
};

type LayoutIds = {
	itemIds: string[];
	sectionIds: string[];
	referencedFilterIds: string[];
};

const validateContainer = (value: unknown, ids: LayoutIds): boolean => {
	if (!isRecord(value) || !isRecord(value.content)) return false;
	if (
		!isNonEmptyString(value.title) ||
		(value.variant !== undefined &&
			(!isString(value.variant) ||
				!puzzleContainerVariants.includes(
					value.variant as (typeof puzzleContainerVariants)[number],
				))) ||
		(value.desktopSpan !== undefined &&
			(!Number.isInteger(value.desktopSpan) ||
				Number(value.desktopSpan) < 1 ||
				Number(value.desktopSpan) > 12)) ||
		!isOptionalString(value.filterId)
	) {
		return false;
	}

	if (isString(value.filterId)) {
		ids.referencedFilterIds.push(value.filterId);
		ids.sectionIds.push(value.filterId);
	}

	const { items, nestedContainers, archive } = value.content;
	if (!Array.isArray(items) || !Array.isArray(nestedContainers)) return false;
	if (
		!items.every(
			(row) =>
				Array.isArray(row) &&
				row.length > 0 &&
				row.every((item) => {
					if (!isPuzzleItem(item, false) || !isRecord(item)) {
						return false;
					}
					ids.itemIds.push(item.id as string);
					if (isString(item.filterId)) {
						ids.referencedFilterIds.push(item.filterId);
					}
					return true;
				}),
		)
	) {
		return false;
	}

	if (
		!nestedContainers.every((container) =>
			validateContainer(container, ids),
		)
	) {
		return false;
	}

	if (archive !== undefined) {
		if (!isPuzzleItem(archive, true) || !isRecord(archive)) {
			return false;
		}
		ids.itemIds.push(archive.id as string);
		if (isString(archive.filterId)) {
			ids.referencedFilterIds.push(archive.filterId);
		}
	}

	return true;
};

const hasDuplicates = (values: string[]): boolean =>
	new Set(values).size !== values.length;

const isPuzzlesLayout = (value: unknown): boolean => {
	if (
		!isRecord(value) ||
		!Array.isArray(value.filters) ||
		!Array.isArray(value.containers)
	) {
		return false;
	}

	const filterIds: string[] = [];
	const anchorTargets: string[] = [];
	for (const filter of value.filters) {
		if (
			!isRecord(filter) ||
			!isNonEmptyString(filter.id) ||
			!stableIdPattern.test(filter.id) ||
			!isNonEmptyString(filter.title) ||
			!isNonEmptyString(filter.target) ||
			(!filter.target.startsWith('#') &&
				!filter.target.startsWith('/puzzles')) ||
			!isOptionalColour(filter.backgroundColour)
		) {
			return false;
		}
		filterIds.push(filter.id);
		if (filter.target.startsWith('#')) {
			anchorTargets.push(filter.target.slice(1));
		}
	}

	const ids: LayoutIds = {
		itemIds: [],
		sectionIds: [],
		referencedFilterIds: [],
	};
	if (
		!value.containers.every((container) =>
			validateContainer(container, ids),
		)
	) {
		return false;
	}

	return (
		!hasDuplicates(filterIds) &&
		!hasDuplicates(ids.itemIds) &&
		anchorTargets.every((target) => ids.sectionIds.includes(target)) &&
		ids.referencedFilterIds.every((id) => filterIds.includes(id))
	);
};

export const validateAsPuzzlesPageType = (data: unknown): FEPuzzlesPageType => {
	if (
		isRecord(data) &&
		isNonEmptyString(data.id) &&
		isString(data.editionId) &&
		editions.has(String(data.editionId)) &&
		isNonEmptyString(data.editionLongForm) &&
		isNonEmptyString(data.contributionsServiceUrl) &&
		isNonEmptyString(data.webTitle) &&
		isOptionalString(data.description) &&
		isPuzzlesConfig(data.config) &&
		isRecord(data.nav) &&
		isRecord(data.pageFooter) &&
		isRecord(data.commercialProperties) &&
		typeof data.isAdFreeUser === 'boolean' &&
		isNonEmptyString(data.canonicalUrl) &&
		isPuzzlesLayout(data.layout)
	) {
		return data as unknown as FEPuzzlesPageType;
	}

	throw new TypeError('Unable to validate request body for puzzles page.');
};
