import type { FECollectionType, FEFrontCard } from '../types/front';
import type { FETagType } from '../types/tag';
//returns all the trails from the collections
const allTrails = (collections: FECollectionType[]): FEFrontCard[] =>
	collections.flatMap((collection) => [
		...collection.curated,
		...collection.backfill,
	]);
//removes duplicates from the allTrails
const dedupeTrails = (trails: FEFrontCard[]): FEFrontCard[] =>
	trails.filter((trailOne) =>
		trails.findIndex((trailTwo) => trailOne.card.id === trailTwo.card.id),
	);
//type guard function that checks if a value is defined
const notUndefined = (value: FETagType | undefined): value is FETagType =>
	value !== undefined;
//returns desired tags
const getTags = (trails: FEFrontCard[]): FETagType[] =>
	trails
		.flatMap((trail) => trail.properties.maybeContent?.tags.tags)
		.filter(notUndefined)
		.filter((tag) => {
			return (
				tag.properties.paidContentType?.includes('Keyword') ??
				tag.properties.paidContentType?.includes('Topic') ??
				tag.properties.tagType === 'Keyword'
			);
		});
//We do not wish to include section tags that follow the pattern "UK/UK"
const removeSection = (tags: FETagType[]): FETagType[] =>
	tags.filter((x) => new Set(x.properties.id.split('/')).size === 2);
//We only want the top 5 tags
const filterTopFive = (tag: FETagType[]): FETagType[] => {
	const idCounts: { [key: string]: number } = {};

	tag.forEach((x) => {
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
		.map((entry) => entry[0]);

	return tag.filter((x) => topFiveIds.includes(x.properties.id));
};

const topFiveUnique = (tag: FETagType[]): FETagType[] =>
	[...new Set(tag.map((item) => item.properties.id))]
		.map((id) => tag.find((item) => item.properties.id === id))
		.filter(notUndefined);

export const extractTrendingTopics = (
	collections: FECollectionType[],
): FETagType[] => {
	const dedupedTrails = dedupeTrails(allTrails(collections));
	const filteredTags = topFiveUnique(
		filterTopFive(removeSection(getTags(dedupedTrails))),
	);
	return filteredTags;
};
