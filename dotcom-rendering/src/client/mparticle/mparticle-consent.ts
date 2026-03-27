import { getCookie, getConsentFor, onConsentChange } from '@guardian/libs';
import type { VendorName } from '@guardian/libs';
import { getAuthStatus } from '../../lib/identity';
import {
	mparticleConsentNeedsSync,
	markMparticleConsentSynced,
} from './cookies/mparticleConsentSynced';
import { syncConsentToMparticle } from './mparticleConsentApi';

// TODO: confirm the exact GDPR purpose name with Data Privacy / MRR.
// TODO: 'mparticle' must also be added to VendorIDs in @guardian/libs (csnx repo)
// before this cast can be removed.
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
