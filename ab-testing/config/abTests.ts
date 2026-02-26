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
		expirationDate: `2026-03-04`,
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "webex-football-redesign",
		description: "Testing the Redesign for the football pages",
		owners: ["dotcom.platform@theguardian.com"],
		expirationDate: `2026-04-22`,
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
		expirationDate: `2026-03-14`,
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["true"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-mobile-inline1-halfpage",
		description:
			"To measure impact (RPM) and CLS of adding halfPage as an additional size option to mobile inline1 ad slot",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: `2026-02-28`,
		type: "client",
		status: "OFF",
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
		expirationDate: "2026-04-01",
		type: "server",
		status: "ON",
		audienceSize: 100 / 100,
		audienceSpace: "C",
		groups: ["control", "stacked", "carousel"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "growth-admiral-adblock-recovery",
		description: "Test Admiral ad blocker detection and recovery modal",
		owners: ["growth.dev@guardian.co.uk"],
		expirationDate: "2027-01-21",
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-slim-homepage",
		description:
			"Test placing the Most Viewed and Deeply Read components in the right-hand column on the homepage.",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "OFF",
		expirationDate: `2026-04-28`,
		type: "server",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "growth-holdback-group",
		description:
			"Test for 5% holdback group that does not qualify for any testing so long as the test is live in the RRCP",
		owners: ["growth.dev@guardian.co.uk"],
		expirationDate: "2027-01-01",
		type: "client",
		status: "ON",
		audienceSize: 5 / 100,
		audienceSpace: "A",
		groups: ["control"],
		shouldForceMetricsCollection: false,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
