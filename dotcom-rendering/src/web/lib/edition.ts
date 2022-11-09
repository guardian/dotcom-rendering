import type { EditionLinkType } from '../../model/extract-nav';
import type { EditionId } from '../../types/edition';

const editionList: EditionLinkType[] = [
	{
		url: '/preference/edition/au',
		editionId: 'UK',
		longTitle: 'UK edition',
		title: 'UK edition',
		locale: 'en-gb',
	},
	{
		url: '/preference/edition/us',
		editionId: 'US',
		longTitle: 'US edition',
		title: 'US edition',
		locale: 'en-us',
	},
	{
		url: '/preference/edition/au',
		editionId: 'AU',
		longTitle: 'Australia edition',
		title: 'AU edition',
		locale: 'en-au',
	},
	{
		url: '/preference/edition/int',
		editionId: 'INT',
		longTitle: 'International edition',
		title: 'International edition',
		locale: 'en-gb',
	},
	{
		url: '/preference/edition/eur',
		editionId: 'EUR',
		longTitle: 'Europe edition',
		title: 'Europe edition',
		locale: 'en-gb',
	},
];

export const getEditionFromId = (editionId: EditionId): EditionLinkType => {
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
