import { storage } from '@guardian/libs';

// localStorage key: stores the fingerprint of the last *successful* PATCH.
// Format: "signed-in:{true|false}" or "anonymous:{true|false}"
const MPARTICLE_LAST_SYNCED_KEY = 'gu.mparticle.lastSynced';

// sessionStorage key: records that we already attempted a PATCH for this fingerprint
// in the current session, so failed calls are retried at most once per session.
const MPARTICLE_SESSION_ATTEMPTED_KEY = 'gu.mparticle.sessionAttempted';

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
	const lastSynced = storage.local.getRaw(MPARTICLE_LAST_SYNCED_KEY);
	return lastSynced !== buildFingerprint(consented, isSignedIn);
};

/**
 * Returns true when we already attempted a PATCH for this fingerprint in the
 * current browser session (caps retries to once per session on failure).
 */
export const sessionAttemptExists = (fingerprint: string): boolean =>
	storage.session.getRaw(MPARTICLE_SESSION_ATTEMPTED_KEY) === fingerprint;

/** Mark that we attempted a PATCH for this fingerprint in the current session. */
export const markSessionAttempt = (fingerprint: string): void => {
	storage.session.setRaw(MPARTICLE_SESSION_ATTEMPTED_KEY, fingerprint);
};

/** Record a successful sync so future page loads in the same state are skipped. */
export const markMparticleConsentSynced = (
	consented: boolean,
	isSignedIn: boolean,
): void => {
	storage.local.setRaw(
		MPARTICLE_LAST_SYNCED_KEY,
		buildFingerprint(consented, isSignedIn),
	);
};
