import type { FECollectionType } from '../types/front';
import type { FETagType } from '../types/tag';

export const extractTrendingTopics = (
	collections: FECollectionType[],
): (FETagType | undefined)[] => {
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

	const isKeyword = (tag: FETagType) =>
		tag.properties.paidContentType?.includes("Keyword")
		|| tag.properties.paidContentType?.includes("Topic")
		|| tag.properties.tagType === "Keyword";


	const desiredTags = allTags.filter(isKeyword)

	const removeSection = desiredTags.filter(x => new Set(x.properties.id.split("/")).size === 2)

	const filterTopFive = (tag: FETagType[]) => {
		const idCounts: { [key: string]: number } = {};

		tag.forEach(x => {
			const id = x.properties.id;
			if (idCounts[id]) {
				idCounts[id]++;
			} else {
				idCounts[id] = 1;
			}
		});

		const topFiveIds = Object.entries(idCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(entry => entry[0]);

		return tag.filter(x => topFiveIds.includes(x.properties.id));
	}

	const topFive = filterTopFive(removeSection)

	const topFiveUnique = [...new Set(topFive.map((item) => item.properties.id))].map((id) =>
		topFive.find((item) => item.properties.id === id),
	);

	return topFiveUnique;
};


