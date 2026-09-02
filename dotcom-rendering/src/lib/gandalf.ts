import { storage } from '@guardian/libs';

// Gandalf: the Guardian-managed sign-in gate journey (marketing name).
//
// A 100% rollout, run entirely by Guardian rules with no Auxia involvement,
// currently live for New Zealand and extendable to further countries via the
// gandalfSignInGateCountries channel switch.
//
// A dedicated, persistent counter of completed eligible pageviews, kept per
// country because campaigns differ by country group. It is deliberately
// independent of `gu.history.dailyArticleCount` (which resets daily and only
// counts a subset of content types) and of `gate_display_count` (which counts
// gate renders, not pageviews).
//
// The counter is 0-based: it stores the number of eligible pageviews already
// completed for the country. The first three eligible pageviews (counts 0, 1,
// 2 sent to SDC) are free; from the fourth onwards SDC returns the
// non-dismissible popup.
//
// The counter only advances after SDC confirms the pageview was an active,
// eligible pageview for a Gandalf country (see the gandalfSignInGate response
// marker), so unlisted-country traffic and excluded pages never consume the
// allowance. It is browser-local: clearing storage or using a new/incognito
// browser resets the allowance. This is accepted for the proof of concept.

const pageViewCountKey = (countryCode: string): string =>
	`gu.gandalf.pageViewCount.${countryCode.toLowerCase()}`;

const lastCountedPageViewIdKey = (countryCode: string): string =>
	`gu.gandalf.lastCountedPageViewId.${countryCode.toLowerCase()}`;

/**
 * Returns the 0-based number of eligible pageviews already completed in the
 * given country. Fails safe to 0 if the stored value is missing or malformed.
 */
export const getGandalfPageViewCount = (countryCode: string): number => {
	const raw = storage.local.getRaw(pageViewCountKey(countryCode));
	const count = parseInt(raw ?? '', 10);
	return Number.isInteger(count) && count >= 0 ? count : 0;
};

/**
 * Records one completed eligible pageview for the country. Idempotent per
 * pageview ID, so React effect re-runs (e.g. Strict Mode) increment at most
 * once per pageview.
 */
export const incrementGandalfPageViewCount = (
	countryCode: string,
	pageViewId: string,
): void => {
	if (
		storage.local.getRaw(lastCountedPageViewIdKey(countryCode)) ===
		pageViewId
	) {
		return;
	}
	storage.local.setRaw(lastCountedPageViewIdKey(countryCode), pageViewId);
	const count = getGandalfPageViewCount(countryCode);
	storage.local.setRaw(pageViewCountKey(countryCode), (count + 1).toString());
};
