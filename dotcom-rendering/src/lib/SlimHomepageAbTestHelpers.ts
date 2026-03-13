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
	filteredCollections.findIndex((collection) =>
		collection.displayName.toLowerCase().includes('news'),
	);

export const doesPageQualifyForSlimHomepageAbTest = (
	collections: DCRCollectionType[],
	pageId: string,
	hasPageSkin: boolean,
): boolean => {
	/**
	 * This is temporarily commmented out so that we can review this in a 0% test.
	 * There is currently a container above News on the UK front, which means the test won't run.
	 * We will only start this test once News is again the top container, but in the meantime, we
	 * would like to be able to review this test.
	 */
	// const isFirstCollectionNews =
	// 	collections[0]?.displayName.toLowerCase() === 'news';
	const hasRequiredCollections =
		hasRequiredSlimHomepageAbTestCollections(collections);

	return (
		pageId === 'uk' &&
		!hasPageSkin &&
		// isFirstCollectionNews &&
		hasRequiredCollections
	);
};
