import { getConsentFor, onConsentChange } from '@guardian/libs';

const hasRequiredConsents = (): Promise<boolean> =>
	new Promise((resolve, reject) => {
		onConsentChange((state) => {
			try {
				resolve(getConsentFor('braze', state));
			} catch (e) {
				/* eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors --
				 * This object comes from guardian/libs; we can't enforce in
				 * DCAR that it's an instance of Error. */
				reject(e);
			}
		});
	});

export { hasRequiredConsents };
