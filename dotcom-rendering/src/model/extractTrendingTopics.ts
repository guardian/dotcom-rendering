import type { FECollectionType } from '../types/front';
import type { TagType } from '../types/tag';

export const extractTrendingTopics = (
	collections: FECollectionType[],
): TagType[] => {
	const allTrails = collections.flatMap((collection) => [
		...collection.curated,
		...collection.backfill,
	]);
	const allTrailsDeduped = allTrails.filter((trailOne) =>
		allTrails.findIndex(
			(trailTwo) => trailOne.card.id === trailTwo.card.id,
		),
	);
	/**
	 * @todo:
	 * 	 - Extract all the keyword tags from the trails
	 *   - Filter out any 'section' tags
	 *   - Group tags by id and return the top 5 most common.
	 */
	return [];
};
