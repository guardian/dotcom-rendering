import { type CountryGroupId } from '@guardian/support-dotcom-components';

export type SupportTier = 'Contribution' | 'SupporterPlus' | 'OneOff';
export type SupportRatePlan = 'Monthly' | 'Annual';

// ToDo: fetch this in a way that isn't hardcoded
export const threeTierChoiceCardAmounts = {
	Monthly: {
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
	},
	Annual: {
		GBPCountries: {
			Contribution: 50,
			SupporterPlus: 120,
			OneOff: 0,
		},
		UnitedStates: {
			Contribution: 60,
			SupporterPlus: 150,
			OneOff: 0,
		},
		AUDCountries: {
			Contribution: 80,
			SupporterPlus: 200,
			OneOff: 0,
		},
		EURCountries: {
			Contribution: 50,
			SupporterPlus: 120,
			OneOff: 0,
		},
		NZDCountries: {
			Contribution: 80,
			SupporterPlus: 200,
			OneOff: 0,
		},
		Canada: {
			Contribution: 60,
			SupporterPlus: 150,
			OneOff: 0,
		},
		International: {
			Contribution: 30,
			SupporterPlus: 150,
			OneOff: 0,
		},
	},
} as const satisfies Record<
	SupportRatePlan,
	Record<CountryGroupId, Record<SupportTier, number>>
>;
