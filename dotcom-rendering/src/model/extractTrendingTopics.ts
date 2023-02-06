import type { FECollectionType, FEFrontCard } from '../types/front';
import type { FETagType } from '../types/tag';

const allTrails = (collections: FECollectionType[]): FEFrontCard[] =>
	collections.flatMap((collection) => [
		...collection.curated,
		...collection.backfill,
	]);

const allTrailsDeduped = (allTrailsInput: FEFrontCard[]): FEFrontCard[] =>
	allTrailsInput.filter((trailOne) =>
		allTrailsInput.findIndex(
			(trailTwo) => trailOne.card.id === trailTwo.card.id,
		),
	);

const notUndefined = (value: FETagType | undefined): value is FETagType =>
	value !== undefined;

const allTags = (allTrailsDedupedInput: FEFrontCard[]): FETagType[] =>
	allTrailsDedupedInput
		.flatMap((trail) => trail.properties.maybeContent?.tags.tags)
		.filter(notUndefined);
//keywords not to include
const isKeyword = (tag: FETagType) =>
	tag.properties.paidContentType?.includes('Keyword') ??
	tag.properties.paidContentType?.includes('Topic') ??
	tag.properties.tagType === 'Keyword';

const desiredTags = (allTagsInput: FETagType[]): FETagType[] =>
	allTagsInput.filter(isKeyword);
//We do not wish to include section tags that follow the pattern "UK/UK"
const removeSection = (desiredTagsInput: FETagType[]): FETagType[] =>
	desiredTagsInput.filter(
		(x) => new Set(x.properties.id.split('/')).size === 2,
	);
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
//We only want unique tags
const topFive = (removeSectionInput: FETagType[]): FETagType[] =>
	filterTopFive(removeSectionInput);

const topFiveUnique = (topFiveInput: FETagType[]): FETagType[] =>
	[...new Set(topFiveInput.map((item) => item.properties.id))]
		.map((id) => topFiveInput.find((item) => item.properties.id === id))
		.filter(notUndefined);

export const extractTrendingTopics = (
	collections: FECollectionType[],
): FETagType[] => {
	const dedupedTrails = allTrailsDeduped(allTrails(collections));
	const filteredTags = topFiveUnique(
		topFive(removeSection(desiredTags(allTags(dedupedTrails)))),
	);
	return filteredTags;
};
