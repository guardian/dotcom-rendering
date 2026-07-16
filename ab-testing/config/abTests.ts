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
	{
		name: "commercial-mobile-sticky-liveblog-us",
		description:
			"Holdback test, where variant is the 'holdback' group, to measure uplift in adding the mobile-sticky slot for Liveblogs articles in the US.",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-07-22",
		type: "client",
		status: "ON",
		audienceSize: 5 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-teads-prebid",
		description:
			"Test to measure the impact of adding Teads as a bidder in prebid .",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-06-11",
		type: "client",
		status: "OFF",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-ozone-outstream",
		description: "A test to ensure correct integration of Ozone outstream.",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-09-23",
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "newsletters-in-article-signup-preview",
		description:
			"Test in-article newsletter signup with illustrated preview CTA vs without preview CTA",
		owners: ["newsletters.dev@guardian.co.uk"],
		expirationDate: "2026-07-21",
		type: "client",
		status: "ON",
		audienceSize: 50 / 100,
		audienceSpace: "A",
		groups: ["illustrated", "without-preview"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-loop-click-through",
		description:
			"Test impact of click to article via loop videos on fronts",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-07-19",
		type: "server",
		audienceSize: 5 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-click-to-play",
		description: "Test click to play longform videos vs autoplay",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "OFF",
		expirationDate: "2026-07-28",
		type: "server",
		audienceSize: 0 / 100,
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "martech-admiral-adblock",
		description:
			"Control group for Admiral ad blocker - runs the detection script but does not show the modal",
		owners: ["martech.dev@guardian.co.uk"],
		expirationDate: "2027-01-21",
		type: "client",
		status: "ON",
		audienceSize: 20 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "feast-recipe-nudge-v2",
		description:
			"Measures the impact of showing the Feast contextual nudge on recipe article pages",
		owners: ["feast@theguardian.com"],
		status: "ON",
		expirationDate: "2027-01-01",
		type: "client",
		audienceSize: 1,
		audienceSpace: "B",
		groups: ["control", "variant-1"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "webx-monitor-group-contamination",
		description:
			"Test to measure the impact of contamination between groups in ab tests",
		owners: ["dotcom.platform@theguardian.com"],
		status: "ON",
		expirationDate: "2026-08-31",
		type: "client",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
