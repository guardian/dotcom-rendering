import { onConsent } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';

/**
 * This local storage item is used to target ads if a user has the correct consents
 */
const AlreadyVisitedKey = 'gu.alreadyVisited';

// Matches consents in the Commercial repo: https://github.com/guardian/commercial/blob/16c4358c727e7a5bdbd4e85aea8a08ac3aa80c0b/src/core/targeting/personalised.ts#L125
const hasConsentForAlreadyVisitedCount = (
	consentState: ConsentState,
): boolean => {
	if (consentState.tcfv2) {
		if (consentState.tcfv2.consents['1']) return true;
	}
	if (consentState.ccpa) {
		if (!consentState.ccpa.doNotSell) return true;
	}
	if (consentState.aus) {
		if (consentState.aus.personalisedAdvertising) return true;
	}
	return false;
};

const getAlreadyVisitedCount = (): number => {
	const alreadyVisited = parseInt(
		localStorage.getItem(AlreadyVisitedKey) ?? '',
		10,
	);
	return !Number.isNaN(alreadyVisited) ? alreadyVisited : 0;
};

const setAlreadyVisited = (count: number): void => {
	localStorage.setItem(AlreadyVisitedKey, count.toString());
};

export const incrementAlreadyVisited = (): Promise<void> =>
	onConsent().then((consentState) => {
		if (hasConsentForAlreadyVisitedCount(consentState)) {
			const alreadyVisited = getAlreadyVisitedCount();
			setAlreadyVisited(alreadyVisited + 1);
		} else {
			localStorage.removeItem(AlreadyVisitedKey);
		}
	});
