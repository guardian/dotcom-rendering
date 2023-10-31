import type { DCRCollectionType } from '../types/front';
import { frontsBannerExcludedCollections } from './frontsBannerExclusions';

type GroupedCounts = {
	snap: number;
	huge: number;
	veryBig: number;
	big: number;
	standard: number;
};

/**
 * The maximum number of fronts-banner ads that can be inserted on any front.
 */
const MAX_FRONTS_BANNER_ADS = 6;

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
): number => {
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

const canAdGoBelowCollection = (
	heightSinceAd: number,
	containerPalette: DCRCollectionType['containerPalette'],
) => {
	if (containerPalette === 'Branded') {
		return false;
	}

	return heightSinceAd >= 3;
};

const canAdGoAboveNextCollection = (
	heightSinceAd: number,
	pageId: string,
	collection: Pick<
		DCRCollectionType,
		'displayName' | 'collectionType' | 'containerPalette'
	>,
) => {
	const excludedCollection = frontsBannerExcludedCollections[pageId] ?? [];

	// There isn't a "next collection" if this is the last collection.
	// Don't insert an ad below this collection if the next collection prohibits ads above it.
	if (
		excludedCollection.includes(collection.displayName) ||
		collection.containerPalette === 'Branded'
	) {
		return false;
	}

	return heightSinceAd >= 3;
};

/**
 * Checks if we have reached a condition that indicates that we no longer
 * want to insert any more fronts-banner ads into the page.
 */
const canStillInsertAds = (
	adPositions: number[],
	collectionsLength: number,
	index: number,
) =>
	adPositions.length < MAX_FRONTS_BANNER_ADS &&
	// Don't insert ad below the second-last collection (above the last collection)
	// We serve a merchandising slot below the last collection and we don't want
	// to sandwich the last collection between two full-width ads.
	index < collectionsLength - 2;

/**
 * Decides where ads should be inserted on standard fronts pages.
 *
 * Iterates through the collections and decides where fronts-banner
 * ad slots should be inserted based on the collection properties.
 */
const getFrontsBannerAdPositions = (
	collections: Pick<
		DCRCollectionType,
		'displayName' | 'collectionType' | 'containerPalette' | 'grouped'
	>[],
	pageId: string,
): number[] => {
	let heightSinceAd = 0;
	const adPositions = [];

	for (const [index, collection] of collections.entries()) {
		if (!canStillInsertAds(adPositions, collections.length, index)) {
			break;
		}

		const nextCollection = collections[index + 1];
		if (!nextCollection) {
			break;
		}

		heightSinceAd += getCollectionHeight(collection);

		if (
			canAdGoBelowCollection(
				heightSinceAd,
				collection.containerPalette,
			) &&
			canAdGoAboveNextCollection(heightSinceAd, pageId, nextCollection)
		) {
			adPositions.push(index + 1);
			heightSinceAd = 0;
		}
	}

	return adPositions;
};

/**
 * Decides where ads should be inserted on tagged fronts.
 *
 * On tagged fronts, an ad in inserted above every third collection.
 *
 * Note: An ad can't be inserted above the last collection, because it would
 * be sandwiched between a fronts-banner ad and the merchandising ad which
 * is inserted below the main content of the page.
 */
const getTaggedFrontsBannerAdPositions = (numCollections: number): number[] => {
	if (numCollections <= 3) {
		// There are no suitable positions to insert an ad.
		return [];
	}

	const numAdsThatFit = Math.floor((numCollections - 1) / 3);

	// Ensure we do not insert more than the maximum allowed number of ads.
	const numAdsToInsert = Math.min(numAdsThatFit, MAX_FRONTS_BANNER_ADS);

	return [...Array(numAdsToInsert).keys()].map((_) => _ * 3 + 2);
};

export { getFrontsBannerAdPositions, getTaggedFrontsBannerAdPositions };
