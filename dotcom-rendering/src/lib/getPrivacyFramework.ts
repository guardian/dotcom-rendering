import { getLocaleCode } from './getCountryCode';

let frameworks: Record<string, boolean>;

export const getPrivacyFramework = async (): Promise<typeof frameworks> => {
	if (typeof frameworks === 'undefined') {
		const isInUS = (await getLocaleCode()) === 'US';

		frameworks = {
			ccpa: isInUS,
			tcfv2: !isInUS,
		};
	}
	return frameworks;
};
