import { ABTest } from './types';

const ABTests: ABTest[] = [
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
		controlGroup: { id: 'control-1', size: 0.9 },
		variantGroups: [{ id: 'variant-1', size: 0.1 }],
		offset: 0.1,
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
		controlGroup: { id: 'control', size: 0.5 },
		variantGroups: [{ id: 'variant', size: 0.5 }],
		offset: 0,
	},
];
