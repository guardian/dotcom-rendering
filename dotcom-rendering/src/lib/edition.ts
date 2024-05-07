import { isOneOf } from '@guardian/libs';
import { isTuple, type Tuple } from './tuple';

type EditionId = 'UK' | 'US' | 'AU' | 'INT' | 'EUR';

type Edition = {
	url: string;
	editionId: EditionId;
	pageId: string;
	longTitle: string;
	title: string;
	dateLocale: string;
	timeZone: string;
	langLocale?: string;
};

const editionList: Tuple<Edition, 5> = [
	{
		url: '/preference/edition/uk',
		editionId: 'UK',
		pageId: 'uk',
		longTitle: 'UK edition',
		title: 'UK edition',
		dateLocale: 'en-gb',
		timeZone: 'Europe/London',
		langLocale: 'en-GB',
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
	},
	{
		url: '/preference/edition/eur',
		editionId: 'EUR',
		pageId: 'europe',
		longTitle: 'Europe edition',
		title: 'Europe edition',
		dateLocale: 'en-gb',
		timeZone: 'Europe/Paris',
	},
];

const ukEdition = editionList[0];

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

const isEditionalisedPage = (pageId: string): boolean => {
	const pageIdSplit = pageId.split('/');
	if (!isTuple(pageIdSplit, 2)) {
		return false;
	}
	const [networkId, pageIdSuffix] = pageIdSplit;
	if (!isNetworkFront(networkId)) {
		return false;
	}
	return editionalisedPages.some(
		(editionalisedPage) => editionalisedPage === pageIdSuffix,
	);
};

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
};
