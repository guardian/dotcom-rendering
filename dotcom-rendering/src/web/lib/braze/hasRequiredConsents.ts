import { getCmpAsync } from '../getCmp';

const hasRequiredConsents = (): Promise<boolean> =>
	new Promise((resolve, reject) => {
		getCmpAsync()
			.then(({ onConsentChange, getConsentFor }) => {
				onConsentChange((state) => {
					try {
						resolve(getConsentFor('braze', state));
					} catch (e) {
						reject(e);
					}
				});
			})
			.catch((e) => reject(e));
	});

export { hasRequiredConsents };
