import { isNonNullable } from '@guardian/libs';
import type { FETagType } from '../types/tag';

/**
 * Extracts sectionId from a given tag if its a section tag
 * @param tag
 * @returns a section ID or undefined
 */
const extractTagSectionId = (tag: FETagType): string | undefined => {
	if (tag.properties.id === 'uk/uk') {
		return 'uk-news';
	}

	const split = tag.properties.id.split('/');

	return split[0] === split[1] ? split[0] : undefined;
};

/**
 * Checks if a given tag is a section ID tag
 * @param tag
 * @returns a section ID or undefined
 */
const isNotSectionTag = (tag: FETagType): boolean => {
	const sectionId = extractTagSectionId(tag);

	return !(
		sectionId !== undefined &&
		tag.properties.sectionId !== undefined &&
		sectionId.includes(tag.properties.sectionId)
	);
};

export type NarrowedFEFrontCard = {
	card: {
		id: string;
	};
	properties: {
		maybeContent?: {
			tags: {
				tags: FETagType[];
			};
		};
		maybeContentId?: string;
	};
};

export type NarrowedFECollectionType = {
	curated: NarrowedFEFrontCard[];
	backfill: NarrowedFEFrontCard[];
};

/**
 * Gets all relevant tags filtered by properties
 * @param tags - The deduplicated trails
 * @returns An array of relevant tags
 */
const getTags = (trails: NarrowedFEFrontCard[], pageId: string): FETagType[] =>
	trails
		.flatMap((trail) => trail.properties.maybeContent?.tags.tags)
		.filter(isNonNullable)
		.filter(isNotSectionTag)
		.filter((tag) => tag.properties.id !== pageId)
		.filter((tag) => {
			return (
				!!tag.properties.paidContentType?.includes('Keyword') ||
				!!tag.properties.paidContentType?.includes('Topic') ||
				tag.properties.tagType === 'Keyword'
			);
		});

/**
 * Sort tags by frequency
 * @param tags - Tags which you want to have filtered
 * @returns An array of tags which has been sorted by frequency
 */
const sortTags = (tags: readonly FETagType[]): FETagType[] => {
	const map = new Map<string, { count: number; tag: FETagType }>();

	for (const tag of tags) {
		const {
			properties: { id },
		} = tag;

		map.set(id, { count: (map.get(id)?.count ?? 0) + 1, tag });
	}

	return [...map.values()]
		.sort(({ count: a }, { count: b }) => b - a)
		.map(({ tag }) => tag);
};

export const extractTrendingTopicsFomFront = (
	collections: NarrowedFECollectionType[],
	pageId: string,
): FETagType[] => {
	// Get a single array of all trails in the collections
	const trails = new Map<string, NarrowedFEFrontCard>();
	for (const card of collections.flatMap((collection) => [
		...collection.curated,
		...collection.backfill,
	]))
		trails.set(card.properties.maybeContentId ?? card.card.id, card);

	return extractTrendingTopics([...trails.values()], pageId);
};

export const extractTrendingTopics = (
	trails: NarrowedFEFrontCard[],
	pageId: string,
): FETagType[] => {
	const allTags = getTags(trails, pageId);
	const tags = sortTags(allTags).slice(0, 20);

	return tags;
};
