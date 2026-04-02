import { getCookie, setCookie } from '@guardian/libs';

export const MPARTICLE_CONSENT_SYNCED_COOKIE = 'gu_mparticle_consent_synced';

// Re-sync at most once per 30 minutes
const EXPIRY_MINUTES = 30;
const EXPIRY_DAYS = EXPIRY_MINUTES / (60 * 24);

export const mparticleConsentNeedsSync = (): boolean => {
	const cookieValue = getCookie({ name: MPARTICLE_CONSENT_SYNCED_COOKIE });
	if (!cookieValue) return true;
	const expiryTime = parseInt(cookieValue, 10);
	return Date.now() >= expiryTime;
};

export const markMparticleConsentSynced = (): void => {
	const expiryMs = Date.now() + EXPIRY_MINUTES * 60 * 1000;
	setCookie({
		name: MPARTICLE_CONSENT_SYNCED_COOKIE,
		value: String(expiryMs),
		daysToLive: EXPIRY_DAYS,
	});
};
