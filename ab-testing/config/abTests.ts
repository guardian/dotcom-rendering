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
		name: "webx-dark-mode-web",
		description: "Dark mode accessibility feature test on web",
		owners: ["dotcom.platform@theguardian.com"],
		status: "ON",
		expirationDate: "2027-04-09",
		type: "server",
		audienceSize: 0 / 100,
		groups: ["enable"],
		shouldForceMetricsCollection: false,
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
		name: "commercial-holdback-spacefinder-on-interactives",
		description:
			"Holdback proportion of the audience without new spacefinder logic on interactive pages",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-04-09",
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "holdback"],
		shouldForceMetricsCollection: true,
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
		audienceSize: 0 / 100,
		audienceSpace: "C",
		groups: ["control", "stacked", "carousel"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "growth-admiral-adblock-detect",
		description:
			"Control group for Admiral ad blocker - runs the detection script but does not show the modal",
		owners: ["growth.dev@guardian.co.uk"],
		expirationDate: "2027-01-21",
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["variant-detect"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-slim-homepage",
		description:
			"Test slimming content and placing Most Popular components on the right-hand side on the UK front.",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-04-28",
		type: "server",
		audienceSize: 15 / 100,
		audienceSpace: "A",
		groups: ["control", "variant-one", "variant-two"],
		shouldForceMetricsCollection: false,
		shouldReportToOphan: () => window.innerWidth >= 1300,
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
	{
		name: "fronts-and-curation-tag-page-storylines",
		description:
			"Testing the AI generated storylines component on tag pages",
		owners: ["fronts.and.curation@guardian.co.uk"],
		expirationDate: `2026-03-31`,
		type: "server",
		status: "ON",
		audienceSize: 50 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-hosted-content",
		description: "Preview the Hosted Content pages using dotcom-rendering",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-07-01",
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["preview"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-loading-userids-async",
		description:
			"Testing whether the asynchronous loading of userIds will alleviate any potential blocking of downstream functions",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-03-27",
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "growth-auxia-banner",
		description: "Use Auxia API for deciding when to show a RR banner",
		owners: ["growth.dev@guardian.co.uk"],
		expirationDate: "2026-09-01",
		type: "client",
		status: "ON",
		audienceSize: 1,
		audienceSpace: "C",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
