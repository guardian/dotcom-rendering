import { isUndefined } from '@guardian/libs';
import type { DCRCollectionType, DCRGroupedTrails } from '../types/front';
import {
	MAX_FRONTS_BANNER_ADS,
	MAX_FRONTS_BANNER_ADS_BETA,
	MAX_FRONTS_MOBILE_ADS,
} from './commercial-constants';
import { frontsBannerExcludedCollections } from './frontsBannerAdExclusions';

type GroupedCounts = {
	snap: number;
	huge: number;
	veryBig: number;
	big: number;
	standard: number;
	splash: number;
};

type FlexibleSpecialGroupedCounts = {
	snap: number;
	splash: number;
	standard: number;
};

type FlexibleGeneralGroupedCounts = {
	gigaboostedSplash: number;
	megaboostedSplash: number;
	boostedSplash: number;
	splash: number;
	immersive: number;
	veryBig: number;
	big: number;
	standardBoosted: number;
	standard: number;
};

export type AdCandidate = Pick<
	DCRCollectionType,
	| 'collectionType'
	| 'containerLevel'
	| 'containerPalette'
	| 'displayName'
	| 'grouped'
>;

/** The Merch high slot is directly before the most viewed container  */
const getMerchHighPosition = (collections: AdCandidate[]): number => {
	const mostViewedPosition = collections.findIndex(isMostViewedContainer);
	return mostViewedPosition - 1;
};

/**
 * This happens on the recipes front, where the first container is a thrasher
 * @see https://github.com/guardian/frontend/pull/20617
 */
const isFirstContainerAndThrasher = (collectionType: string, index: number) =>
	index === 0 && collectionType === 'fixed/thrasher';

const isMerchHighPositionOrBefore = (
	collectionIndex: number,
	merchHighPosition: number,
): boolean =>
	collectionIndex === merchHighPosition ||
	collectionIndex === merchHighPosition - 1;

const isBeforeThrasher = (index: number, collections: AdCandidate[]) =>
	collections[index + 1]?.collectionType === 'fixed/thrasher';

const isBeforeBrandedContainer = (index: number, collections: AdCandidate[]) =>
	collections[index + 1]?.containerPalette === 'Branded';

const isMostViewedContainer = (collection: AdCandidate) =>
	collection.collectionType === 'news/most-popular';

const isBeforeSecondaryLevelContainer = (
	index: number,
	collections: AdCandidate[],
) => collections[index + 1]?.containerLevel === 'Secondary';

const hasSecondaryLevelContainers = (collections: AdCandidate[]) =>
	!!collections.find((c) => c.containerLevel === 'Secondary');

export const removeConsecutiveAdSlotsReducer = (
	acc: number[],
	slotNum: number,
): number[] => {
	const prevSlot = acc.at(-1);
	if (isUndefined(prevSlot)) {
		// Insert first slot
		return [slotNum];
	} else if (prevSlot < slotNum - 1) {
		// If previous slot is more than 1 index away from current slot, we're happy
		return [...acc, slotNum];
	} else {
		return acc;
	}
};

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
	(collection: AdCandidate, index: number, collections: AdCandidate[]) => {
		/**
		 * Ad slots can only be inserted after positions that satisfy the following rules:
		 * - Is NOT the slot used for the merch high position or the slot before that
		 * - Is NOT a thrasher if it is the first container
		 * - Is NOT before a thrasher
		 * - Is NOT the most viewed container
		 */
		const rules = [
			!isMerchHighPositionOrBefore(index, merchHighPosition),
			!isFirstContainerAndThrasher(collection.collectionType, index),
			!isBeforeThrasher(index, collections),
			!isMostViewedContainer(collection),
		];

		/**
		 * Additional rules exist for "beta" fronts which have primary and secondary level containers
		 * - Is NOT before a secondary level container OR is the top container and is large.
		 * - Is NOT before a branded container
		 */
		const betaFrontRules = [
			!isBeforeSecondaryLevelContainer(index, collections) ||
				(index === 0 && getCollectionHeight(collection) >= 3),
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
 * Filters out unsuitable positions then takes every other position for
 * possible ad insertion, up to a maximum of `MAX_FRONTS_MOBILE_ADS`.
 */
const getMobileAdPositions = (collections: AdCandidate[]): number[] => {
	const merchHighPosition = getMerchHighPosition(collections);
	const hasSecondaryContainers = hasSecondaryLevelContainers(collections);

	const adPositions = collections
		.filter(canInsertMobileAd(merchHighPosition, hasSecondaryContainers))
		// Use every other ad position if the front has no secondary containers
		.filter((c, i) => (hasSecondaryContainers ? true : isEvenIndex(c, i)))
		.map((collection) => collections.indexOf(collection))
		.filter((adPosition: number) => adPosition !== -1)
		// Avoid consecutive ad slots if the front does have secondary containers
		.reduce(
			hasSecondaryContainers
				? removeConsecutiveAdSlotsReducer
				: (acc: number[], el: number) => [...acc, el], // returns the original array
			[],
		)
		.slice(0, MAX_FRONTS_MOBILE_ADS);

	return adPositions;
};

/**
 * Predicted relative heights of the cards that can be found in a flexible/general container.
 */
const flexibleGeneralCardHeights = {
	gigaboostedSplash: 2.5,
	megaboostedSplash: 2.5,
	boostedSplash: 1.5,
	splash: 1.5,
	immersive: 1.5,
	veryBig: 1.5,
	big: 1,
	standardBoosted: 1,
	standard: 0.5,
};

/**
 * Estimates the height of a flexible/general container.
 */
const getFlexibleGeneralHeight = (grouped: DCRGroupedTrails) => {
	const groupedCounts = {
		gigaboostedSplash: grouped.splash.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel === 'gigaboost' && !isImmersive,
		).length,
		megaboostedSplash: grouped.splash.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel === 'megaboost' && !isImmersive,
		).length,
		boostedSplash: grouped.splash.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel === 'boost' && !isImmersive,
		).length,
		splash: grouped.splash.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel === 'default' && !isImmersive,
		).length,
		immersive:
			grouped.standard.filter(({ isImmersive }) => isImmersive).length +
			grouped.veryBig.filter(({ isImmersive }) => isImmersive).length +
			grouped.big.filter(({ isImmersive }) => isImmersive).length +
			grouped.splash.filter(({ isImmersive }) => isImmersive).length,
		veryBig: grouped.veryBig.filter(({ isImmersive }) => !isImmersive)
			.length,
		big: grouped.big.filter(({ isImmersive }) => !isImmersive).length,
		standardBoosted: grouped.standard.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel !== 'default' && !isImmersive,
		).length,
		standard: grouped.standard.filter(
			({ boostLevel, isImmersive }) =>
				boostLevel === 'default' && !isImmersive,
		).length,
	} satisfies FlexibleGeneralGroupedCounts;

	return Object.entries(groupedCounts).reduce((acc, [key, value]) => {
		const cardHeight =
			flexibleGeneralCardHeights[
				key as keyof typeof flexibleGeneralCardHeights
			];
		return acc + value * cardHeight;
	}, 0);
};

