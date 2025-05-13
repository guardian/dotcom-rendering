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
			benefitsLabel: 'Unlock <strong>Support</strong> benefits:',
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
			benefitsLabel: 'Unlock Support benefits:',
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
