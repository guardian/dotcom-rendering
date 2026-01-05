import type { ABTest } from "./types.ts";

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

const ABTests: ABTest[] = [
	{
		name: "commercial-prebid-v10",
		description: "Testing Prebid.js v10 integration on DCR",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-01-10",
		type: "client",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-user-module-ID5",
		description:
			"Tests whether we can get the users email, hash it and pass pd value to the userId array",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-01-15`,
		type: "client",
		status: "OFF",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-user-module-uid2",
		description:
			"A hold back test to measure the impact of integrating UID2 module",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-01-15`,
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
