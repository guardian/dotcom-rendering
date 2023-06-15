import type { DCRBadgeType } from '../types/badge';
import type { Branding } from '../types/branding';

export const BADGE_THIS_IS_EUROPE = {
	imageSrc:
		'https://assets.guim.co.uk/images/badges/768d8d7999510d6d05aa2d865640803c/this-is-europe.svg',
	href: '/world/series/this-is-europe',
};

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
 * Construct a badge based on the collection displayName or card branding
 */
export const decideBadge = (
	displayName: string,
	allBranding: Branding[],
): DCRBadgeType | undefined => {
	if (displayName === 'This is Europe') {
		return BADGE_THIS_IS_EUROPE;
	}

	return getBadgeFromBranding(allBranding);
};
