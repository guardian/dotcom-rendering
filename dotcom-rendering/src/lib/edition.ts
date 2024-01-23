import type { EditionLinkType } from '../model/extract-nav';
import { guard } from './guard';

export type EditionId = (typeof editionList)[number]['editionId'];

export const editionList = [
	{
		url: '/preference/edition/uk',
		editionId: 'UK',
		longTitle: 'UK edition',
		title: 'UK edition',
		locale: 'en-gb',
		timeZone: 'Europe/London',
	},
	{
		url: '/preference/edition/us',
		editionId: 'US',
		longTitle: 'US edition',
		title: 'US edition',
		locale: 'en-us',
		timeZone: 'America/New_York',
	},
	{
		url: '/preference/edition/au',
		editionId: 'AU',
		longTitle: 'Australia edition',
		title: 'AU edition',
		locale: 'en-au',
		timeZone: 'Australia/Sydney',
	},
	{
		url: '/preference/edition/int',
		editionId: 'INT',
		longTitle: 'International edition',
		title: 'International edition',
		locale: 'en-gb',
		timeZone: 'Europe/London',
	},
	{
		url: '/preference/edition/eur',
		editionId: 'EUR',
		longTitle: 'Europe edition',
		title: 'Europe edition',
		locale: 'en-gb',
		timeZone: 'Europe/Paris',
	},
] as const;

export const getEditionFromId = (
	editionId: EditionId,
): (typeof editionList)[number] => {
	return (
		editionList.find((edition) => edition.editionId === editionId) ??
		editionList[0]
	);
};

export const getRemainingEditions = (
	editionId: EditionId,
): EditionLinkType[] => {
	return editionList.filter((edition) => edition.editionId !== editionId);
};

/**
 * Determine if a string is one of the permitted edition strings
 *
 * @param s The string to test
 */
export const isEditionId = guard(editionList.map(({ editionId }) => editionId));
