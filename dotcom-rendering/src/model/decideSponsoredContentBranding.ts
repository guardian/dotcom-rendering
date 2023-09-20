import type { Branding } from '../types/branding';
import type { DCRContainerType } from '../types/front';

export const decideSponsoredContentBranding = (
	collectionsLength: number,
	allCardsBranding: Branding[],
	editionHasBranding: boolean,
	collectionType: DCRContainerType,
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

	const isNotAThrasher = collectionType !== 'fixed/thrasher';

	const shouldHaveSponsorBranding =
		isNotAThrasher &&
		editionHasBranding &&
		allCardsHaveSponsoredBranding &&
		allCardsHaveTheSameSponsor;

	return shouldHaveSponsorBranding ? allCardsBranding[0] : undefined;
};
