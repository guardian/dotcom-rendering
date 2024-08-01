export const ChoiceCardTestData_REGULAR = [
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: true,
	},
	{
		supportTier: 'other',
		label: (): string => 'Support with another amount',
		benefitsLabel: undefined,
		benefits: ['We welcome support of any size, any time'],
		recommended: false,
	},
];

export const ChoiceCardTestData_V1 = [
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: true,
	},
	{
		supportTier: 'other',
		label: (): string => 'Support just once from £1',
		benefitsLabel: undefined,
		benefits: [
			'We welcome support of any size, any time - whether you choose to give £1 or more',
		],
		recommended: false,
	},
];

export const ChoiceCardTestData_V2 = [
	{
		supportTier: 'other',
		label: (): string => 'Support just once from £1',
		benefitsLabel: undefined,
		benefits: [
			'We welcome support of any size, any time - whether you choose to give £1 or more',
		],
		recommended: false,
	},
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: false,
	},
];
