import type { EditionId } from '../types/edition';
import type { DCRCollectionType, FECollectionType } from '../types/front';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';

const FORBIDDEN_CONTAINERS = [
	'Palette styles new do not delete',
	'culture-treat',
	'newsletter treat',
];
const isSupported = (collection: FECollectionType): boolean =>
	!FORBIDDEN_CONTAINERS.includes(collection.displayName);

export const enhanceCollections = (
	collections: FECollectionType[],
	editionId: EditionId,
	pageId: string,
): DCRCollectionType[] => {
	return collections.filter(isSupported).map((collection) => {
		const { id, displayName, collectionType, hasMore } = collection;
		const containerPalette = decideContainerPalette(
			collection.config.metadata?.map((meta) => meta.type),
		);
		return {
			id,
			displayName,
			collectionType,
			containerPalette,
			grouped: groupCards(
				collectionType,
				collection.curated,
				collection.backfill,
				containerPalette,
			),
			curated: enhanceCards(collection.curated, containerPalette),
			backfill: enhanceCards(collection.backfill, containerPalette),
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
