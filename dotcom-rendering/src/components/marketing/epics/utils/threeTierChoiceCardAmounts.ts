import {
	countryCodeToCountryGroupId,
	type CountryGroupId,
} from '@guardian/support-dotcom-components';

export type SupportTier = 'support' | 'allAccess' | 'other';

// ToDo: fetch this in a way that isn't hardcoded
export const threeTierChoiceCardAmounts = {
	GBPCountries: {
		support: 4,
		allAccess: 12,
		other: 0,
	},
	UnitedStates: {
		support: 5,
		allAccess: 15,
		other: 0,
	},
	AUDCountries: {
		support: 10,
		allAccess: 20,
		other: 0,
	},
	EURCountries: {
		support: 4,
		allAccess: 12,
		other: 0,
	},
	NZDCountries: {
		support: 10,
		allAccess: 20,
		other: 0,
	},
	Canada: {
		support: 5,
		allAccess: 15,
		other: 0,
	},
	International: {
		support: 3,
		allAccess: 15,
		other: 0,
	},
} as const satisfies Record<CountryGroupId, Record<SupportTier, number>>;

export function getDefaultThreeTierAmount(countryCode?: string): number {
	const countryGroupId = countryCodeToCountryGroupId(countryCode);
	return threeTierChoiceCardAmounts[countryGroupId].allAccess;
}
