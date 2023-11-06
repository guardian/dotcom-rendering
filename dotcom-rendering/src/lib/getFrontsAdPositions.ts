import type { DCRCollectionType } from '../types/front';
import {
	MAX_FRONTS_BANNER_ADS,
	MAX_FRONTS_MOBILE_ADS,
} from './commercial-constants';
import { frontsBannerExcludedCollections } from './frontsBannerExclusions';

type GroupedCounts = {
	snap: number;
	huge: number;
	veryBig: number;
	big: number;
	standard: number;
};

type AdCandidate = Pick<DCRCollectionType, 'collectionType'>;

const getMerchHighPosition = (collectionCount: number): number =>
	collectionCount >= 4 ? 2 : 0;

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
const getMobileAdPositions = (collections: AdCandidate[]): number[] => {
	const merchHighPosition = getMerchHighPosition(collections.length);

	return collections
		.filter(shouldInsertAd(merchHighPosition))
		.filter(isEvenIndex)
		.map((collection: AdCandidate) => collections.indexOf(collection))
		.slice(0, MAX_FRONTS_MOBILE_ADS);
};

/**
 * Estimates the height of a collection.
 *
 * A result of 3 would approximately be the height of a typical desktop viewport (~900px).
 * A result of 1 would be a third of the height, a result of 1.5 would be half, etc.
 */
const getCollectionHeight = (
	collction: Pick<
		DCRCollectionType,
		'collectionType' | 'containerPalette' | 'grouped'
	>,
): 0.5 | 1 | 1.5 | 2 | 2.5 | 3 => {
	const { collectionType, containerPalette, grouped } = collction;

	if (containerPalette === 'PodcastPalette') {
		return 1.5;
	}

	// The height of some dynamic layouts depend on the sizes of the cards that are passed to them.
	const groupedCounts: GroupedCounts = {
		snap: grouped.snap.length,
		huge: grouped.huge.length,
		veryBig: grouped.veryBig.length,
		big: grouped.big.length,
		standard: grouped.standard.length,
	};

	switch (collectionType) {
		// Some thrashers are very small. Since we'd prefer to have ads above content rather than thrashers,
		// err on the side of inserting fewer ads, by setting the number on the small side for thrashers
		case 'fixed/thrasher':
			return 0.5;

		case 'fixed/small/slow-IV':
		case 'fixed/small/slow-V-mpu':
		case 'nav/list':
		case 'nav/media-list':
			return 1;

		case 'fixed/small/slow-I':
		case 'fixed/small/slow-III':
		case 'fixed/small/slow-V-third':
		case 'fixed/small/slow-V-half':
		case 'fixed/small/fast-VIII':
		case 'fixed/video':
		case 'fixed/video/vertical':
			return 1.5;

		case 'fixed/medium/slow-VI':
		case 'fixed/medium/slow-VII':
		case 'fixed/medium/slow-XII-mpu':
		case 'fixed/medium/fast-XI':
		case 'fixed/medium/fast-XII':
			return 2;

		case 'fixed/large/slow-XIV':
			return 3;

		case 'dynamic/slow':
		case 'dynamic/slow-mpu':
		case 'dynamic/fast':
			if (groupedCounts.huge > 0 || groupedCounts.veryBig > 0) {
				return 2.5;
			}
			return 1.5;

		case 'dynamic/package':
			if (groupedCounts.standard === 9) {
				return 3;
			} else if (
				groupedCounts.standard === 5 ||
				groupedCounts.standard === 6 ||
				groupedCounts.standard === 7 ||
				groupedCounts.standard === 8
			) {
				return 2.5;
			} else if (
				groupedCounts.standard === 1 ||
				groupedCounts.standard === 3 ||
				groupedCounts.standard === 4
			) {
				return 1.5;
			} else if (groupedCounts.standard === 2) {
				return 1;
			}
			return 1;

		default:
			return 1; // Unknown collection type.
	}
};

const canAdGoAboveCollection = (
	heightSinceAd: number,
	pageId: string,
	collection: Pick<DCRCollectionType, 'displayName' | 'containerPalette'>,
	previousCollection: Pick<DCRCollectionType, 'containerPalette'>,
) => {
	if (
		collection.containerPalette === 'Branded' ||
		previousCollection.containerPalette === 'Branded'
	) {
		return false;
	}

	const excludedCollections = frontsBannerExcludedCollections[pageId] ?? [];
	if (excludedCollections.includes(collection.displayName)) {
		return false;
	}

	return heightSinceAd >= 3;
};

/**
 * Decides where ads should be inserted on standard (not tagged) fronts pages.
 *
 * Iterates through the collections and decides where fronts-banner ad slots should be
 * inserted based on the collection properties.
 *
 * Doesn't insert an ad above the final collection. We serve a merchandising slot below the
 * last collection and we don't want to sandwich the last collection between two full-width ads.
 */
const getFrontsBannerAdPositions = (
	collections: Pick<
		DCRCollectionType,
		'displayName' | 'collectionType' | 'containerPalette' | 'grouped'
	>[],
	pageId: string,
): number[] =>
	collections.reduce<{ heightSinceAd: number; adPositions: number[] }>(
		(accumulator, collection, index) => {
			const { heightSinceAd, adPositions } = accumulator;

			const isFinalCollection = index === collections.length - 1;
			const isMaxAdsReached = adPositions.length >= MAX_FRONTS_BANNER_ADS;
			if (isFinalCollection || isMaxAdsReached) {
				return accumulator;
			}

			const collectionHeight = getCollectionHeight(collection);
			const prevCollection = collections[index - 1];
			const isFirstCollection = prevCollection === undefined;
			if (isFirstCollection) {
				accumulator.heightSinceAd += collectionHeight;
				return accumulator;
			}

			if (
				canAdGoAboveCollection(
					heightSinceAd,
					pageId,
					collection,
					prevCollection,
				)
			) {
				return {
					heightSinceAd: collectionHeight,
					adPositions: [...adPositions, index],
				};
			}

			accumulator.heightSinceAd += collectionHeight;
			return accumulator;
		},
		{ heightSinceAd: 0, adPositions: [] },
	).adPositions;

export {
	getMerchHighPosition,
	getMobileAdPositions,
	getFrontsBannerAdPositions,
};
