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

export const doesPageQualifyForSlimHomepageAbTest = (
	collections: DCRCollectionType[],
	pageId: string,
	hasPageSkin: boolean,
): boolean => {
	const isFirstCollectionNews =
		collections[0]?.displayName.toLowerCase() === 'news';
	const hasRequiredCollections =
		hasRequiredSlimHomepageAbTestCollections(collections);

	return (
		pageId === 'uk' &&
		!hasPageSkin &&
		isFirstCollectionNews &&
		hasRequiredCollections
	);
};
