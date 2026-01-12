import type { FECollection, FEFrontCard } from '../frontend/feFront';
import type { DCRCollectionType } from '../types/front';
import { enhanceCards } from './enhanceCards';

const acrossTheGuardianCollection: DCRCollectionType = {
	id: 'hardcoded-collection',
	displayName: 'Across The Guardian',
	description: undefined,
	collectionType: 'static/medium/4',
	href: undefined,
	grouped: {
		splash: [],
		snap: [],
		huge: [],
		veryBig: [],
		big: [],
		standard: [],
	},
	curated: [],
	bucket: [],
	backfill: [],
	treats: [],
	config: {
		showDateHeader: false,
	},
	canShowMore: false,
	targetedTerritory: undefined,
	aspectRatio: '5:4',
};

const PILLAR_CONTAINERS = ['Culture', 'Opinion', 'Sport', 'Lifestyle'];
const isPillarContainer = (collection: FECollection) =>
	PILLAR_CONTAINERS.includes(collection.displayName);

type PillarCollection = {
	pillar: string;
	curated: FEFrontCard[];
};
const getPillarCards = (collections: FECollection[]) => {
	return collections.filter(isPillarContainer).map((collection) => {
		return { pillar: collection.displayName, curated: collection.curated };
	});
};

const getCuratedList = (PillarCollections: PillarCollection[]) => {
	const curatedList: FEFrontCard[] = [];
	const bucketList: FEFrontCard[] = [];

	for (const collection of PillarCollections) {
		const [firstCard, ...remaining] = collection.curated;
		if (firstCard) curatedList.push(firstCard);
		bucketList.push(...remaining);
	}

	return { curatedList, bucketList };
};

export const createFakeCollection = (
	collections: FECollection[],
): DCRCollectionType => {
	const pillarCards = getPillarCards(collections);
	const { curatedList, bucketList } = getCuratedList(pillarCards);

	return {
		...acrossTheGuardianCollection,
		curated: enhanceCards(curatedList, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
		bucket: enhanceCards(bucketList, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
	};
};

/*
 * History = {
 * cardId = "1234"
 * viewCount = 1
 * }
 * */

// curated = [
// 	{opinion 1},
// 	{sport 1},
// 	{culture 1 },
// 	{lifestyle 1 },
// ]

// bucket = [
//
// ]
// console.log(getPillarCards())
