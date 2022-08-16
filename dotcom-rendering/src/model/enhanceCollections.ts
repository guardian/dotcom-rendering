import type { DCRCollectionType, FECollectionType } from '../types/front';
import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { enhanceTreats } from './enhanceTreats';
import { groupCards } from './groupCards';

const supportedContainers = (collection: FECollectionType) => {
	switch (collection.displayName) {
		case 'Palette styles new do not delete':
		case 'culture-treat':
		case 'newsletter treat':
			return false;
		default:
			return true;
	}
};

export const enhanceCollections = (
	collections: FECollectionType[],
	editionId: EditionId,
): DCRCollectionType[] => {
	return collections.filter(supportedContainers).map((collection) => {
		const { id, displayName, collectionType } = collection;
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
			treats: enhanceTreats(collection.treats, editionId, displayName),
			config: {
				showDateHeader: collection.config.showDateHeader,
			},
		};
	});
};
