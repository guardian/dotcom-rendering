import { createHash } from 'node:crypto';
import { ASSET_ORIGIN } from '../lib/assets';
import type { DCRBadgeType } from '../types/badge';
import type { Branding } from '../types/branding';
import { BADGES, SPECIAL_BADGES } from './badges';

/**
 * Fetches the badge properties only if ALL branding has the same sponsor.
 */
export const getBadgeFromBranding = (
	branding?: Branding[],
): DCRBadgeType | undefined => {
	// Early return if there are no branding elements
	if (!branding) return;
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
export const getEditorialBadge = (
	seriesTag?: string,
): DCRBadgeType | undefined => {
	if (!seriesTag) return undefined;

	const badge = BADGES.find((b) => b.seriesTag === seriesTag);
	if (badge) {
		return {
			imageSrc: `${ASSET_ORIGIN}static/frontend/${badge.imageSrc}`,
			href: `/${seriesTag}`,
		};
	} else {
		// "Special" hidden badges have their series tags hashed
		const specialBadge = SPECIAL_BADGES.find((b) => {
			const badgeHash = createHash('md5')
				.update(b.salt + seriesTag)
				.digest('hex');
			return badgeHash.includes(b.hashedTag);
		});

		return specialBadge
			? {
					imageSrc: `${ASSET_ORIGIN}static/frontend/${specialBadge.imageSrc}`,
					href: `/${seriesTag}`,
			  }
			: undefined; // No badge or special badge found
	}
};

/**
 * Return a badge based on the series tag or container branding
 *
 * Try to fetch badge using series tag first
 * Otherwise try to fetch badge using branding elements
 * Returns undefined as default / if no matches found
 */
export const decideBadge = (
	seriesTag?: string,
	allBranding?: Branding[],
): DCRBadgeType | undefined => {
	return getEditorialBadge(seriesTag) ?? getBadgeFromBranding(allBranding);
};
