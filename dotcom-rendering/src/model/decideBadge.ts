import type { FEFrontCard } from '../types/front';
import { BadgeType } from '../types/badge';
import { EditionId } from '../web/lib/edition';

function getBrandingFromCards(
	allCards: FEFrontCard[],
	editionId: 'UK' | 'US' | 'AU' | 'INT' | 'EUR',
) {
	return allCards.map(
		(card) =>
			card.properties.editionBrandings.find(
				(editionBranding) => editionBranding.edition.id === editionId,
			)?.branding,
	);
}

/**
 * Construct a badge based on the collection displayName or card branding
 */
export const decideBadge = (
	displayName: string,
	curated: FEFrontCard[],
	backfill: FEFrontCard[],
	isLabs: boolean,
	editionId: EditionId,
): BadgeType | undefined => {
	if (displayName === 'This is Europe') {
		return {
			imageSrc:
				'https://assets.guim.co.uk/images/badges/768d8d7999510d6d05aa2d865640803c/this-is-europe.svg',
			href: '/world/series/this-is-europe',
		};
	}

	const allCards = [...curated, ...backfill];
	const allBranding = getBrandingFromCards(allCards, editionId);
	const allSponsorNames = allBranding.map((brand) => brand?.sponsorName);
	const theFirstBrand = allBranding[0];
	const theFirstName = theFirstBrand?.sponsorName;

	const allCardsHaveTheSameSponsor = allSponsorNames.every(
		(sponsorName) =>
			sponsorName !== undefined && sponsorName === theFirstName,
	);

	const imageSrc = theFirstBrand?.logo.src;
	const href = theFirstBrand?.logo.link;

	if (isLabs && allCardsHaveTheSameSponsor && imageSrc && href) {
		return { imageSrc, href };
	}

	return undefined;
};
