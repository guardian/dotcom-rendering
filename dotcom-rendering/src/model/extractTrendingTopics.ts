import type { FECollectionType } from '../types/front';
import type { FETagType, TagType } from '../types/tag';

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

	const notUndefined = (value: FETagType | undefined): value is FETagType => value !== undefined;

	const allTags = allTrailsDeduped.flatMap((trail) => trail.properties.maybeContent?.tags.tags).filter(notUndefined);

	const isKeyword = (tag: FETagType) => {
		/**
		 * These are the checks from Frontend
		 */
		return tag.properties.paidContentType?.includes("Keyword")
		|| tag.properties.paidContentType?.includes("Topic")
		|| tag.properties.tagType === "Keyword"
	}



	/**
	 * @todo:
	 * 	 - Extract all the keyword tags from the trails
	 *   - Filter out any 'section' tags
	 *   - Group tags by id and return the top 5 most common.
	 */
	return [];
};
