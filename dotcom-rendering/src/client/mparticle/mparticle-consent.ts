import { getCookie, getConsentFor, onConsentChange } from '@guardian/libs';
import type { VendorName } from '@guardian/libs';
import { getAuthStatus } from '../../lib/identity';
import {
	mparticleConsentNeedsSync,
	markMparticleConsentSynced,
} from './cookies/mparticleConsentSynced';
import { syncConsentToMparticle } from './mparticleConsentApi';

// TODO: bump @guardian/libs to the version that includes csnx PR #2347, then:
// - remove the `as VendorName` cast below
// - replace with: export const MPARTICLE_CONSENT_PURPOSE: VendorName = 'mparticle';
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
