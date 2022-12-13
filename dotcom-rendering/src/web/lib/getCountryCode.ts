import { getCookie, getLocale, isString, storage } from '@guardian/libs';
import type { CountryCode } from '@guardian/libs';
import { countries } from './countryCodes';

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
	storage.local.set(COUNTRY_CODE_KEY_OVERRIDE, countryCode);
	locale = countryCode;
};

export const isCountryCode = (code: unknown): code is CountryCode => {
	if (!isString(code)) return false;
	if (countries.includes(code as CountryCode)) return true;
	return false;
};

/*
	This method can be used as a non async way of getting the country code
	after getLocaleCode has been called.
 */
export const getCountryCodeSync = (): CountryCode | null => {
	if (locale) return locale;

	const storageCountryCode = storage.local.get(COUNTRY_CODE_KEY_OVERRIDE);
	if (isCountryCode(storageCountryCode)) return storageCountryCode;

	const cookieCountryCode = getCookie({
		name: COUNTRY_CODE_KEY,
		shouldMemoize: true,
	});
	if (isCountryCode(cookieCountryCode)) return cookieCountryCode;

	return null;
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
			if (!('name' in error) || error.name !== 'SecurityError') {
				console.log(`Error getting location from libs/getLocale`);
				window.guardian.modules.sentry.reportError(
					error,
					'get-country-code',
				);
			}

			locale = getCountryCodeSync();
			return locale;
		});
};
