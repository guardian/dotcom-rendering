import type { ChoiceCardsSettings } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';

export const choiceCardsSettings: ChoiceCardsSettings = {
	choiceCards: [
		{
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			label: 'Support £5/month',
			isDefault: false,
			benefits: [
				{
					copy: 'Give to the Guardian every month with Support',
				},
			],
		},
		{
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Monthly',
			},
			label: 'Support £12/month',
			isDefault: true,
			benefitsLabel:
				'Unlock <strong>All-access digital</strong> benefits:',
			benefits: [
				{
					copy: '<strong>Unlimited</strong> access to the Guardian app',
				},
				{ copy: 'Unlimited access to our new Feast App' },
				{ copy: 'Ad-free reading on all your devices' },
				{
					copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
				},
				{ copy: 'Far fewer asks for support' },
			],
			pill: {
				copy: 'Recommended',
			},
		},
		{
			product: {
				supportTier: 'OneOff',
			},
			label: `Support with another amount`,
			isDefault: false,
			benefits: [
				{
					copy: 'We welcome support of any size, any time',
				},
			],
		},
	],
	mobileChoiceCards: [
		{
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			label: 'Support £5/month',
			isDefault: false,
			benefits: [
				{
					copy: 'Give to the Guardian every month with Support',
				},
			],
		},
		{
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Monthly',
			},
			label: 'Support £12/month',
			isDefault: true,
			benefitsLabel: 'Unlock All-access digital benefits:',
			benefits: [
				{ copy: 'Unlimited access to the Guardian app' },
				{ copy: 'Unlimited access to our new Feast App' },
			],
			pill: {
				copy: 'Recommended',
			},
		},
		{
			product: {
				supportTier: 'OneOff',
			},
			label: `Support with another amount`,
			isDefault: false,
			benefits: [
				{
					copy: 'We welcome support of any size, any time',
				},
			],
		},
	],
};

export const choiceCardsWithDestinationUrl: ChoiceCardsSettings = {
	choiceCards: [
		{
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			label: 'Support £5/month',
			isDefault: false,
			destinationUrl:
				'https://support.theguardian.com/contribute/monthly?custom-destination=contribution',
			benefits: [
				{
					copy: 'Give to the Guardian every month with Support',
				},
			],
		},
		{
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Monthly',
			},
			label: 'Support £12/month',
			isDefault: true,
			destinationUrl:
				'https://support.theguardian.com/subscribe/monthly?custom-destination=supporter-plus',
			benefitsLabel:
				'Unlock <strong>All-access digital</strong> benefits:',
			benefits: [
				{
					copy: '<strong>Unlimited</strong> access to the Guardian app',
				},
				{ copy: 'Unlimited access to our new Feast App' },
				{ copy: 'Ad-free reading on all your devices' },
				{
					copy: 'Exclusive newsletters for subscribers',
				},
			],
		},
		{
			product: {
				supportTier: 'OneOff',
			},
			label: 'One-time support',
			isDefault: false,
			destinationUrl:
				'https://support.theguardian.com/contribute/one-time?custom-destination=one-off',
			benefits: [
				{
					copy: 'Support the Guardian with a one-time contribution',
				},
			],
		},
	],
};

export const choiceCardsWithDestinationUrlTwoCards: ChoiceCardsSettings = {
	choiceCards: [
		{
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			label: 'Support £5/month',
			isDefault: false,
			destinationUrl: null,
			benefits: [
				{
					copy: 'Give to the Guardian every month with Support',
				},
			],
		},
		{
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Monthly',
			},
			label: 'Support £12/month',
			isDefault: true,
			destinationUrl:
				'https://support.theguardian.com/subscribe/monthly?custom-destination=supporter-plus',
			benefitsLabel:
				'Unlock <strong>All-access digital</strong> benefits:',
			benefits: [
				{
					copy: '<strong>Unlimited</strong> access to the Guardian app',
				},
				{ copy: 'Unlimited access to our new Feast App' },
				{ copy: 'Ad-free reading on all your devices' },
				{
					copy: 'Exclusive newsletters for subscribers',
				},
			],
		},
		{
			product: {
				supportTier: 'OneOff',
			},
			label: 'One-time support',
			isDefault: false,
			destinationUrl:
				'https://support.theguardian.com/contribute/one-time?custom-destination=one-off',
			benefits: [
				{
					copy: 'Support the Guardian with a one-time contribution',
				},
			],
		},
	],
};
