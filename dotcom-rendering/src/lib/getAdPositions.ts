import type { DCRCollectionType } from '../types/front';
import type { GroupedTrailsBase } from '../types/tagFront';

type AdCandidate = Pick<DCRCollectionType, 'collectionType'>;

export const getMerchHighPosition = (collectionCount: number): number => {
	if (collectionCount >= 4) {
		return 2;
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

/**
 * Uses a very similar approach to pressed fronts, except we
 * - Do not need to consider thrashers
 * - Do not need to consider the 'most viewed' container
 *
 * The types are also slightly different, as we no longer have
 * specific container IDs, so we use the date which is unique
 */
export const getTagFrontMobileAdPositions = (
	collections: Array<GroupedTrailsBase>,
	merchHighPosition: number,
): number[] =>
	collections
		.filter(
			(_, index) =>
				!hasAdjacentCommercialContainer(index, merchHighPosition),
		)
		.filter(isEvenIndex)
		.map((collection) =>
			collections.findIndex(
				({ day, month, year }) =>
					day === collection.day &&
					month === collection.month &&
					year === collection.year,
			),
		)
		// Should insert no more than 10 ads
		.slice(0, 10);

const hasDesktopAd = (collection: AdCandidate) => {
	return (
		collection.collectionType == 'dynamic/slow-mpu' ||
		collection.collectionType == 'fixed/small/slow-V-mpu' ||
		collection.collectionType == 'fixed/medium/slow-XII-mpu'
	);
};

export const getDesktopAdPositions = (collections: AdCandidate[]): number[] =>
	collections
		.filter(hasDesktopAd)
		.map((collection) => collections.indexOf(collection));
