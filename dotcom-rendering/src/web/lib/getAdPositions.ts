import type { DCRCollectionType } from '../../types/front';

type AdCandidate = Pick<DCRCollectionType, 'collectionType'>;

export const getMerchHighPosition = (
	collectionCount: number,
	isNetworkFront: boolean | undefined,
): number => {
	if (collectionCount >= 4) {
		if (isNetworkFront === true) {
			return 3;
		} else {
			return 2;
		}
	} else {
		return 0;
	}
};

// This happens on the recipes front, where the first container is a thrasher see: https://github.com/guardian/frontend/pull/20617
const hasFirstContainerThrasher = (collectionType: string, index: number) =>
	index === 0 && collectionType === 'fixed/thrasher';

const hasAdjacentCommercialContainer = (
	collectionIndex: number,
	merchHighPosition: number,
) => collectionIndex === merchHighPosition;

const hasAdjacentThrasher = (index: number, collections: AdCandidate[]) =>
	collections[index + 1]?.collectionType === 'fixed/thrasher';

const isMostViewedContainer = (collection: AdCandidate) =>
	collection.collectionType === 'news/most-popular';

const shouldInsertAd =
	(merchHighPosition: number) =>
	(
		collection: AdCandidate,
		collectionIndex: number,
		collections: AdCandidate[],
	) =>
		!(
			hasFirstContainerThrasher(
				collection.collectionType,
				collectionIndex,
			) ||
			hasAdjacentCommercialContainer(
				collectionIndex,
				merchHighPosition,
			) ||
			hasAdjacentThrasher(collectionIndex, collections) ||
			isMostViewedContainer(collection)
		);

const isEvenIndex = (_collection: unknown, index: number) => index % 2 === 0;

/**
 * We do not insert mobile ads:
 * a. after the first container if it is a thrasher
 * b. after a commercial container (e.g. merchandising-high)
 * c. between a regular container and a thrasher
 * d. after the Most Viewed container.
 * After we've filtered out the containers next to which we can insert an ad,
 * we take every other container, up to a maximum of 10, for targeting MPU insertion.
 */
export const getMobileAdPositions = (
	collections: AdCandidate[],
	merchHighPosition: number,
): number[] =>
	collections
		.filter(shouldInsertAd(merchHighPosition))
		.filter(isEvenIndex)
		.map((collection: AdCandidate) => collections.indexOf(collection))
		// Should insert no more than 10 ads
		.slice(0, 10);
