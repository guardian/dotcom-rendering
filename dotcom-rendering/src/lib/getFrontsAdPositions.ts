import { isUndefined } from '@guardian/libs';
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
	splash: number;
};

export type AdCandidateMobile = Pick<
	DCRCollectionType,
	'collectionType' | 'containerLevel' | 'containerPalette'
>;

/** The Merch high slot is directly before the most viewed container  */
const getMerchHighPosition = (collections: AdCandidateMobile[]): number => {
	const mostViewedPosition = collections.findIndex(isMostViewedContainer);
	return mostViewedPosition - 1;
};

/**
 * This happens on the recipes front, where the first container is a thrasher
 * @see https://github.com/guardian/frontend/pull/20617
 */
const isFirstContainerAndThrasher = (collectionType: string, index: number) =>
	index === 0 && collectionType === 'fixed/thrasher';

const isMerchHighPosition = (
	collectionIndex: number,
	merchHighPosition: number,
): boolean => collectionIndex === merchHighPosition;

const isBeforeThrasher = (index: number, collections: AdCandidateMobile[]) =>
	collections[index + 1]?.collectionType === 'fixed/thrasher';

const isBeforeBrandedContainer = (
	index: number,
	collections: AdCandidateMobile[],
) => collections[index + 1]?.containerPalette === 'Branded';

const isMostViewedContainer = (collection: AdCandidateMobile) =>
	collection.collectionType === 'news/most-popular';

const isBeforeSecondaryLevelContainer = (
	index: number,
	collections: AdCandidateMobile[],
) => collections[index + 1]?.containerLevel === 'Secondary';

const hasSecondaryLevelContainers = (collections: AdCandidateMobile[]) =>
	!!collections.find((c) => c.containerLevel === 'Secondary');

/**
 * Checks if mobile ad insertion is possible immediately after the
 * position of the current collection
 *
 * . ------------------ .
 * | Current collection |
 * | ------------------ | <-- Maybe ad position
 * | Next collection    |
 * ' ------------------ '
 */
const canInsertMobileAd =
	(merchHighPosition: number, hasSecondaryContainers: boolean) =>
	(
		collection: AdCandidateMobile,
		index: number,
		collections: AdCandidateMobile[],
	) => {
		/**
		 * Ad slots can only be inserted after positions that satisfy the following rules:
		 * - Is NOT the slot used for the merch high position
		 * - Is NOT a thrasher if it is the first container
		 * - Is NOT before a thrasher
		 * - Is NOT the most viewed container
		 */
		const rules = [
			!isMerchHighPosition(index, merchHighPosition),
			!isFirstContainerAndThrasher(collection.collectionType, index),
			!isBeforeThrasher(index, collections),
			!isMostViewedContainer(collection),
		];

		/** Additional rules exist for "beta" fronts which have primary and secondary level containers */
		const betaFrontRules = [
			// Allow insertion after first container at any time but for all other situations,
			// prevent insertion before a secondary level container
			index === 0 || !isBeforeSecondaryLevelContainer(index, collections),
			// Prevent insertion before a branded container
			!isBeforeBrandedContainer(index, collections),
		];

		// Ad insertion is possible if every condition is met
		return hasSecondaryContainers
			? [...rules, ...betaFrontRules].every(Boolean)
			: rules.every(Boolean);
	};

const isEvenIndex = (_collection: unknown, index: number): boolean =>
	index % 2 === 0;

/**
 * Filters out unsuitable positions then takes every other position for possible ad insertion,
 * up to a maximum of `MAX_FRONTS_MOBILE_ADS`
 */
const getMobileAdPositions = (collections: AdCandidateMobile[]): number[] => {
	const merchHighPosition = getMerchHighPosition(collections);
	const hasSecondaryContainers = hasSecondaryLevelContainers(collections);

	return (
		collections
			.filter(
				canInsertMobileAd(merchHighPosition, hasSecondaryContainers),
			)
			// Use every other ad position if the front has no secondary containers
			.filter((c, i) =>
				hasSecondaryContainers ? true : isEvenIndex(c, i),
			)
			.map((collection) => collections.indexOf(collection))
			.filter((adPosition: number) => adPosition !== -1)
			.slice(0, MAX_FRONTS_MOBILE_ADS)
	);
};

/**
 * Estimates the height of a collection.
 *
 * A result of 3 would approximately be the height of a typical desktop viewport (~900px).
 * A result of 1 would be a third of the height, a result of 1.5 would be half, etc.
 * A result of 6 indicates a container is at least double the height of a typical desktop viewport.
 */
