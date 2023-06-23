import { isNonNullable } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { Branding } from '../types/branding';
import type {
	DCRCollectionType,
	FECollectionType,
	FEFrontCard,
} from '../types/front';
import { decideBadge } from './decideBadge';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';

const FORBIDDEN_CONTAINERS = [
	'Palette styles new do not delete',
	'Palette styles',
	'culture-treat',
	'newsletter treat',
	'qatar treat',
];
const isSupported = (collection: FECollectionType): boolean =>
	!FORBIDDEN_CONTAINERS.includes(collection.displayName);

function getBrandingFromCards(
	allCards: FEFrontCard[],
	editionId: EditionId,
): Branding[] {
	return allCards
		.map(
			(card) =>
				card.properties.editionBrandings.find(
					(editionBranding) =>
						editionBranding.edition.id === editionId,
				)?.branding,
		)
		.filter(isNonNullable);
}

export const enhanceCollections = (
	collections: FECollectionType[],
	editionId: EditionId,
	pageId: string,
	onPageDescription?: string,
): DCRCollectionType[] => {
	return collections.filter(isSupported).map((collection, index) => {
		const { id, displayName, collectionType, hasMore, href, description } =
			collection;
		const allCards = [...collection.curated, ...collection.backfill];
		const allBranding = getBrandingFromCards(allCards, editionId);
		const allCardsHaveBranding = allCards.length === allBranding.length;
		const containerPalette = decideContainerPalette(
			collection.config.metadata?.map((meta) => meta.type),
			allCardsHaveBranding,
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
			badge: decideBadge(
				allCardsHaveBranding ? allBranding : [],
				collection.config.href,
			),
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				editionId,
				containerPalette,
			),
			curated: enhanceCards(collection.curated, {
				editionId,
				containerPalette,
			}),
			backfill: enhanceCards(collection.backfill, {
				editionId,
				containerPalette,
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
		};
	});
};
