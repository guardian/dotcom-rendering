import type {
	DCRCollectionType,
	FECollectionType,
	FEFrontCard,
} from '../types/front';
import type { EditionId } from '../web/lib/edition';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';
import { decideBadge } from './decideBadge';
import { Branding } from '../types/branding';

const FORBIDDEN_CONTAINERS = [
	'Palette styles new do not delete',
	'culture-treat',
	'newsletter treat',
	'Palette styles',
];
const isSupported = (collection: FECollectionType): boolean =>
	!FORBIDDEN_CONTAINERS.includes(collection.displayName);

function getBrandingFromCards(
	allCards: FEFrontCard[],
	editionId: 'UK' | 'US' | 'AU' | 'INT' | 'EUR',
): (Branding | undefined)[] {
	return allCards.map(
		(card) =>
			card.properties.editionBrandings.find(
				(editionBranding) => editionBranding.edition.id === editionId,
			)?.branding,
	);
}

function allCardsHaveSponsors(allBranding: (Branding | undefined)[]): boolean {
	return allBranding.every((brand) => brand !== undefined);
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
		const containerPalette = decideContainerPalette(
			collection.config.metadata?.map((meta) => meta.type),
		);
		const allBranding = getBrandingFromCards(
			[...collection.curated, ...collection.curated],
			editionId,
		);
		const allCardsHaveBranding = allCardsHaveSponsors(allBranding);
		const isLabs = containerPalette === 'Branded' && allCardsHaveBranding;
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
			isLabs,
			badge: decideBadge(
				displayName,
				// allCardsHaveBranding is ensuring the correct type here
				// @ts-ignore
				allCardsHaveBranding ? allBranding : [],
			),
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				editionId,
				containerPalette,
			),
			curated: enhanceCards(
				collection.curated,
				editionId,
				containerPalette,
			),
			backfill: enhanceCards(
				collection.backfill,
				editionId,
				containerPalette,
			),
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
		};
	});
};
