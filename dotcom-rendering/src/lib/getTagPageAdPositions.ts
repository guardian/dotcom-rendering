import type { GroupedTrailsBase } from '../types/tagPage';
import {
	MAX_FRONTS_BANNER_ADS,
	MAX_FRONTS_MOBILE_ADS,
} from './commercial-constants';
import { isEvenIndex } from './getFrontsAdPositions';

/**
 * Uses a very similar approach to pressed fronts, except we
 * - Do not need to consider thrashers
 * - Do not need to consider the 'most viewed' container
 *
 * The types are also slightly different, as we no longer have
 * specific container IDs, so we use the date which is unique
 */
const getTagPageMobileAdPositions = (
	collections: Array<GroupedTrailsBase>,
): number[] => {
	return collections
		.filter(isEvenIndex)
		.map((collection) =>
			collections.findIndex(
				({ day, month, year }) =>
					day === collection.day &&
					month === collection.month &&
					year === collection.year,
			),
		)
		.filter((adPosition: number) => adPosition !== -1)
		.slice(0, MAX_FRONTS_MOBILE_ADS);
};

/**
 * Decides where ads should be inserted on tagged fronts.
 *
 * On tagged fronts, an ad in inserted above every third collection.
 *
 * Doesn't insert an ad above the final collection. We serve a merchandising slot below the
 * last collection and we don't want to sandwich the last collection between two full-width ads.
 */
const getTagPageBannerAdPositions = (numCollections: number): number[] => {
	if (numCollections <= 3) {
		// There are no suitable positions to insert an ad.
		return [];
	}

	const numAdsThatFit = Math.floor((numCollections - 1) / 3);

	// Ensure we do not insert more than the maximum allowed number of ads.
	const numAdsToInsert = Math.min(numAdsThatFit, MAX_FRONTS_BANNER_ADS);

	return Array.from({ length: numAdsToInsert }, (_, i) => i * 3 + 2);
};

export { getTagPageMobileAdPositions, getTagPageBannerAdPositions };
