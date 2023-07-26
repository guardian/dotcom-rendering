import type { EditionLinkType } from '../model/extract-nav';
import { guard } from './guard';

export type EditionId = (typeof editionList)[number]['editionId'];

/**
 * Warning: This list included the behind a 0% test edition
 * 'Europe', please use `getEditions` unless you're certain
 * you won't be accidentally displaying Europe edition to
 * users.
 */
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

/**
 * Gets all the editions, factoring in whether or not the user is in the europe test group or not.
 * Use over 'editionList' in any case where you're listing available editions to the user.
 *
 * @param isInEuropeTest Whether or not the user is in the europe edition test group
 * @returns All editions, optionally excluding Europe edition
 */
export const getEditions = (isInEuropeTest: boolean): EditionLinkType[] =>
	editionList.filter((e) => (e.editionId === 'EUR' ? isInEuropeTest : true));

export const getEditionFromId = (editionId: EditionId): EditionLinkType => {
	return (
		// We can use just 'editionList' here as we can safely assume if the user
		// is in the europe edition, they're also in the test group
		editionList.find((edition) => edition.editionId === editionId) ??
		editionList[0]
	);
};

export const getRemainingEditions = (
	editionId: EditionId,
	isInEuropeTest: boolean,
): EditionLinkType[] => {
	return getEditions(isInEuropeTest).filter(
		(edition) => edition.editionId !== editionId,
	);
};

/**
 * Determine if a string is one of the permitted edition strings
 *
 * @param s The string to test
 */
export const isEditionId = guard(editionList.map(({ editionId }) => editionId));
