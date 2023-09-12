import { isNonNullable } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { Branding } from '../types/branding';
import type {
	DCRCollectionType,
	FECollectionType,
	FEFrontCard,
} from '../types/front';
import { decideBadge } from './decideBadge';
import { decideCollectionBranding } from './decideCollectionBranding';
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

export const enhanceCollections = ({
	collections,
	editionId,
	pageId,
	discussionApiUrl,
	onPageDescription,
	isPaidContent,
}: {
	collections: FECollectionType[];
	editionId: EditionId;
	pageId: string;
	discussionApiUrl: string;
	onPageDescription?: string;
	isPaidContent?: boolean;
}): DCRCollectionType[] => {
	return collections.filter(isSupported).map((collection, index) => {
		const { id, displayName, collectionType, hasMore, href, description } =
			collection;
		const allCards = [...collection.curated, ...collection.backfill];
		const allBranding = getBrandingFromCards(allCards, editionId);
		const allCardsHaveBranding = allCards.length === allBranding.length;
		const isCollectionPaidContent = allBranding.every(
			({ brandingType }) => brandingType?.name === 'paid-content',
		);

		const containerPalette = decideContainerPalette(
			collection.config.metadata?.map((meta) => meta.type),
			/**
			 * We do this because Frontend had logic to ignore the "Branded" palette tag in the Fronts tool
			 * when rendering a paid front or when non-paid content is curated inside a "Branded" container
			 */
			{
				canBeBranded:
					!isPaidContent &&
					allCardsHaveBranding &&
					isCollectionPaidContent,
			},
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
			editorialBadge: decideBadge(
				collection.config.href,
				// We only try to use a branded badge for paid content
				isCollectionPaidContent && allCardsHaveBranding
					? allBranding
					: undefined,
			),
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				editionId,
				discussionApiUrl,
				containerPalette,
			),
			curated: enhanceCards(collection.curated, {
				cardInTagFront: false,
				editionId,
				containerPalette,
				discussionApiUrl,
			}),
			backfill: enhanceCards(collection.backfill, {
				cardInTagFront: false,
				editionId,
				containerPalette,
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
			sponsoredContentBranding: decideCollectionBranding(
				allCards.length,
				allBranding,
			),
		};
	});
};
