import type { ABTestAPI } from '@guardian/ab-core';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

const apiPromise = new Promise<ABTestAPI>(() => {});
const key = 'ab-test-api';

/**
 * A hook which returns the AB Test Api when available,
 * or undefined otherwise.
 *
 * Leverages an immutable SWR to satisfy all requests to the
 * AB Core. As soon as the tests are available, all instances of
 * the useAB hook will render.
 */
export const useAB = (): ABTestAPI | undefined => {
	const { data } = useSWRImmutable(key, () => apiPromise);

	return data;
};

export const setABTests = (api: ABTestAPI): void => {
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	mutate(key, api, false);
};