/**
 * Predicted relative heights of the cards that can be found in a flexible/special container.
 */
const flexibleSpecialCardHeights = {
	snap: 1.5,
	splash: 2,
	standard: 0.5,
};

/**
 * Estimates the height of a flexible/special container.
 */
const getFlexibleSpecialHeight = (grouped: DCRGroupedTrails) => {
	const groupedCounts = {
		snap: grouped.snap.length,
		// The first standard card in a fleixible/special collection is always a splash card.
		splash: grouped.standard.length ? 1 : 0,
		standard: Math.max(grouped.standard.length - 1, 0),
	} satisfies FlexibleSpecialGroupedCounts;

	return Object.entries(groupedCounts).reduce((acc, [key, value]) => {
		const cardHeight =
			flexibleSpecialCardHeights[
				key as keyof typeof flexibleSpecialCardHeights
			];
		return acc + value * cardHeight;
	}, 0);
};

/**
 * Estimates the height of a collection.
 *
 * A result of 3 would approximately be the height of a typical desktop viewport (~900px).
 * A result of 1 would be a third of the height, a result of 1.5 would be half, etc.
 * A result of 6 indicates a container is at least double the height of a typical desktop viewport.
 */
const getCollectionHeight = (collection: AdCandidate): number => {
	const { collectionType, containerPalette, grouped } = collection;

	if (containerPalette === 'PodcastPalette') {
		return 1.5;
	}

	// The height of some dynamic layouts depends on the sizes of the cards that are passed to them.
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
			return 0.5;

		case 'fixed/small/slow-IV':
		case 'fixed/small/slow-V-mpu':
		case 'nav/list':
		case 'nav/media-list':
		case 'scrollable/small':
		case 'scrollable/medium':
		case 'static/medium/4':
			return 1;

		case 'fixed/small/slow-I':
		case 'fixed/small/slow-III':
		case 'fixed/small/slow-V-third':
		case 'fixed/small/slow-V-half':
		case 'fixed/small/fast-VIII':
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

		/**
		 * - - - BETA collections below this line - - -
		 */
		case 'flexible/special':
			return getFlexibleSpecialHeight(grouped);

		case 'flexible/general':
			return getFlexibleGeneralHeight(grouped);

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
	collection: AdCandidate,
	previousCollection: AdCandidate,
	index: number,
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

	/**
	 * We don't want to insert ads above secondary level collections as its
	 * content is often related to the content in the above container. We prefer
	 * to place ads between distinct pieces of content. An exception is made
	 * for a prime ad position high up on the page.
	 */
	if (collection.containerLevel === 'Secondary' && index !== 1) {
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
 *
 * | ------------------- |
 * | Previous collection |
 * . ------------------- | <-- Maybe ad position
 * | Current collection  |
 * | ------------------- |
 */
const getDesktopAdPositions = (
	collections: AdCandidate[],
	pageId: string,
): number[] => {
	const maxAdsAllowed = hasSecondaryLevelContainers(collections)
		? MAX_FRONTS_BANNER_ADS_BETA
		: MAX_FRONTS_BANNER_ADS;

	const adPositionsFromReducer = collections.reduce<{
		heightSinceAd: number;
		adPositions: number[];
	}>(
		(accumulator, collection, index) => {
			const { heightSinceAd, adPositions } = accumulator;

			const isFinalCollection = index === collections.length - 1;
			const isMaxAdsReached = adPositions.length >= maxAdsAllowed;

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
					index,
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

	return adPositionsFromReducer;
};

export {
	isEvenIndex,
	getMerchHighPosition,
	getMobileAdPositions,
	getDesktopAdPositions,
};
