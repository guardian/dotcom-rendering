import { ABTest } from './types.ts';

/**
 * Tests are defined here. They will be assigned mvt ranges based on the
 * size of the test and the number of groups, these ranges may not be contiguous.
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
	// Sample tests that will be used for testing the AB testing framework
	{
		name: 'commercial-client-side-test',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: '2050-12-30',
		type: 'client',
		audienceSize: 0 / 100,
		groups: ['control', 'variant'],
	},
	{
		name: 'commercial-server-side-test',
		description:
			'Show new ad block ask component in ad slots when we detect ad blocker usage',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: '2050-12-30',
		type: 'server',
		audienceSize: 0 / 100,
		groups: ['control', 'variant'],
	},
];