const getCollectionHeight = (
	collction: DCRCollectionType,
): 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 6 => {
	const { collectionType, containerPalette, grouped } = collction;

	if (containerPalette === 'PodcastPalette') {
		return 1.5;
	}

	// The height of some dynamic layouts depend on the sizes of the cards that are passed to them.
	const groupedCounts = {
		snap: grouped.snap.length,
		huge: grouped.huge.length,
		veryBig: grouped.veryBig.length,
		big: grouped.big.length,
		standard: grouped.standard.length,
		splash: grouped.splash.length,
	} satisfies GroupedCounts;

	switch (collectionType) {
		// Some thrashers are very small. Since we'd prefer to have ads above content rather than thrashers,
		// err on the side of inserting fewer ads, by setting the number on the small side for thrashers
		case 'fixed/thrasher':
		case 'scrollable/small':
			return 0.5;

		case 'fixed/small/slow-IV':
		case 'fixed/small/slow-V-mpu':
		case 'nav/list':
		case 'nav/media-list':
		case 'scrollable/medium':
		case 'static/medium/4':
			return 1;

		case 'fixed/small/slow-I':
		case 'fixed/small/slow-III':
		case 'fixed/small/slow-V-third':
		case 'fixed/small/slow-V-half':
		case 'fixed/small/fast-VIII':
		case 'fixed/video':
		case 'fixed/video/vertical':
		case 'scrollable/feature':
			return 1.5;

		case 'fixed/medium/slow-VI':
		case 'fixed/medium/slow-VII':
		case 'fixed/medium/slow-XII-mpu':
		case 'fixed/medium/fast-XI':
		case 'fixed/medium/fast-XII':
		case 'static/feature/2':
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

		case 'flexible/special':
			if (groupedCounts.snap && !groupedCounts.splash) {
				return 1.5;
			} else if (groupedCounts.splash && !groupedCounts.standard) {
				return 2.5;
			} else {
				return 3;
			}

		case 'flexible/general':
			if (groupedCounts.splash && !groupedCounts.standard) {
				return 2.5;
			} else if (groupedCounts.splash && groupedCounts.standard > 2) {
				return 6;
			} else if (
				grouped.splash[0]?.boostLevel === 'megaboost' ||
				grouped.splash[0]?.boostLevel === 'gigaboost'
			) {
				return 6;
			} else {
				return 3;
			}

		default:
			return 1; // Unknown collection type.
	}
};

/**
 * Checks if destkop ad insertion is possible immediately before the
 * position of the current collection
 *
 * . ------------------- .
 * | Previous collection |
 * | ------------------- | <-- Maybe ad position
 * | Current collection  |
 * ' ------------------- '
 */
const canInsertDesktopAd = (
	heightSinceAd: number,
	pageId: string,
	collection: DCRCollectionType,
	previousCollection: DCRCollectionType,
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

	if (collection.containerLevel === 'Secondary') {
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
	collections: DCRCollectionType[],
	pageId: string,
): number[] =>
	collections.reduce<{ heightSinceAd: number; adPositions: number[] }>(
		(accumulator, collection, index) => {
			const { heightSinceAd, adPositions } = accumulator;

			const isFinalCollection = index === collections.length - 1;
			const isMaxAdsReached = adPositions.length >= MAX_FRONTS_BANNER_ADS;

			if (isFinalCollection || isMaxAdsReached) {
				// Stop inserting adverts all together
				return accumulator;
			}

			const prevCollection = collections[index - 1];
			const isFirstCollection = isUndefined(prevCollection);

			if (
				!isFirstCollection &&
				canInsertDesktopAd(
					heightSinceAd,
					pageId,
					collection,
					prevCollection,
				)
			) {
				// Inserting advert, resetting the height since ad
				// to the height of the current collection
				return {
					adPositions: [...adPositions, index],
					heightSinceAd: getCollectionHeight(collection),
				};
			} else {
				// Not inserting advert, moving onto the next container
				// and increasing the height since ad
				return {
					adPositions,
					heightSinceAd:
						heightSinceAd + getCollectionHeight(collection),
				};
			}
		},
		{ heightSinceAd: 0, adPositions: [] },
	).adPositions;

export {
	isEvenIndex,
	isMerchHighPosition,
	getMerchHighPosition,
	getMobileAdPositions,
	getFrontsBannerAdPositions,
};
