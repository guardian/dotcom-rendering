import { isNonNullable } from '@guardian/libs';
import type { FECollectionType, FEFrontCard } from '../types/front';
import type { FETagType } from '../types/tag';

/**
 * Gets all relevant tags filtered by properties
 * @param tags - The deduplicated trails
 * @returns An array of relevant tags
 */
const getTags = (trails: FEFrontCard[]): FETagType[] =>
	trails
		.flatMap((trail) => trail.properties.maybeContent?.tags.tags)
		.filter(isNonNullable)
		.filter((tag) => {
			return (
				tag.properties.paidContentType?.includes('Keyword') ??
				tag.properties.paidContentType?.includes('Topic') ??
				tag.properties.tagType === 'Keyword'
			);
		});

/**
 * Gets tags which have the 5 most used IDs from the provided tags
 * @param tags - Tags which you want to have filtered
 * @returns An array of tags which has been filtered to only include those with the most popular tag IDs
 */
const filterTopFive = (tag: FETagType[]): FETagType[] => {
	const idCounts: { [key: string]: number } = {};

	tag.forEach((x) => {
		const id = x.properties.id;
		if (idCounts[id] !== undefined) {
			idCounts[id]++;
		} else {
			idCounts[id] = 1;
		}
	});

	const topFiveIds = Object.entries(idCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map((entry) => entry[0]);

	return tag.filter((x) => topFiveIds.includes(x.properties.id));
};

const dedupeTags = (tag: FETagType[]): FETagType[] =>
	[...new Set(tag.map((item) => item.properties.id))]
		.map((id) => tag.find((item) => item.properties.id === id))
		.filter(isNonNullable);

export const extractTrendingTopicsFomFront = (
	collections: FECollectionType[],
): FETagType[] => {
	// Get a single array of all trails in the collections

	const allTrails = collections.flatMap((collection) => [
		...collection.curated,
		...collection.backfill,
	]);

	return extractTrendingTopics(allTrails);
};
export const extractTrendingTopics = (trails: FEFrontCard[]): FETagType[] => {
	// Remove any duplicated trails
	const dedupedTrails = trails.filter((trailOne) =>
		trails.findIndex((trailTwo) => trailOne.card.id === trailTwo.card.id),
	);

	const allTags = getTags(dedupedTrails);
	// We do not wish to include section tags that follow the pattern "UK/UK"
	const filteredTags = allTags.filter(
		(x) => new Set(x.properties.id.split('/')).size === 2,
	);

	// Get tags with the top 5 most used IDs
	const tags = filterTopFive(filteredTags);

	return dedupeTags(tags);
};
