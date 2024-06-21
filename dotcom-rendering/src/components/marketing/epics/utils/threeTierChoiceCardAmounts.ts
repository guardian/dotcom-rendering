export type SupportCurrencyIso =
	| 'GBP'
	| 'USD'
	| 'AUD'
	| 'EUR'
	| 'NZD'
	| 'CAD'
	| 'international';

export type SupportTier = 'support' | 'allAccess' | 'other';

export const threeTierChoiceCardAmounts = {
	GBP: {
		support: 4,
		allAccess: 10,
		other: 0,
	},
	USD: {
		support: 5,
		allAccess: 13,
		other: 0,
	},
	AUD: {
		support: 10,
		allAccess: 17,
		other: 0,
	},
	EUR: {
		support: 4,
		allAccess: 10,
		other: 0,
	},
	NZD: {
		support: 10,
		allAccess: 17,
		other: 0,
	},
	CAD: {
		support: 5,
		allAccess: 13,
		other: 0,
	},
	international: {
		support: 3,
		allAccess: 13,
		other: 0,
	},
} as const satisfies Record<SupportCurrencyIso, Record<SupportTier, number>>;
