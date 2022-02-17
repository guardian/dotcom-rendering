import { getCmp } from '../getCmp';

const hasRequiredConsents = (): Promise<boolean> =>
	new Promise((resolve, reject) => {
		getCmp().onConsentChange((state) => {
			try {
				resolve(getCmp().getConsentFor('braze', state));
			} catch (e) {
				reject(e);
			}
		});
	});

export { hasRequiredConsents };
