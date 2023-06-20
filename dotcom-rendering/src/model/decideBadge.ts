import { createHash } from 'crypto';
import { ASSET_ORIGIN } from '../lib/assets';
import type { DCRBadgeType, FESpecialBadgeType } from '../types/badge';
import type { Branding } from '../types/branding';
import { FRONTEND_BADGES, FRONTEND_SPECIAL_BADGES } from './badges';

/**
 * Fetches the badge properties only if ALL branding has the same sponsor.
 */
export const getBadgeFromBranding = (
	branding: Branding[],
): DCRBadgeType | undefined => {
	// Early return if there are no branding elements
	if (!branding.length) return;

	const [firstBrand] = branding;
	// Early return if the first brand is falsy
	if (!firstBrand) return;

	const allBrandingHasSameSponsor = branding.every(
		({ sponsorName }) => sponsorName === firstBrand.sponsorName,
	);

	return allBrandingHasSameSponsor
		? {
				imageSrc: firstBrand.logo.src,
				href: firstBrand.logo.link,
		  }
		: undefined;
};

/**
 * Fetches the corresponding badge using the series tag, if there's a match in the lookup.
 */
export const getBadgeFromSeriesTag = (
	seriesTag: string,
): DCRBadgeType | undefined => {
	// First check the list of standard badges against seriesTags
	const badge = FRONTEND_BADGES.find((b) => b.seriesTag === seriesTag);
	// If no badge found (result is falsy) check the list of special badges for a match against the md5 hash
	if (!badge) {
		const specialBadge = findSpecialBadgeBySeriesTag(seriesTag);
		if (specialBadge)
			return {
				imageSrc: `${ASSET_ORIGIN}/static/frontend/${specialBadge.imageSrc}`,
				href: `/${seriesTag}`,
			};
		// Return undefined if no badge & no special badge found
		else return undefined;
	} else
		return {
			imageSrc: `${ASSET_ORIGIN}/static/frontend/${badge.imageSrc}`,
			href: `/${seriesTag}`,
		};
};

/**
 * Fetches special badge if the seriesTag matches the hashed series tag
 */
const findSpecialBadgeBySeriesTag = (
	seriesTag: string,
): FESpecialBadgeType | undefined =>
	FRONTEND_SPECIAL_BADGES.find((b) => {
		const badgeHash = createHash('md5')
			.update(b.salt + seriesTag)
			.digest('hex');

		return badgeHash.includes(b.hashedTag);
	});

/**
 * Construct a badge based on the series tag or container branding
 */
export const decideBadge = (
	tagId: string,
	allBranding: Branding[],
): DCRBadgeType | undefined => {
	const result =
		getBadgeFromSeriesTag(tagId) ?? getBadgeFromBranding(allBranding);

	return result;
};
