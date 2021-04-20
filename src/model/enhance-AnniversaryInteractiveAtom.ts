import { getAnniversaryAtomCache } from '@root/src/web/server/cacheForAnniversaryInteractiveAtom';

export const enhanceAnniversaryAtom = (data: CAPIType): CAPIType => {
	// TODO Add switch
	const { anniversaryArticleHeader } = data.config.switches;

	const { hideAnniversaryAtomVariant } = data.config.abTests;

	// If the main anniversaryArticleHeader switch is ON
	// and the user is NOT in the AB Tests VARIANT.
	// Users will be opted-in to VARIANT of the AB Test IF THEY HIDE THE BANNER.
	if (anniversaryArticleHeader && hideAnniversaryAtomVariant !== 'variant') {
		data.anniversaryInteractiveAtom = getAnniversaryAtomCache();
	}

	return data;
};
