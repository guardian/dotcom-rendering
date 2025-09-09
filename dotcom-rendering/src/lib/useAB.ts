import type { ABTestAPI, Participations } from '@guardian/ab-core';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import type { BetaABTestAPI } from '../experiments/lib/beta-ab-tests';

type ABTests = {
	api: ABTestAPI;
	participations: Participations;
};

/**
 * A promise which never resolves, used to initialise the SWR hook.
 * The actual value is set later via the `setABTests` function.
 */
const apiPromise = new Promise<ABTests>(() => {});
const betaAPIPromise = new Promise<BetaABTestAPI>(() => {});
const key = 'ab-tests';

/**
 * A hook which returns the AB Test Api when available,
 * or undefined otherwise.
 *
 * Leverages an immutable SWR to satisfy all requests to the
 * AB Core. As soon as the tests are available, all instances of
 * the useAB hook will render.
 */
export const useAB = (): ABTests | undefined => {
	const { data } = useSWRImmutable(key, () => apiPromise);
	return data;
};

export const setABTests = ({ api, participations }: ABTests): void => {
	void mutate(key, { api, participations }, false);
};

export const useBetaAB = (): BetaABTestAPI | undefined => {
	const { data } = useSWRImmutable('beta-ab-tests', () => betaAPIPromise);
	return data;
};

export const setBetaABTests = (api: BetaABTestAPI): void => {
	void mutate('beta-ab-tests', api, false);
};
