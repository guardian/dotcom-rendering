import { getConsentFor, getCookie, onConsentChange } from '@guardian/libs';
import type { VendorName } from '@guardian/libs';
import { getAuthStatus } from '../../lib/identity';
import {
	buildFingerprint,
	markMparticleConsentSynced,
	markSessionAttempt,
	mparticleConsentNeedsSync,
	sessionAttemptExists,
} from './cookies/mparticleConsentSynced';
import { syncConsentToMparticle } from './mparticleConsentApi';

// TODO: Remove cast once 'mparticle' is added to VendorIDs in @guardian/libs
export const MPARTICLE_CONSENT_PURPOSE: VendorName = 'mparticle';

export const syncMparticleConsent = (): void => {
	onConsentChange(async (state) => {
		// Fail fast: bwid is always required, available for all users
		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		if (!browserId) return;

		const authStatus = await getAuthStatus();
		const isSignedIn = authStatus.kind === 'SignedIn';
		const consented = getConsentFor(MPARTICLE_CONSENT_PURPOSE, state);
		const fingerprint = buildFingerprint(consented, isSignedIn);

		// Skip if the last successful PATCH recorded the same state
		if (!mparticleConsentNeedsSync(consented, isSignedIn)) return;

		// Skip if we already attempted this fingerprint in the current session
		// (prevents hammering the API on repeated page loads after a failed call)
		if (sessionAttemptExists(fingerprint)) return;

		// Record the attempt before the network call so a page unload mid-flight
		// doesn't cause an untracked retry on the very next load
		markSessionAttempt(fingerprint);

		const pageViewId = window.guardian.config.ophan.pageViewId;
		await syncConsentToMparticle(
			authStatus,
			browserId,
			consented,
			pageViewId,
		);

		// Only written on success; a failed call leaves gu_mparticle_last_synced
		// untouched so the next session will retry
		markMparticleConsentSynced(consented, isSignedIn);
	});
};
