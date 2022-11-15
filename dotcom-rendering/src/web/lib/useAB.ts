import type { ABTestAPI, Participations, Runnable } from '@guardian/ab-core';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

type ABTests = {
	api: ABTestAPI;
	participations: Participations;
	allRunnableTests: [] | readonly Runnable[];
};

const apiPromise = new Promise<ABTests>(() => {});
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

export const setABTests = ({
	api,
	participations,
	allRunnableTests,
}: ABTests): void => {
	void mutate(key, { api, participations, allRunnableTests }, false);
};
