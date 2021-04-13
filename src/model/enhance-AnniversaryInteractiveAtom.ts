import { getAnniversaryAtomCache } from '@root/src/web/server/cacheForAnniversaryInteractiveAtom';

export const enhanceAnniversaryAtom = (data: CAPIType): CAPIType => {
	// TODO Add switch
	// const {  } = data.config.switches;
	if ('addAProperSwitchHere') {
		data.anniversaryInteractiveAtom = getAnniversaryAtomCache();
	}

	return data;
};
