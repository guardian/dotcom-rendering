import { getCountryCode } from '@frontend/web/lib/getCountryCode';

let frameworks: undefined | Record<string, boolean>;

export const getPrivacyFramework = async () => {
	if (typeof frameworks === 'undefined') {
		const isInUS = (await getCountryCode()) === 'US';

		frameworks = {
			ccpa: isInUS,
			tcfv2: !isInUS,
		};
	}
	return frameworks;
};
