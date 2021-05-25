import { getLocale, storage } from '@guardian/libs';
import type { CountryCode } from '@guardian/types';
import { getCookie } from '@frontend/web/browser/cookie';

const COUNTRY_CODE_KEY = 'GU_geo_country';
const COUNTRY_CODE_KEY_OVERRIDE = 'gu.geo.override';
/*
	Memoizes the location
 */
let locale: CountryCode | null;

/*
	Can be used to override country code and sets it in localStorage
 */
export const overrideCountryCode = (countryCode: CountryCode): void => {
	if (countryCode) {
		storage.local.set(COUNTRY_CODE_KEY_OVERRIDE, countryCode);
		locale = countryCode;
	}
};

/*
	This method can be used as a non async way of getting the country code
	after getLocaleCode has been called.
 */
export const getCountryCodeSync = (): CountryCode | null => {
	return (
		locale ||
		storage.local.get(COUNTRY_CODE_KEY_OVERRIDE) ||
		getCookie(COUNTRY_CODE_KEY)
	);
};

/*
	This method returns the location of the user from guardian/libs getLocale
	It will return fastly's 'GU_geo_country' if it exists,
	or an overridden geolocation from 'gu.geo.override' localStorage
	or if none of those exists, it will call the geo endpoint to fetch it and set it in `GU_geo_country`
 */
export const getLocaleCode = async (): Promise<CountryCode | null> => {
	return getLocale()
		.then((countryCode) => {
			locale = countryCode;
			return countryCode;
		})
		.catch((error) => {
			console.log(`Error getting location from libs/getLocale`);
			window.guardian.modules.sentry.reportError(
				error,
				'get-country-code',
			);
			locale = getCountryCodeSync();
			return locale;
		});
};
