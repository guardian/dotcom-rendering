import { ABTest } from './types.ts';

/**
 * Tests are defined here. They will be assigned mvt ranges based on their index in the array, the
 * size of the test and the number of groups.
 *
 * For 100% tests to run concurrently with other tests, they should be assigned to different
 * test spaces. This means that some users will be in multiple tests at the same time.
 *
 * Example:
 * [Space A]
 * - 20% Test	control		MVT 0-99
 * - 20% Test	variant		MVT 100-199
 * - 50% Test	control		MVT 200-449
 * - 50% Test	variant		MVT 450-699
 *
 * [Space B]
 * - 100% Test	control		MVT 0-499
 * - 100% Test	variant		MVT 500-999
 */

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
		audienceSize: 10 / 100,
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
		audienceSize: 20 / 100,
		audienceOffset: 10,
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
		audienceSize: 100 / 100,
		groups: ['control', 'variant'],
		audienceSpace: 1,
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
		audienceSize: 10 / 100,
		audienceOffset: 30,
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
		audienceSize: 10 / 100,
		audienceOffset: 40,
		groups: ['control', 'variant'],
	},
]
