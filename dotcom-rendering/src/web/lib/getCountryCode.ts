import { getLocale } from '@guardian/libs';
import type { CountryCode } from '@guardian/libs';

/*
	This method returns the location of the user from guardian/libs getLocale
	It will return fastly's 'GU_geo_country' if it exists,
	or an overridden geolocation from 'gu.geo.override' localStorage
	or if none of those exists, it will call the geo endpoint to fetch it and set it in `GU_geo_country`
 */
export const getLocaleCode = async (): Promise<CountryCode | null> => {
	return getLocale().catch((error) => {
		if ('name' in error && error.name === 'SecurityError') return null;

		console.log(`Error getting location from libs/getLocale`);
		window.guardian.modules.sentry.reportError(error, 'get-country-code');
		return null;
	});
};
