import { getAnniversaryAtomCache } from '@root/src/web/server/cacheForAnniversaryInteractiveAtom';

export const enhanceAnniversaryAtom = (data: CAPIType): CAPIType => {
	// TODO Add switch
	const {
		anniversaryArticleHeader,
		hideAnniversaryAtom,
	} = data.config.switches;

	// If the main anniversaryArticleHeader switch is ON
	// and the AB test switch is NOT ON.
	// Users will be opted-in to the AB Test IF THEY HIDE THE BANNER.
	if (anniversaryArticleHeader && !hideAnniversaryAtom) {
		data.anniversaryInteractiveAtom = getAnniversaryAtomCache();
	}

	return data;
};
