import { getLocale } from '@guardian/libs';
import type { CountryCode } from '@guardian/libs';
import { reportErrorToSentry } from './reportErrorToSentry';

/**
 * Generally we see SecurityErrors when a users browser has restrictive privacy settings that prevent access to local storage.
 * We should avoid reporting these errors to Sentry as they're not very useful to us and create a lot of noise.
 */
const isSecurityError = (error: unknown) =>
	error instanceof Error && error.name === 'SecurityError';

/*
	This method returns the location of the user from guardian/libs getLocale
	It will return fastly's 'GU_geo_country' if it exists,
	or an overridden geolocation from 'gu.geo.override' localStorage
	or if none of those exists, it will call the geo endpoint to fetch it and set it in `GU_geo_country`
 */
export const getLocaleCode = async (): Promise<CountryCode | null> => {
	return getLocale().catch((error) => {
		if (isSecurityError(error)) return null;

		console.log(`Error getting location from libs/getLocale`);
		reportErrorToSentry(error, 'get-country-code');
		return null;
	});
};
