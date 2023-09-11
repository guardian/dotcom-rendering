import { isNonNullable } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { Branding } from '../types/branding';
import type { FEFrontCard } from '../types/front';

const getBrandingFromCards = (
	allCards: FEFrontCard[],
	editionId: EditionId,
): Branding[] => {
	return allCards
		.map(
			(card) =>
				card.properties.editionBrandings.find(
					(editionBranding) =>
						editionBranding.edition.id === editionId,
				)?.branding,
		)
		.filter(isNonNullable);
};

export const decideCollectionBranding = (
	allCards: FEFrontCard[],
	editionId: EditionId,
): Branding | undefined => {
	const allBranding = getBrandingFromCards(allCards, editionId);
	const allCardsHaveBranding = allCards.length === allBranding.length;

	const allCardsHaveSponsoredBranding =
		allCardsHaveBranding &&
		allBranding.every(
			(branding) => branding.brandingType?.name === 'sponsored',
		);
	const allCardsHaveTheSameSponsor =
		allCardsHaveBranding &&
		allBranding.every(
			(branding) => branding.sponsorName === allBranding[0]?.sponsorName,
		);
	const shouldHaveSponsorBranding =
		allCardsHaveSponsoredBranding && allCardsHaveTheSameSponsor;

	return shouldHaveSponsorBranding ? allBranding[0] : undefined;
};
