import type { DCRCollectionType } from '../types/front';

const requiredCollectionsForTest = ['news', 'features', 'more features'];

const hasRequiredSlimHomepageAbTestCollections = (
	collections: DCRCollectionType[],
): boolean => {
	return requiredCollectionsForTest.every((displayName) =>
		collections
			.map((collection) => collection.displayName.toLowerCase())
			.includes(displayName),
	);
};

export const calculateWhenToStartSlimming = (
	filteredCollections: DCRCollectionType[],
): number =>
	filteredCollections.findIndex(
		({ displayName }) => displayName.toLowerCase() === 'news',
	);

export const doesPageQualifyForSlimHomepageAbTest = (
	collections: DCRCollectionType[],
	pageId: string,
	hasPageSkin: boolean,
): boolean => {
	const hasRequiredCollections =
		hasRequiredSlimHomepageAbTestCollections(collections);

	return pageId === 'uk' && !hasPageSkin && hasRequiredCollections;
};
