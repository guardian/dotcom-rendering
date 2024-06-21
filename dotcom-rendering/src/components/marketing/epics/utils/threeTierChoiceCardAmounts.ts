import type { CountryGroupId } from '@guardian/support-dotcom-components';

export type SupportTier = 'support' | 'allAccess' | 'other';

export const threeTierChoiceCardAmounts = {
	GBPCountries: {
		support: 4,
		allAccess: 10,
		other: NaN,
	},
	UnitedStates: {
		support: 5,
		allAccess: 13,
		other: NaN,
	},
	AUDCountries: {
		support: 10,
		allAccess: 17,
		other: NaN,
	},
	EURCountries: {
		support: 4,
		allAccess: 10,
		other: NaN,
	},
	NZDCountries: {
		support: 10,
		allAccess: 17,
		other: NaN,
	},
	Canada: {
		support: 5,
		allAccess: 13,
		other: NaN,
	},
	International: {
		support: 3,
		allAccess: 13,
		other: NaN,
	},
} as const satisfies Record<CountryGroupId, Record<SupportTier, number>>;
