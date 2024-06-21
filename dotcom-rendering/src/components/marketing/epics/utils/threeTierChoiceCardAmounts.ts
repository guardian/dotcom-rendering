import {
	countryCodeToCountryGroupId,
	type CountryGroupId,
} from '@guardian/support-dotcom-components';

export type SupportTier = 'support' | 'allAccess' | 'other';

export const threeTierChoiceCardAmounts = {
	GBPCountries: {
		support: 4,
		allAccess: 10,
		other: 0,
	},
	UnitedStates: {
		support: 5,
		allAccess: 13,
		other: 0,
	},
	AUDCountries: {
		support: 10,
		allAccess: 17,
		other: 0,
	},
	EURCountries: {
		support: 4,
		allAccess: 10,
		other: 0,
	},
	NZDCountries: {
		support: 10,
		allAccess: 17,
		other: 0,
	},
	Canada: {
		support: 5,
		allAccess: 13,
		other: 0,
	},
	International: {
		support: 3,
		allAccess: 13,
		other: 0,
	},
} as const satisfies Record<CountryGroupId, Record<SupportTier, number>>;

export function getDefaultAmount(countryCode?: string): number {
	const countryGroupId = countryCodeToCountryGroupId(countryCode);
	return threeTierChoiceCardAmounts[countryGroupId].allAccess;
}
