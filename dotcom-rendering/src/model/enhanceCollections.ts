import { decideContainerPalette } from './decideContainerPalette';
import { enhanceCards } from './enhanceCards';
import { groupCards } from './groupCards';

export const enhanceCollections = (
	collections: FECollectionType[],
): DCRCollectionType[] => {
	return collections.map((collection) => {
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
				collection.curated,
				collection.backfill,
				containerPalette,
			),
			curated: enhanceCards(collection.curated, containerPalette),
			backfill: enhanceCards(collection.backfill, containerPalette),
			treats: enhanceCards(collection.treats, containerPalette),
			config: {
				showDateHeader: collection.config.showDateHeader,
			},
		};
	});
};
