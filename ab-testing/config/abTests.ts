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
		expirationDate: "2026-03-10",
		type: "client",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-user-module-liveramp",
		description:
			"Hold-back test measuring ad targeting from liveramp's identityLinkIdSystem module integration",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-01-30`,
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "fronts-and-curation-personalised-container",
		description: "Testing the a personalised container component on fronts",
		owners: ["fronts.and.curation@guardian.co.uk"],
		expirationDate: `2026-02-22`,
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "webex-football-redesign",
		description: "Testing the Redesign for the football pages",
		owners: ["dotcom.platform@theguardian.com"],
		expirationDate: `2026-02-28`,
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-enable-spacefinder-on-interactives",
		description: "Enable spacefinder on interactive articles on mobile web",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-02-28`,
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["true"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "webex-preferred-source",
		description:
			"Testing the Preferred Source on Google button in the meta section of articles",
		owners: ["dotcom.platform@theguardian.com"],
		expirationDate: "2026-02-25",
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "prefer", "add"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "thefilter-at-a-glance-redesign",
		description:
			"Testing redesigned at a glance component on The Filter articles",
		owners: ["thefilter.dev@guardian.co.uk"],
		expirationDate: "2026-02-25",
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "stacked", "carousel"],
		shouldForceMetricsCollection: false,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
