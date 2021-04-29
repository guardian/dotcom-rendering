import { getAnniversaryAtomCache } from '@root/src/web/server/cacheForAnniversaryInteractiveAtom';

export const enhanceAnniversaryAtom = (data: CAPIType): CAPIType => {
	// TODO Add switch
	const { anniversaryArticleHeader } = data.config.switches;
	const {
		hideAnniversaryAtomVariant,
		anniversaryAtomVariant,
	} = data.config.abTests;
	const { editionId } = data;

	// If
	// - the main anniversaryArticleHeader switch is ON
	// - the user is NOT in the hideAnniversaryAtom test VARIANT
	// - the user IS in the anniversaryAtom test variant (for test purposes)
	// Users will be opted-in to VARIANT of the AB Test IF THEY HAVE SEEN THE BANNER.
	if (
		anniversaryArticleHeader && // The main switch is set to ON
		anniversaryAtomVariant === 'variant' && // Opted into the 0% test for testing purposes
		hideAnniversaryAtomVariant !== 'variant' && // Not opted into the 0% A/B test used for hiding the atom
		editionId !== 'AU' // Not in the AU edition
	) {
		data.anniversaryInteractiveAtom = getAnniversaryAtomCache();
	}

	return data;
};
