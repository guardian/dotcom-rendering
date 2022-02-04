import { guCmp } from '../guCmp';

const hasRequiredConsents = (): Promise<boolean> =>
	new Promise((resolve, reject) => {
		guCmp.onConsentChange((state) => {
			try {
				resolve(guCmp.getConsentFor('braze', state));
			} catch (e) {
				reject(e);
			}
		});
	});

export { hasRequiredConsents };
