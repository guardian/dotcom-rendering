import { type CountryGroupId } from '@guardian/support-dotcom-components';

export type SupportTier = 'Contribution' | 'SupporterPlus' | 'OneOff';

// ToDo: fetch this in a way that isn't hardcoded
export const threeTierChoiceCardAmounts = {
	GBPCountries: {
		Contribution: 4,
		SupporterPlus: 12,
		OneOff: 0,
	},
	UnitedStates: {
		Contribution: 5,
		SupporterPlus: 15,
		OneOff: 0,
	},
	AUDCountries: {
		Contribution: 10,
		SupporterPlus: 20,
		OneOff: 0,
	},
	EURCountries: {
		Contribution: 4,
		SupporterPlus: 12,
		OneOff: 0,
	},
	NZDCountries: {
		Contribution: 10,
		SupporterPlus: 20,
		OneOff: 0,
	},
	Canada: {
		Contribution: 5,
		SupporterPlus: 15,
		OneOff: 0,
	},
	International: {
		Contribution: 3,
		SupporterPlus: 15,
		OneOff: 0,
	},
} as const satisfies Record<CountryGroupId, Record<SupportTier, number>>;
