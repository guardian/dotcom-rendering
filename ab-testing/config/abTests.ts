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
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "growth-auxia-banner",
		description: "Use Auxia API for deciding when to show a RR banner",
		owners: ["growth.dev@guardian.co.uk"],
		expirationDate: "2026-12-01",
		type: "client",
		status: "ON",
		audienceSize: 1,
		audienceSpace: "C",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-prebid-price-floor-holdback",
		description:
			"This test will be the 5% holdback group for the prebid price floor",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-07-16",
		type: "client",
		status: "OFF",
		audienceSize: 5 / 100,
		audienceSpace: "A",
		groups: ["holdback"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-fronts-ad-increase-ad-limit",
		description:
			"A test to understand the impact of changing page-level ad limit on fronts",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-09-10",
		type: "server",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-spacefinder-highvalue-section",
		description:
			"Test to measure the impact on ad density after adding to high value sections in spacefinder",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-09-01",
		type: "client",
		status: "OFF",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-ozone-hashed-email",
		description:
			"Pass hashed email to Ozone via pubProvidedId for audience matching",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-09-30",
		type: "client",
		audienceSize: 0,
		audienceSpace: "A",
		groups: ["control", "variant"],
	},
	{
		name: "fronts-and-curation-loop-click-through",
		description:
			"Test impact of click to article via loop videos on fronts",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-09-19",
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
		expirationDate: "2026-09-28",
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
		name: "webx-monitor-group-contamination-v2",
		description:
			"V2 of test to measure the impact of contamination between groups in ab tests",
		owners: ["dotcom.platform@theguardian.com"],
		status: "ON",
		expirationDate: "2026-09-30",
		type: "client",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "puzzles-new-hub",
		description: "Rollout of the new Puzzles Hub experience",
		owners: ["puzzles.team@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-12-31",
		type: "server",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-prebid-transaction-ids",
		description:
			"Test to measure the impact of submitting Prebid transaction IDs",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-09-30",
		type: "client",
		status: "ON",
		audienceSize: 50 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "identity-and-trust-consent-rr-banner-us",
		description:
			"Test to measure the impact of not showing the consent RR and banner for US users",
		owners: ["identitydev@theguardian.com", "martech.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-12-01",
		type: "client",
		audienceSize: 100 / 100,
		audienceSpace: "D",
		groups: ["control", "variant-1", "variant-2"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-editorial-test",
		description: "Allow editorial A/B tests to run on web",
		owners: [
			"fronts.and.curation@guardian.co.uk",
			"ab.test.mission@guardian.co.uk",
		],
		status: "ON",
		expirationDate: "2036-08-12",
		type: "server",
		audienceSize: 25 / 100,
		groups: ["a", "b"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-prebid-failsafe-timeout",
		description: "Gradually roll out the Prebid failsafe timeout feature",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-09-30",
		type: "client",
		status: "ON",
		audienceSize: 1 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "articles-and-publishing-revamped-immersive-layout",
		description: "New grid-based immersive layout for all articles",
		owners: ["articles.and.publishing@guardian.co.uk "],
		status: "ON",
		expirationDate: "2027-08-31",
		type: "server",
		audienceSize: 0 / 100,
		groups: ["enable"],
		shouldForceMetricsCollection: false,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
