import type { FECollection, FEFrontCard } from '../frontend/feFront';
import type { DCRCollectionType, PillarBucket } from '../types/front';
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
const MORE_PILLAR_CONTAINERS = [
	'More culture',
	'More sport',
	'More lifestyle',
	'More opinion',
];

const isPillarContainer = (collection: FECollection) =>
	PILLAR_CONTAINERS.includes(collection.displayName);

const isMorePillarContainer = (collection: FECollection) => {
	return MORE_PILLAR_CONTAINERS.includes(collection.displayName);
};
const normaliseMorePillarName = (displayName: string): string =>
	displayName.replace(/^More\s+/i, '').replace(/^./, (c) => c.toUpperCase());

type PillarCollection = {
	pillar: string;
	curated: FEFrontCard[];
};
const getPillarCards = (collections: FECollection[]) => {
	const pillarCards = collections
		.filter(isPillarContainer)
		.map((collection) => {
			return {
				pillar: collection.displayName,
				curated: [...collection.curated],
			};
		});

	for (const collection of collections.filter(isMorePillarContainer)) {
		const pillarName = normaliseMorePillarName(collection.displayName);

		const pillar = pillarCards.find((p) => p.pillar === pillarName);

		if (pillar) {
			pillar.curated.push(...collection.curated);
		}
	}

	return pillarCards;
};

const getCuratedList = (PillarCollections: PillarCollection[]) => {
	const curatedList: FEFrontCard[] = [];
	const bucketList: PillarBucket = {};

	for (const collection of PillarCollections) {
		const firstCard = collection.curated[0];
		if (firstCard) curatedList.push(firstCard);
		bucketList[collection.pillar] = enhanceCards(collection.curated, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		});
	}

	return { curatedList, bucketList };
};

export const createFakeCollection = (
	collections: FECollection[],
): DCRCollectionType => {
	const pillarCards = getPillarCards(collections);
	const { curatedList, bucketList } = getCuratedList(pillarCards);

	console.log(bucketList);

	return {
		...acrossTheGuardianCollection,
		curated: enhanceCards(curatedList, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
		bucket: bucketList,
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
