import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import type { ABTestAPI } from '../experiments/lib/ab-tests';

/**
 * A promise which never resolves, used to initialise the SWR hook.
 * The actual value is set later via the `setABTests` function.
 */
const apiPromise = new Promise<ABTestAPI>(() => {});
const key = 'ab-tests';

/**
 * A hook which returns the AB Test Api when available,
 * or undefined otherwise.
 *
 * Leverages an immutable SWR to satisfy all requests to the
 * AB Tests. As soon as the tests are available, all instances of
 * the useAB hook will render.
 */
export const useAB = (): ABTestAPI | undefined => {
	const { data } = useSWRImmutable(key, () => apiPromise);
	return data;
};

export const setABTests = (api: ABTestAPI): void => {
	void mutate(key, api, false);
};
