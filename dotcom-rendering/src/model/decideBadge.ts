import { BadgeType } from '../types/badge';
import { Branding } from '../types/branding';

/**
 * Construct a badge based on the collection displayName or card branding
 */
export const decideBadge = (
	displayName: string,
	allBranding: Branding[],
): BadgeType | undefined => {
	if (displayName === 'This is Europe') {
		return {
			imageSrc:
				'https://assets.guim.co.uk/images/badges/768d8d7999510d6d05aa2d865640803c/this-is-europe.svg',
			href: '/world/series/this-is-europe',
		};
	}

	if (allBranding[0] !== undefined) {
		const theFirstBrand = allBranding[0];
		const theFirstName = theFirstBrand.sponsorName;
		const allSponsorNames = allBranding.map((brand) => brand.sponsorName);
		const allCardsHaveTheSameSponsor = allSponsorNames.every(
			(sponsorName) => sponsorName === theFirstName,
		);
		const imageSrc = theFirstBrand.logo.src;
		const href = theFirstBrand.logo.link;

		if (allCardsHaveTheSameSponsor) {
			return { imageSrc, href };
		}
	}

	return undefined;
};
