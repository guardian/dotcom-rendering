import type { Branding } from '../types/branding';

export const decideSponsoredContentBranding = (
	collectionsLength: number,
	allCardsBranding: Branding[],
	editionHasBranding: boolean,
): Branding | undefined => {
	const allCardsHaveBranding = collectionsLength === allCardsBranding.length;

	const allCardsHaveSponsoredBranding =
		allCardsHaveBranding &&
		allCardsBranding.every(
			(branding) => branding.brandingType?.name === 'sponsored',
		);
	const allCardsHaveTheSameSponsor =
		allCardsHaveBranding &&
		allCardsBranding.every(
			(branding) =>
				branding.sponsorName === allCardsBranding[0]?.sponsorName,
		);

	const shouldHaveSponsorBranding =
		editionHasBranding &&
		allCardsHaveSponsoredBranding &&
		allCardsHaveTheSameSponsor;

	return shouldHaveSponsorBranding ? allCardsBranding[0] : undefined;
};
