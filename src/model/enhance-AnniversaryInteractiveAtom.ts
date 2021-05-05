import { getAnniversaryAtomCache } from '@root/src/web/server/cacheForAnniversaryInteractiveAtom';

export const enhanceAnniversaryAtom = (data: CAPIType): CAPIType => {
	const { anniversaryArticleHeader } = data.config.switches;
	const { hideAnniversaryAtomVariant } = data.config.abTests;
	const { editionId, pageType, shouldHideAds } = data;

	// If
	// - the main anniversaryArticleHeader switch is ON
	// - the user is NOT in the hideAnniversaryAtom test VARIANT
	// Users will be opted-in to VARIANT of the AB Test IF THEY HAVE SEEN THE BANNER.
	if (
		anniversaryArticleHeader && // The main switch is set to ON
		hideAnniversaryAtomVariant !== 'variant' && // Not opted into the 0% A/B test used for hiding the atom
		editionId !== 'AU' && // Not in the AU edition
		!pageType.isSensitive && // The page isn't sensitive
		!shouldHideAds // We aren't hiding adverts
	) {
		data.anniversaryInteractiveAtom = getAnniversaryAtomCache();
	}

	return data;
};
