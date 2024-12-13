import { log } from '@guardian/libs';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import type { AdTargeting } from '../types/commercial';

const key = 'ad-targeting';
const apiPromise = new Promise<AdTargeting>(() => {
	/* this never resolves */
});

/**
 * A hook which returns the Ad Targeting for a given page.
 *
 * @param videoLength allows overriding video length, when there are multiple videos on a page
 */
export const useAdTargeting = (
	videoLength?: number,
): AdTargeting | undefined => {
	const { data } = useSWRImmutable(key, () => apiPromise);

	if (data && !data.disableAds && typeof videoLength === 'number') {
		data.customParams['vl'] = videoLength;
		log(
			'commercial',
			`🎯 Ad Targeting – video length (vl) overriden to ${videoLength}`,
		);
	}

	return data;
};

export const setAdTargeting = (adTargeting: AdTargeting): void => {
	void mutate(key, adTargeting, false);
};
