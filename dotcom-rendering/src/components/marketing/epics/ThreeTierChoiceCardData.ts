import type { ChoiceInfo } from './ThreeTierChoiceCards';

export const ChoiceCardTestData_REGULAR: ChoiceInfo[] = [
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: () => [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: () => [
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
		benefits: () => ['We welcome support of any size, any time'],
		recommended: false,
	},
];

export const ChoiceCardTestData_V1: ChoiceInfo[] = [
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: () => [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: () => [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: true,
	},
	{
		supportTier: 'other',
		label: (amount: number, currencySymbol: string): string =>
			`Support once from just ${currencySymbol}1`,
		benefitsLabel: undefined,
		benefits: (currencySymbol: string) => [
			`We welcome support of any size, any time - whether you choose to give ${currencySymbol}1 or more`,
		],
		recommended: false,
	},
];

export const ChoiceCardTestData_V2: ChoiceInfo[] = [
	{
		supportTier: 'other',
		label: (amount: number, currencySymbol: string): string =>
			`Support once from just ${currencySymbol}1`,
		benefitsLabel: undefined,
		benefits: (currencySymbol: string) => [
			`We welcome support of any size, any time - whether you choose to give ${currencySymbol}1 or more`,
		],
		recommended: false,
	},
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: () => [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string): string =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: () => [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: false,
	},
];
