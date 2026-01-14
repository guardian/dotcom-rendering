import type { FECollection, FEFrontCard } from '../frontend/feFront';
import type { DCRCollectionType, DCRFrontCard } from '../types/front';
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
	backfill: [],
	treats: [],
	config: {
		showDateHeader: false,
	},
	canShowMore: false,
	targetedTerritory: undefined,
	aspectRatio: '5:4',
};

export type Pillar = 'opinion' | 'sport' | 'culture' | 'lifestyle';

export const PILLARS = [
	'opinion',
	'sport',
	'culture',
	'lifestyle',
] as const satisfies readonly Pillar[];

type PillarContainer = {
	pillar: Pillar;
	containerName: string;
};
const pillarContainers: PillarContainer[] = [
	//culture
	{ containerName: 'Culture', pillar: 'culture' },
	{ containerName: 'What to watch', pillar: 'culture' },
	{ containerName: 'What to listen to', pillar: 'culture' },
	{ containerName: 'What to read', pillar: 'culture' },
	{ containerName: 'What to play', pillar: 'culture' },
	{ containerName: 'What to visit', pillar: 'culture' },
	{ containerName: 'More culture', pillar: 'culture' },
	//opinion
	{ containerName: 'Opinion', pillar: 'opinion' },
	{ containerName: 'More opinion', pillar: 'opinion' },
	{ containerName: 'Editorials', pillar: 'opinion' },
	//sport
	{ containerName: 'Sport', pillar: 'sport' },
	{ containerName: 'More sport', pillar: 'sport' },
	//lifestyle
	{ containerName: 'Lifestyle', pillar: 'lifestyle' },
	{ containerName: 'The Filter', pillar: 'lifestyle' },
	{ containerName: 'Food', pillar: 'lifestyle' },
	{ containerName: 'Relationships', pillar: 'lifestyle' },
	{ containerName: 'Money & consumer', pillar: 'lifestyle' },
	{ containerName: 'Health & fitness', pillar: 'lifestyle' },
	{ containerName: 'Fashion & beauty', pillar: 'lifestyle' },
	{ containerName: 'Travel', pillar: 'lifestyle' },
	{ containerName: 'More Lifestyle', pillar: 'lifestyle' },
];

export type DCRPillarCards = Record<Pillar, DCRFrontCard[]>;

const getPillarCards = (collections: FECollection[]): DCRPillarCards => {
	const HighlightUrls = collections
		.filter((collection) => 'Highlights' === collection.displayName)
		.flatMap((collection) => collection.curated)
		.map((card) => card.properties.webUrl);

	const pillarCards: Record<Pillar, FEFrontCard[]> = {
		lifestyle: [],
		opinion: [],
		sport: [],
		culture: [],
	};

	for (const collection of collections) {
		const pillarContainer = pillarContainers.find(
			(pillar) => pillar.containerName === collection.displayName,
		);

		if (!pillarContainer) continue;
		const curatedCards = [...collection.curated].filter(
			(card) => !HighlightUrls.includes(card.properties.webUrl),
		);

		pillarCards[pillarContainer.pillar].push(...curatedCards);
	}

	return {
		lifestyle: enhanceCards(pillarCards.lifestyle, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
		opinion: enhanceCards(pillarCards.opinion, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
		sport: enhanceCards(pillarCards.sport, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
		culture: enhanceCards(pillarCards.culture, {
			cardInTagPage: false,
			discussionApiUrl: 'string',
			editionId: 'UK',
		}),
	};
};

export const getCuratedList = (buckets: DCRPillarCards): DCRFrontCard[] => {
	return PILLARS.map((pillar) => buckets[pillar][0]).filter(
		(card): card is DCRFrontCard => card !== undefined,
	);
};

export const createFakeCollection = (
	collections: FECollection[],
): DCRCollectionType => {
	const pillarCards = getPillarCards(collections);
	const curatedList = getCuratedList(pillarCards);

	return {
		...acrossTheGuardianCollection,
		curated: curatedList,
		bucket: pillarCards,
	};
};
