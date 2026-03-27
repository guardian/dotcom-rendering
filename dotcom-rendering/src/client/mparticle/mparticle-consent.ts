import { getCookie, getConsentFor, onConsentChange } from '@guardian/libs';
import type { VendorName } from '@guardian/libs';
import { getAuthStatus } from '../../lib/identity';
import {
	mparticleConsentNeedsSync,
	markMparticleConsentSynced,
} from './cookies/mparticleConsentSynced';
import { syncConsentToMparticle } from './mparticleConsentApi';

// TODO: confirm the exact key name with Data Privacy / MRR (currently using 'mparticle').
// TODO: once the csnx PR adds mparticle: ['62470f577e1e3605d5bc0b8a'] to VendorIDs
// and @guardian/libs is bumped here, remove the `as VendorName` cast.
export const MPARTICLE_CONSENT_PURPOSE = 'mparticle' as VendorName;

export const syncMparticleConsent = (): void => {
	onConsentChange(async (state) => {
		if (!mparticleConsentNeedsSync()) return;

		const authStatus = await getAuthStatus();
		if (authStatus.kind !== 'SignedIn') return;

		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		if (!browserId) return;

		const pageViewId = window.guardian.config.ophan.pageViewId;
		const consented = getConsentFor(MPARTICLE_CONSENT_PURPOSE, state);

		await syncConsentToMparticle(
			authStatus,
			browserId,
			consented,
			pageViewId,
		);
		markMparticleConsentSynced();
	});
};
