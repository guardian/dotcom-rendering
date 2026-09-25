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
		name: "martech-header-sign-in-header-optimisation",
		description: "Test removing the sign in wording from mobile",
		owners: ["martech.dev@guardian.co.uk"],
		status: "OFF",
		expirationDate: "2026-10-01",
		type: "client",
		audienceSize: 100 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},

	/**
	 * Puzzles & Games rollout, tier v0 (the master switch).
	 *
	 * Gates the baseline Puzzles & Games experience: the new Puzzles Hub
	 * page, and the 6 V0 puzzle pages (sudoku easy/medium/hard/killer,
	 * word-wheel, wordiply). At v0, there is no archive, no calendar, no
	 * progress indicators, no sign-in-to-track-progress prompt, no "more
	 * from puzzles" rail, and the hub's sub-nav has no links yet.
	 *
	 * This is the master switch for the whole Puzzles & Games experience:
	 * turning it off (or down to 0%) hides everything: the hub, the V0
	 * puzzle pages, and (by the cumulative design below) every later tier
	 * too, since v1/v2 only take effect when this is also enabled.
	 *
	 * See `puzzles-new-hub-v1`/`puzzles-new-hub-v2` below for the later
	 * rollout tiers, and `src/lib/puzzlesHubVersionExperiment.ts` /
	 * `src/lib/puzzlesHubExperiment.ts` in dotcom-rendering for the
	 * corresponding cumulative gate-check helpers
	 * (`isPuzzlesHubEnabled`/`isPuzzlesHubV1Enabled`/`isPuzzlesHubV2Enabled`).
	 */
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
	/**
	 * Puzzles & Games rollout, tier v1 (w/c 12 Oct launch).
	 *
	 * Only takes effect when `puzzles-new-hub` (v0) is ALSO enabled for the
	 * reader. This test does nothing on its own, by design, so the
	 * rollout can never end up in an inconsistent state (e.g. v1 features
	 * showing while the v0 baseline they build on is switched off).
	 *
	 * On top of v0, this tier activates: the full hub sub-nav links (to
	 * /word-games, /logic-puzzles, /trivia-and-quizzes), a
	 * sign-in-to-track-progress message, a calendar/archive view for
	 * crosswords/logic-puzzles/word-games (not Wordiply, which has no
	 * archive), progress indicators (Available/Completed), the "More from
	 * Puzzles & Games" related-content rail, newsletter signup, and
	 * changes to the existing crossword page (print CTA repositioning, a
	 * "play other puzzles" container).
	 *
	 * To roll back from v1 to v0 without a deploy: flip this test's
	 * `audienceSize` to `0 / 100` (or `status` to `"OFF"`) while leaving
	 * `puzzles-new-hub` untouched.
	 */
	{
		name: "puzzles-new-hub-v1",
		description:
			"Rollout of the v1 Puzzles & Games features (w/c 12 Oct), on top of the puzzles-new-hub v0 baseline",
		owners: ["puzzles.team@guardian.co.uk"],
		status: "ON",
		expirationDate: "2026-12-31",
		type: "server",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: false,
	},
	/**
	 * Puzzles & Games rollout, tier v2 (future, no launch date confirmed
	 * yet as of this writing).
	 *
	 * Only takes effect when BOTH `puzzles-new-hub` (v0) AND
	 * `puzzles-new-hub-v1` are ALSO enabled for the reader, same
	 * cumulative-by-design principle as v1 above, applied one tier further.
	 *
	 * On top of v0+v1, this tier activates: the On the Ball and Film Reveal
	 * iframe games (Trivia and Quizzes group), a "Most played" container,
	 * EventKit-driven navigation, migrating existing crossword pages onto
	 * the new Puzzle Page template, and search-engine mobile app nudges.
	 *
	 * Kept at 0% until that work begins; there is nothing to roll back yet.
	 */
	{
		name: "puzzles-new-hub-v2",
		description:
			"Rollout of the v2 Puzzles & Games features (no date confirmed yet), on top of the puzzles-new-hub/puzzles-new-hub-v1 baseline",
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
		audienceSize: 100 / 100,
		audienceSpace: "E",
		groups: ["a", "b"],
		shouldForceMetricsCollection: false,
	},
	{
		name: "commercial-prebid-failsafe-timeout",
		description: "Gradually roll out the Prebid failsafe timeout feature",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-10-28",
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
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
	{
		name: "commercial-mobile-above-nav-test",
		description: "Test adding the mobile-above-nav ad slot to mobile pages",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-10-30",
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
		expirationDate: "2026-10-28",
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "A",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-header-bidder-timeouts",
		description:
			"Test to measure the impact of changing the Prebid and APS timeout value.",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-10-28",
		type: "client",
		status: "ON",
		audienceSize: 2.1 / 100, // 0.35% in each variant
		audienceSpace: "A",
		groups: [
			"variant-500",
			"variant-750",
			"variant-1000",
			"variant-1250",
			"control", // 1500ms timeout
			"variant-1650",
		],
		shouldForceMetricsCollection: true,
	},
	{
		name: "commercial-article-end-header-bidding",
		description:
			"Test opening up the article-end ad slot in the US region for HeaderBidding",
		owners: ["commercial.dev@guardian.co.uk"],
		expirationDate: "2026-10-01",
		type: "client",
		status: "ON",
		audienceSize: 0 / 100,
		audienceSpace: "B",
		groups: ["control", "variant"],
		shouldForceMetricsCollection: true,
	},
];

const activeABtests = ABTests.filter((test) => test.status === "ON");

export { ABTests as allABTests, activeABtests };
