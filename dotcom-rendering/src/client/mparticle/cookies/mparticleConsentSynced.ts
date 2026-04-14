import { getCookie, setCookie } from '@guardian/libs';

// Persistent cookie (1 year): stores the fingerprint of the last *successful* PATCH.
// Format: "signed-in:{true|false}" or "anonymous:{true|false}"
export const MPARTICLE_LAST_SYNCED_COOKIE = 'gu_mparticle_last_synced';

// Session cookie (no TTL): records that we already attempted a PATCH for this fingerprint
// in the current session, so failed calls are retried at most once per session.
export const MPARTICLE_SESSION_ATTEMPTED_COOKIE =
	'gu_mparticle_session_attempted';

export const buildFingerprint = (
	consented: boolean,
	isSignedIn: boolean,
): string => `${isSignedIn ? 'signed-in' : 'anonymous'}:${consented}`;

/**
 * Returns true when the current consent + auth state differs from what was
 * last successfully PATCHed, meaning a fresh sync is required.
 */
export const mparticleConsentNeedsSync = (
	consented: boolean,
	isSignedIn: boolean,
): boolean => {
	const lastSynced = getCookie({ name: MPARTICLE_LAST_SYNCED_COOKIE });
	return lastSynced !== buildFingerprint(consented, isSignedIn);
};

/**
 * Returns true when we already attempted a PATCH for this fingerprint in the
 * current browser session (caps retries to once per session on failure).
 */
export const sessionAttemptExists = (fingerprint: string): boolean =>
	getCookie({ name: MPARTICLE_SESSION_ATTEMPTED_COOKIE }) === fingerprint;

/** Mark that we attempted a PATCH for this fingerprint in the current session. */
export const markSessionAttempt = (fingerprint: string): void => {
	setCookie({
		name: MPARTICLE_SESSION_ATTEMPTED_COOKIE,
		value: fingerprint,
		// No daysToLive → session cookie; cleared when the browser tab closes
	});
};

/** Record a successful sync so future page loads in the same state are skipped. */
export const markMparticleConsentSynced = (
	consented: boolean,
	isSignedIn: boolean,
): void => {
	setCookie({
		name: MPARTICLE_LAST_SYNCED_COOKIE,
		value: buildFingerprint(consented, isSignedIn),
		daysToLive: 365,
	});
};
