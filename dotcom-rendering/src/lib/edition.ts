import { isOneOf } from '@guardian/libs';
import { isTuple } from './tuple';

type EditionId = 'UK' | 'US' | 'AU' | 'INT' | 'EUR';

type Edition = (typeof editionList)[number];

const editionList = [
	{
		url: '/preference/edition/uk',
		editionId: 'UK',
		pageId: 'uk',
		longTitle: 'UK edition',
		title: 'UK edition',
		dateLocale: 'en-gb',
		timeZone: 'Europe/London',
		langLocale: 'en-GB',
		hasEditionalisedPages: true,
	},
	{
		url: '/preference/edition/us',
		editionId: 'US',
		pageId: 'us',
		longTitle: 'US edition',
		title: 'US edition',
		dateLocale: 'en-us',
		timeZone: 'America/New_York',
		langLocale: 'en-US',
		hasEditionalisedPages: true,
	},
	{
		url: '/preference/edition/au',
		editionId: 'AU',
		pageId: 'au',
		longTitle: 'Australia edition',
		title: 'AU edition',
		dateLocale: 'en-au',
		timeZone: 'Australia/Sydney',
		langLocale: 'en-AU',
		hasEditionalisedPages: true,
	},
	{
		url: '/preference/edition/eur',
		editionId: 'EUR',
		pageId: 'europe',
		longTitle: 'Europe edition',
		title: 'Europe edition',
		dateLocale: 'en-gb',
		timeZone: 'Europe/Paris',
		langLocale: 'en-EU',
		hasEditionalisedPages: false,
	},
	{
		url: '/preference/edition/int',
		editionId: 'INT',
		pageId: 'international',
		longTitle: 'International edition',
		title: 'International edition',
		dateLocale: 'en-gb',
		timeZone: 'Europe/London',
		langLocale: 'en',
		hasEditionalisedPages: false,
	},
] as const satisfies ReadonlyArray<{
	url: string;
	editionId: EditionId;
	pageId: string;
	longTitle: string;
	title: string;
	dateLocale: string;
	timeZone: string;
	langLocale?: string;
	hasEditionalisedPages: boolean;
}>;

const [ukEdition] = editionList;

/**
 * The list of editionalised pages was copied from Frontend:
 * https://github.com/guardian/frontend/blob/60c6b55944d52d87039a2a844665cf39dc7fe437/common/app/common/Edition.scala#L20-L35
 */
const editionalisedPages = [
	'business',
	'business-to-business',
	'commentisfree',
	'culture',
	'money',
	'sport',
	'technology',
	'media',
	'environment',
	'film',
	'lifeandstyle',
	'travel',
	'tv-and-radio',
] as const;

const getEditionFromId = (editionId: EditionId): Edition => {
	return (
		editionList.find((edition) => edition.editionId === editionId) ??
		ukEdition
	);
};

const getEditionFromPageId = (pageId: string): Edition | undefined =>
	editionList.find((edition) => edition.pageId === pageId);

const getRemainingEditions = (editionId: EditionId): Edition[] => {
	return editionList.filter((edition) => edition.editionId !== editionId);
};

/**
 * Determine if a string is one of the permitted edition strings
 *
 * @param s The string to test
 */
const isEditionId = isOneOf(editionList.map(({ editionId }) => editionId));

const isNetworkFront = (pageId: string): boolean =>
	editionList.some((edition) => edition.pageId === pageId);

/**
 * Given an editionalised pageId such as 'uk/travel' split into ['uk', 'travel']
 * Checks:
 * a) the first section is a network front
 * b) the second section is an editionalised page
 */
const splitEditionalisedPage = (
	pageId: string,
): undefined | [string, string] => {
	const pageIdSplit = pageId.split('/');
	if (!isTuple(pageIdSplit, 2)) {
		return undefined;
	}
	const [networkId, pageIdSuffix] = pageIdSplit;
	if (!isNetworkFront(networkId)) {
		return undefined;
	}
	const hasMatch = editionalisedPages.some(
		(editionalisedPage) => editionalisedPage === pageIdSuffix,
	);
	return hasMatch ? [networkId, pageIdSuffix] : undefined;
};

const isEditionalisedPage = (pageId: string): boolean =>
	!!splitEditionalisedPage(pageId);

export {
	EditionId,
	Edition,
	editionList,
	editionalisedPages,
	getEditionFromId,
	getEditionFromPageId,
	getRemainingEditions,
	isEditionId,
	isEditionalisedPage,
	isNetworkFront,
	splitEditionalisedPage,
};
