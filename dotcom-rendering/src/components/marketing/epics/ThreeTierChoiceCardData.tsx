import { isUndefined } from '@guardian/libs';
import type { ChoiceInfo } from './ThreeTierChoiceCards';

export const ChoiceCardTestData_REGULAR = (
	longerBenefits: boolean,
	isDiscountActive: boolean,
): ChoiceInfo[] => [
	{
		supportTier: 'Contribution',
		label: (amount: number, currencySymbol: string): string =>
			isDiscountActive
				? `Support ${currencySymbol}${amount}/year`
				: `Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: () => [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'SupporterPlus',
		label: (
			amount: number,
			currencySymbol: string,
			discount?: number,
		): JSX.Element | string => {
			if (!isUndefined(discount)) {
				return (
					<>
						Support{' '}
						<s>
							{currencySymbol}
							{amount}
						</s>{' '}
						{currencySymbol}
						{amount * (1 - discount)}/year{' '}
					</>
				);
			} else {
				return `Support ${currencySymbol}${amount}/month`;
			}
		},
		benefitsLabel: 'All-access digital',
		benefits: () =>
			longerBenefits
				? fullSupporterPlusBenefits
				: shorterSupporterPlusBenefits,
		recommended: true,
	},
	{
		supportTier: 'OneOff',
		label: (): string => 'Support with another amount',
		benefitsLabel: undefined,
		benefits: () => ['We welcome support of any size, any time'],
		recommended: false,
	},
];

export const ChoiceCardTestData_US = (
	longerBenefits: boolean,
	isDiscountActive: boolean,
): ChoiceInfo[] => [
	{
		supportTier: 'Contribution',
		label: (amount: number, currencySymbol: string): string =>
			isDiscountActive
				? `Support ${currencySymbol}${amount}/year`
				: `Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: () => [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'SupporterPlus',
		label: (
			amount: number,
			currencySymbol: string,
			discount?: number,
		): JSX.Element | string => {
			if (!isUndefined(discount)) {
				return (
					<>
						Support{' '}
						<s>
							{currencySymbol}
							{amount}
						</s>{' '}
						{currencySymbol}
						{amount * (1 - discount)}/year{' '}
					</>
				);
			} else {
				return `Support ${currencySymbol}${amount}/month`;
			}
		},
		benefitsLabel: 'All-access digital',
		benefits: () =>
			longerBenefits
				? fullSupporterPlusBenefits
				: shorterSupporterPlusBenefits,
		recommended: true,
	},
	{
		supportTier: 'OneOff',
		label: (amount: number, currencySymbol: string): string =>
			`Support once from just ${currencySymbol}1`,
		benefitsLabel: undefined,
		benefits: (currencySymbol: string) => [
			`We welcome support of any size, any time - whether you choose to give ${currencySymbol}1 or more`,
		],
		recommended: false,
	},
];

const fullSupporterPlusBenefits = [
	'Unlimited access to the Guardian app',
	'Unlimited access to our new Feast App',
	'Ad-free reading on all your devices',
	'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
	'Far fewer asks for support',
];

const shorterSupporterPlusBenefits = [
	'Unlimited access to the Guardian app and Feast app',
	'Ad-free reading on all your devices',
	'Exclusive supporter newsletter',
];
