import { decideCollectionBranding } from '../lib/branding';
import type { EditionId } from '../lib/edition';
import type { Branding } from '../types/branding';
import type { DCRCollectionType, FECollectionType } from '../types/front';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';

const FORBIDDEN_CONTAINERS = [
	'culture-treat',
	'newsletter treat',
	'qatar treat',
];

const PALETTE_STYLES_URI =
	'https://content.guardianapis.com/atom/interactive/interactives/2022/03/29/fronts-container-colours/default';

const isSupported = (collection: FECollectionType): boolean =>
	!(
		FORBIDDEN_CONTAINERS.includes(collection.displayName) ||
		collection.curated.some(
			(card) => card.properties.embedUri === PALETTE_STYLES_URI,
		)
	);

const findCollectionSuitableForFrontBranding = (
	collections: FECollectionType[],
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

/** Depending on the next sibling of the container, we assign either large or small spacing rules during render */
const getContainerSpacing = (nextSiblingCollection?: FECollectionType) => {
	const nextCollectionIsPrimary =
		nextSiblingCollection?.config.collectionLevel === 'Primary';
	return nextCollectionIsPrimary ? 'large' : 'small';
};

export const enhanceCollections = ({
	collections,
	editionId,
	pageId,
	discussionApiUrl,
	frontBranding,
	onPageDescription,
	isOnPaidContentFront,
}: {
	collections: FECollectionType[];
	editionId: EditionId;
	pageId: string;
	discussionApiUrl: string;
	frontBranding: Branding | undefined;
	onPageDescription?: string;
	isOnPaidContentFront?: boolean;
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

		const containerSpacing = getContainerSpacing(collections[index + 1]);

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
			containerSpacing,
			collectionBranding,
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				editionId,
				discussionApiUrl,
			),
			curated: enhanceCards(collection.curated, {
				cardInTagPage: false,
				editionId,
				discussionApiUrl,
			}),
			backfill: enhanceCards(collection.backfill, {
				cardInTagPage: false,
				editionId,
				discussionApiUrl,
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
			canShowMore: hasMore && !collection.config.hideShowMore,
			targetedTerritory: collection.targetedTerritory,
			aspectRatio: collection.config.aspectRatio,
		};
	});
};
