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
import type {
	FEPuzzlesPageType,
	PuzzleContainer,
	PuzzleItem,
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
const identifier = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const colour = /^#[0-9a-f]{6}$/i;
const cardVariants = new Set(['large', 'primary', 'compact', 'archive']);
const containerVariants = new Set(['featured', 'standard', 'ad', 'supporting']);
const isPuzzleDestination = (url: string) =>
	url.startsWith('/puzzles') || /^https?:\/\//.test(url);

const isPuzzleItem = (data: unknown): data is PuzzleItem =>
	isObject(data) &&
	isString(data.id) &&
	identifier.test(data.id) &&
	isString(data.title) &&
	isString(data.type) &&
	isString(data.set) &&
	isString(data.cardVariant) &&
	cardVariants.has(data.cardVariant) &&
	(data.cardVariant === 'archive' ||
		(isString(data.cadence) && data.cadence.trim().length > 0)) &&
	(data.url === undefined || isString(data.url)) &&
	(data.image === undefined || isString(data.image)) &&
	(data.slug === undefined || isString(data.slug)) &&
	(data.index === undefined || Number.isInteger(data.index)) &&
	(data.variant === undefined || isString(data.variant)) &&
	(data.backgroundColour === undefined ||
		(isString(data.backgroundColour) &&
			colour.test(data.backgroundColour)));

const isSupportingContent = (data: unknown): boolean =>
	isObject(data) &&
	isString(data.usefulLinksTitle) &&
	data.usefulLinksTitle.trim().length > 0 &&
	Array.isArray(data.usefulLinks) &&
	data.usefulLinks.every(
		(link) =>
			isObject(link) &&
			isString(link.title) &&
			link.title.trim().length > 0 &&
			isString(link.url) &&
			isPuzzleDestination(link.url),
	) &&
	(data.newsletter === undefined ||
		(isObject(data.newsletter) &&
			isString(data.newsletter.identityName) &&
			data.newsletter.identityName.trim().length > 0 &&
			isString(data.newsletter.name) &&
			data.newsletter.name.trim().length > 0 &&
			isString(data.newsletter.frequency) &&
			data.newsletter.frequency.trim().length > 0 &&
			isString(data.newsletter.description) &&
			data.newsletter.description.trim().length > 0 &&
			(data.newsletter.illustrationSquare === undefined ||
				isString(data.newsletter.illustrationSquare)))) &&
	isString(data.popularTitle) &&
	data.popularTitle.trim().length > 0 &&
	Array.isArray(data.popularGroups) &&
	data.popularGroups.every(
		(group) =>
			isObject(group) &&
			isString(group.title) &&
			group.title.trim().length > 0 &&
			Array.isArray(group.itemIds) &&
			group.itemIds.length > 0 &&
			group.itemIds.every(isString),
	);

const isPuzzleContainer = (data: unknown): data is PuzzleContainer => {
	if (
		!isObject(data) ||
		!isString(data.id) ||
		!identifier.test(data.id) ||
		!isString(data.title) ||
		(data.variant !== undefined &&
			(!isString(data.variant) ||
				!containerVariants.has(data.variant))) ||
		(data.enabled !== undefined && typeof data.enabled !== 'boolean') ||
		(data.desktopSpan !== undefined &&
			(!Number.isInteger(data.desktopSpan) ||
				(data.desktopSpan as number) < 1 ||
				(data.desktopSpan as number) > 12)) ||
		(data.adSlot !== undefined &&
			(!isString(data.adSlot) ||
				(!/^inline[1-9][0-9]*$/.test(data.adSlot) &&
					data.adSlot !== 'mostpop'))) ||
		(data.supporting !== undefined &&
			!isSupportingContent(data.supporting)) ||
		!isObject(data.content)
	) {
		return false;
	}

	const { content } = data;
	const itemsValid =
		Array.isArray(content.items) &&
		content.items.every(
			(row) => Array.isArray(row) && row.every(isPuzzleItem),
		);
	const nestedValid =
		Array.isArray(content.nestedContainers) &&
		content.nestedContainers.every(isPuzzleContainer);
	const archiveValid =
		(content.archive === undefined || isPuzzleItem(content.archive)) &&
		(content.archiveChoices === undefined ||
			(Array.isArray(content.archiveChoices) &&
				content.archiveChoices.length >= 2 &&
				content.archiveChoices.every(isPuzzleItem))) &&
		!(
			content.archive !== undefined &&
			content.archiveChoices !== undefined
		);
	const isAd = data.variant === 'ad';
	const isSupporting = data.variant === 'supporting';
	const adValid = isAd
		? data.adSlot !== undefined &&
			/^inline[1-9][0-9]*$/.test(data.adSlot) &&
			data.title === '' &&
			Array.isArray(content.items) &&
			content.items.length === 0 &&
			Array.isArray(content.nestedContainers) &&
			content.nestedContainers.length === 0 &&
			content.archive === undefined &&
			content.archiveChoices === undefined &&
			data.supporting === undefined &&
			data.enabled === undefined
		: isSupporting
			? data.title === '' &&
				data.supporting !== undefined &&
				(data.adSlot === undefined || data.adSlot === 'mostpop') &&
				Array.isArray(content.items) &&
				content.items.length === 0 &&
				Array.isArray(content.nestedContainers) &&
				content.nestedContainers.length === 0 &&
				content.archive === undefined &&
				content.archiveChoices === undefined &&
				data.enabled === undefined
			: data.adSlot === undefined &&
				data.supporting === undefined &&
				(data.enabled === undefined || data.variant === 'featured') &&
				data.title.trim().length > 0;

	return itemsValid && nestedValid && archiveValid && adValid;
};

const flattenPuzzleContainers = (
	containers: PuzzleContainer[],
): PuzzleContainer[] => [
	...containers,
	...containers.flatMap((container) =>
		flattenPuzzleContainers(container.content.nestedContainers),
	),
];

export const validateAsPuzzlesPageType = (data: unknown): FEPuzzlesPageType => {
	if (
		!isObject(data) ||
		!isString(data.id) ||
		!isString(data.webTitle) ||
		!isString(data.editionId) ||
		!isObject(data.config) ||
		!isObject(data.nav) ||
		!isObject(data.pageFooter) ||
		!isString(data.canonicalUrl) ||
		typeof data.isAdFreeUser !== 'boolean' ||
		!isObject(data.layout) ||
		!Array.isArray(data.layout.containers) ||
		!data.layout.containers.every(isPuzzleContainer)
	) {
		throw new TypeError(
			'Unable to validate request body for puzzles page.',
		);
	}

	const page = data as unknown as FEPuzzlesPageType;
	const containers = flattenPuzzleContainers(page.layout.containers);
	const items = containers.flatMap((container) => [
		...container.content.items.flat(),
		...(container.content.archive ? [container.content.archive] : []),
		...(container.content.archiveChoices ?? []),
	]);
	const unique = (values: string[]) => new Set(values).size === values.length;
	const containerIds = containers.map(({ id }) => id);
	const itemIds = items.map(({ id }) => id);
	const popularReferencesValid = containers.every((container) =>
		(container.supporting?.popularGroups ?? []).every((group) =>
			group.itemIds.every((id) => itemIds.includes(id)),
		),
	);
	const topLevelOnlyContainersValid = containers
		.slice(page.layout.containers.length)
		.every(({ variant }) => variant !== 'ad' && variant !== 'supporting');

	if (
		!unique(containerIds) ||
		!unique(itemIds) ||
		!popularReferencesValid ||
		!topLevelOnlyContainersValid
	) {
		throw new TypeError(
			'Unable to validate request body for puzzles page.',
		);
	}

	return page;
};
