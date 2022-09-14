import { Participations } from '@guardian/ab-core';
import { getCountryCodeSync } from '../../lib/getCountryCode';
import {
	getParticipationsFromLocalStorage,
	setParticipationsInLocalStorage,
} from './ab-localstorage';

/**
 * Occasionally we may want to track long-running behavior of browsers in a certain test,
 * without adding new browsers to the test bucket. We cannot rely on the GU_mvt_id bucketing alone to do this.
 * You can use this method to show the gate based on local storage participation key ("gu.ab.participations") instead.
 *
 * Caveats - There will be natural churn of users to account for. Users can manually delete localStorage at any time.
 * Some browsers also automatically delete local storage specifically on Webkit browsers (Safari/iOS) since iOS and iPadOS 13.4, Safari 13.1 on macOS
 *
 */
export const setParticipations = (
	currentTestParticipation: Participations,
): void => {
	// sets participation under local storage key: 'gu.ab.participations'
	setParticipationsInLocalStorage(currentTestParticipation);
};

// Put this LAST in any row of canRun boolean functions so we don't set the flag unless all other criteria are true
export const setOrUseParticipations = (
	setParticipationsFlag: boolean, // If setParticipationsFlag is true, will set flag and run test, else will run based on flag
	abTestId: string,
	variantId: string, // IMPORTANT: Can only be used for single variant AB Tests!
): boolean => {
	const participations = getParticipationsFromLocalStorage();

	if (setParticipationsFlag) {
		// check if participation already exists
		if (participations[abTestId]?.variant === variantId) return true;

		// else set add participation to local storage
		setParticipations({
			...participations,
			[abTestId]: {
				variant: variantId,
			},
		});
		return true; // test will be run
	} else {
		// if the test participation exists in localstorage, run the test
		return participations[abTestId]?.variant === variantId;
	}
};

/**
 * Regional Exclusions
 */
export const isInRegion = (region: string[]): boolean => {
	const countryCode = getCountryCodeSync();
	return !!countryCode && region.includes(countryCode);
};
export const EuropeList = [
	'AX',
	'AL',
	'AD',
	'AT',
	'BE',
	'BG',
	'BA',
	'BY',
	'CH',
	'CZ',
	'DE',
	'DK',
	'ES',
	'EE',
	'FI',
	'FR',
	'FO',
	'GG',
	'GI',
	'GR',
	'HR',
	'HU',
	'IM',
	'IE',
	'IS',
	'IT',
	'JE',
	'LI',
	'LT',
	'LU',
	'LV',
	'MC',
	'MD',
	'MK',
	'MT',
	'ME',
	'NL',
	'NO',
	'PL',
	'PT',
	'RO',
	'RU',
	'SJ',
	'SM',
	'RS',
	'SK',
	'SI',
	'SE',
	'UA',
	'VA',
	'XK',
];
