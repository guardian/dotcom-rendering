import type { FECollection } from '../frontend/feFront';
import { decideCollectionBranding } from '../lib/branding';
import type { EditionId } from '../lib/edition';
import type { Branding } from '../types/branding';
import type { DCRCollectionType } from '../types/front';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';

const FORBIDDEN_CONTAINERS = [
	'culture-treat',
	'newsletter treat',
	'qatar treat',
];

export const BETA_CONTAINERS = [
	'scrollable/highlights',
	'flexible/special',
	'flexible/general',
	'scrollable/small',
	'scrollable/medium',
	'scrollable/feature',
	'static/feature/2',
	'static/medium/4',
];

const PALETTE_STYLES_URI =
	'https://content.guardianapis.com/atom/interactive/interactives/2022/03/29/fronts-container-colours/default';

const isSupported = (collection: FECollection): boolean =>
	!(
		FORBIDDEN_CONTAINERS.includes(collection.displayName) ||
		collection.curated.some(
			(card) => card.properties.embedUri === PALETTE_STYLES_URI,
		)
	);

const findCollectionSuitableForFrontBranding = (
	collections: FECollection[],
) => {
	// Find the lowest indexed collection that COULD display branding
	const index = collections.findIndex(
		({ collectionType }) =>
			!['fixed/thrasher', 'scrollable/highlights'].includes(
				collectionType,
			),
	);
	// `findIndex` returns -1 when no element is found
	// Treat that instead as undefined
	if (index === -1) {
		return undefined;
	}
	return index;
};

export const enhanceCollections = ({
	collections,
	editionId,
	pageId,
	discussionApiUrl,
	frontBranding,
	onPageDescription,
	isOnPaidContentFront,
	isLoopingVideoTest = false,
}: {
	collections: FECollection[];
	editionId: EditionId;
	pageId: string;
	discussionApiUrl: string;
	frontBranding: Branding | undefined;
	onPageDescription?: string;
	isOnPaidContentFront?: boolean;
	isLoopingVideoTest?: boolean;
}): DCRCollectionType[] => {
	const indexToShowFrontBranding =
		findCollectionSuitableForFrontBranding(collections);

	return collections.filter(isSupported).map((collection, index) => {
		const { id, displayName, collectionType, hasMore, href, description } =
			collection;
		const allCards = [...collection.curated, ...collection.backfill];
		const collectionBranding = decideCollectionBranding({
			frontBranding,
			couldDisplayFrontBranding: index === indexToShowFrontBranding,
			cards: allCards,
			editionId,
			isContainerBranding:
				collection.config.metadata?.some(
					({ type }) => type === 'Branded',
				) ?? false,
		});

		const containerPalette = decideContainerPalette(
			collection.config.metadata?.map((meta) => meta.type),
			/**
			 * We do this because Frontend had logic to ignore the "Branded" palette tag in the Fronts tool
			 * when rendering a paid front or when non-paid content is curated inside a "Branded" container
			 */
			{
				canBeBranded:
					!isOnPaidContentFront &&
					collectionBranding?.kind === 'paid-content',
			},
		);

		const isNextCollectionPrimary =
			collections[index + 1]?.config.collectionLevel === 'Primary';
		const isBetaContainer = BETA_CONTAINERS.includes(
			collection.collectionType,
		);

		return {
			id,
			displayName,
			description:
				onPageDescription && index === 0
					? onPageDescription
					: description,
			collectionType,
			href,
			containerPalette,
			containerLevel: collection.config.collectionLevel,
			isNextCollectionPrimary,
			collectionBranding,
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				editionId,
				discussionApiUrl,
				isLoopingVideoTest,
			),
			curated: enhanceCards(collection.curated, {
				cardInTagPage: false,
				editionId,
				discussionApiUrl,
				isLoopingVideoTest,
			}),
			backfill: enhanceCards(collection.backfill, {
				cardInTagPage: false,
				editionId,
				discussionApiUrl,
				isLoopingVideoTest,
			}),
			treats: enhanceTreats(
				collection.treats,
				displayName,
				editionId,
				pageId,
			),
			config: {
				showDateHeader: collection.config.showDateHeader,
			},
			canShowMore:
				hasMore && !collection.config.hideShowMore && !isBetaContainer,
			targetedTerritory: collection.targetedTerritory,
			aspectRatio: collection.config.aspectRatio,
		};
	});
};
