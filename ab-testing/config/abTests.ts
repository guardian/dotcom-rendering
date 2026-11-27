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
		owners: ["martech.dev@guardian.co.uk"],
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
		owners: ["martech.dev@guardian.co.uk"],
		expirationDate: "2026-12-01",
		type: "client",
		status: "ON",
		audienceSize: 1,
		audienceSpace: "C",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-ozone-hashed-email",
		description:
			"Pass hashed email to Ozone via pubProvidedId for audience matching",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "OFF",
		expirationDate: "2027-01-19",
		type: "client",
		audienceSize: 0,
		audienceSpace: "A",
		groups: ["control", "variant"],
	},
	{
		name: "commercial-ozone-au-nz-adunit-ids",
		description: "0% test to prove ad units for Ozone in Aus and NZ",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "OFF",
		expirationDate: "2027-01-19",
		type: "client",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
	},
	{
		name: "martech-admiral-adblock",
		description:
			"Control group for Admiral ad blocker - runs the detection script but does not show the modal",
		owners: ["martech.dev@guardian.co.uk"],
		expirationDate: "2027-01-21",
		type: "client",
		status: "OFF",
		audienceSize: 20 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "webx-monitor-group-contamination-v3",
		description:
			"V3 of test to measure the impact of contamination between groups in ab tests",
		owners: ["commercial.dev@theguardian.com"],
		status: "ON",
		expirationDate: "2026-12-01",
		type: "client",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	/**
	 * Puzzles & Games rollout, tier v3: premium puzzles.
	 *
	 * Only takes effect when the Puzzles & Games hub is available for the
	 * reader’s edition.
	 *
	 * This tier activates the premium puzzles access control on
	 * the Puzzle Page: puzzles older than 7 days need a Supporter Plus or
	 * Digital Pack subscription, and readers without one see the "unlock
	 * premium puzzles" modal instead of the game. The access check, the modal,
	 * and removing ads from premium puzzles all depend on it, so with this
	 * tier off every puzzle behaves as a free one, whatever `frontend` sends.
	 *
	 * To roll back without a deploy: flip this test's `audienceSize` to
	 * `0 / 100` (or `status` to `"OFF"`).
	 */
	{
		name: "puzzles-new-hub-v3",
		description:
			"Rollout of the premium puzzles access control (modal for puzzles older than 7 days), on top of the edition-gated Puzzles & Games hub",
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
		name: "fronts-and-curation-card-mini-nav",
		description: "Opt-in preview of mini subnavs on front cards",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-12-16",
		type: "server",
		audienceSize: 0 / 100,
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "fronts-and-curation-card-naza-thrasher",
		description: "Opt-in preview of NAZA thrasher on fronts",
		owners: ["fronts.and.curation@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-12-16",
		type: "server",
		audienceSize: 0 / 100,
		groups: ["show-thrasher"],
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
		audienceSize: 100 / 100,
		audienceSpace: "E",
		groups: ["a", "b"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-prebid-failsafe-timeout",
		description: "Testing wrapping Prebid in a failsafe timeout",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-01-19",
		type: "client",
		status: "ON",
		audienceSize: 15 / 100,
		audienceSpace: "B",
		groups: [
			"control",
			"variant-one", // Failsafe set at 3_000ms
			"variant-two", // Failsafe set at 4_000ms
		],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-mobile-above-nav-test",
		description: "Test adding the mobile-above-nav ad slot to mobile pages",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-11-30",
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "B",
		groups: ["control", "variant", "variant2"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-rich-links",
		description:
			"Test to measure the impact of fixing rich links insert behaviour and reduced restrictions on ad insertion around rich links.",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-01-19",
		type: "client",
		status: "OFF",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-article-end-header-bidding",
		description:
			"Test opening up the article-end ad slot in the US region for HeaderBidding",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-01-19",
		type: "client",
		status: "OFF",
		audienceSize: 40 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-spacefinder-highvalue-sections-set2",
		description:
			"Test to measure the impact on ad density after adding to high value sections in spacefinder globally excluding AUS and NZ",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-01-19",
		type: "client",
		status: "OFF",
		audienceSize: 100 / 100,
		audienceSpace: "D",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-spacefinder-highvalue-sections-aus-nz",
		description:
			"Test the impact on ad density of regionalising Spacefinder for high value sections in Australia and New Zealand",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-11-19",
		type: "client",
		status: "ON",
		audienceSize: 10 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-next-best-action",
		description: "Next Best Action Features",
		owners: ["commercial.dev@guardian.co.uk", "martech.dev@guardian.co.uk"],
		expirationDate: "2027-01-06",
		type: "client",
		status: "ON",
		audienceSize: 0,
		groups: ["enable"],
	},
	{
		name: "commercial-doubleVerify-ad-filter",
		description: "Double Verify Ad filter for the US",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-12-16",
		type: "client",
		status: "ON",
		audienceSize: 5 / 100,
		groups: ["control", "variant"],
	},
	{
		name: "newsroom-ai-tag-page-storylines",
		description:
			"Testing the AI generated storylines component on tag pages",
		owners: ["ai.dev@guardian.co.uk"],
		expirationDate: `2026-11-30`,
		type: "server",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-iab-taxonomy",
		description:
			"Test the impact of using IAB Taxonomy tags for ad targeting",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2027-01-27",
		type: "client",
		status: "ON",
		audienceSize: 0,
		audienceSpace: "A",
		groups: ["control", "variant-primary", "variant-primary-secondary"],
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
