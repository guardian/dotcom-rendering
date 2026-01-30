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
			"Test measuring ad targeting from LiveRamp's identityLinkIdSystem module integration",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-02-30`,
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "fronts-and-curation-onward-journeys",
		description: "Testing the new Onward Journey component on all articles",
		owners: ["fronts.and.curation@guardian.co.uk"],
		expirationDate: `2026-02-25`,
		type: "client",
		status: "ON",
		audienceSize: 50 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
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
	},
	{
		name: "commercial-mobile-inline1-halfpage",
		description:
			"To measure impact (RPM) and CLS of adding halfPage as an additional size option to mobile inline1 ad slot",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-02-28`,
		type: "client",
		status: "ON",
		audienceSize: 20 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
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
