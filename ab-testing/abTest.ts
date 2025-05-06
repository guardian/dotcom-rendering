import { ABTest } from './types.ts';

export const ABTests: ABTest[] = [
	// Example client side AB test definition
	{
		name: 'commercial-ad-block-ask',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-06-30'),
		type: 'client',
		highImpact: false,
		size: 10 / 100,
		groups: ['control', 'variant'],
	},
	{
		name: 'commercial-ad-block-ask-4',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-06-30'),
		type: 'client',
		highImpact: false,
		size: 20 / 100,
		groups: ['control', 'variant'],
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
		expirationDate: new Date('2025-06-02'),
		type: 'server',
		highImpact: false,
		size: 100 / 100,
		groups: ['control', 'variant'],
		testSpace: 'secondary',
	},
	{
		name: 'commercial-some-test-2',
		description:
			'Allows viewing the beta version of the Europe network front',
		owners: [
			'project.fairground@theguardian.com',
			'dotcom.platform@theguardian.com',
		],
		status: 'ON',
		expirationDate: new Date('2025-06-02'),
		type: 'server',
		highImpact: false,
		size: 10 / 100,
		groups: ['control', 'variant'],
	},
	{
		name: 'commercial-some-test',
		description:
			'Allows viewing the beta version of the Europe network front',
		owners: [
			'project.fairground@theguardian.com',
			'dotcom.platform@theguardian.com',
		],
		status: 'ON',
		expirationDate: new Date('2025-06-02'),
		type: 'server',
		highImpact: false,
		size: 10 / 100,
		groups: ['control', 'variant'],
	},
];
