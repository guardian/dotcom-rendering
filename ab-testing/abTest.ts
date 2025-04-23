import { ABTest } from './types.ts';

export const ABTests: ABTest[] = [
	// Example client side AB test definition
	{
		name: 'commercial-ad-block-ask',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-05-31'),
		type: 'client',
		highImpact: false,
		groups: [
			{ id: 'control', size: 5 / 100 },
			{ id: 'variant', size: 5 / 100 },
		],
	},
	// Example server side AB test definition
	{
		name: 'webex-europe-beta-front',
		description:
			'Allows viewing the beta version of the Europe network front',
		owners: [
			'project.fairground@theguardian.com',
			'dotcom.platform@theguardian.com',
		],
		status: 'ON',
		expirationDate: new Date('2025-04-02'),
		type: 'server',
		highImpact: false,
		groups: [
			{ id: 'control', size: 50 / 100 },
			{ id: 'variant', size: 50 / 100 },
		],
		allowOverlap: true,
	},
];
