import { EventTimer } from '@guardian/commercial';
import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { adFreeDataIsPresent } from '../client/userFeatures/user-features-lib';
import { useAB } from './useAB';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

/**
 * Make a HEAD request to a URL that is typically blocked by ad-blockers
 */
const requestDoubleclick = async (timeoutMs: number) => {
	try {
		const response = await fetch('https://www3.doubleclick.net', {
			method: 'HEAD',
			mode: 'no-cors',
			cache: 'no-store',
			signal: AbortSignal.timeout(timeoutMs),
		});

		// A redirect is another clue we may be being ad-blocked
		if (response.redirected) {
			return false;
		}

		return true;
	} catch (err) {
		return false;
	}
};

/**
 * Make a HEAD request to a URL that should succeed, even when using an
 * ad-blocker
 */
const requestGuardian = async (timeoutMs: number) => {
	try {
		await fetch('https://www.theguardian.com', {
			method: 'HEAD',
			mode: 'no-cors',
			cache: 'no-store',
			signal: AbortSignal.timeout(timeoutMs),
		});
		return true;
	} catch (err) {
		return false;
	}
};

/**
 * Attempt to detect presence of an ad-blocker
 *
 * This implementation of this is likely to be tweaked before launching the test
 * proper
 */
const detectByRequests = async () => {
	const [doubleclickSuccess, guardianSuccess] = await Promise.all([
		requestDoubleclick(1000),
		/**
		 * We set this request with a much smaller timeout than the one we
		 * expect to be ad-blocked. This should reduce the chance that request
		 * fails and this one succeeds due to poor network connectivity
		 */
		requestGuardian(250),
	]);

	return !doubleclickSuccess && guardianSuccess;
};

export const useAdblockAsk = ({
	slotId,
	shouldHideReaderRevenue,
	isPaidContent,
}: {
	slotId: `dfp-ad--${string}`;
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
}): boolean => {
	const isInVariant = useIsInAdBlockAskVariant();
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);
	const [isAdFree, setIsAdFree] = useState<boolean>(false);
	const [hasConsentForGoogletag, setHasConsentForGoogletag] = useState(false);

	const canDisplayAdBlockAsk =
		!shouldHideReaderRevenue &&
		!isPaidContent &&
		!isAdFree &&
		hasConsentForGoogletag;

	useEffect(() => {
		onConsentChange((consentState) => {
			if (consentState.tcfv2) {
				setHasConsentForGoogletag(
					getConsentFor('googletag', consentState),
				);
			}
			setHasConsentForGoogletag(true);
		});
	}, []);

	useEffect(() => {
		setIsAdFree(adFreeDataIsPresent());
	}, []);

	useEffect(() => {
		const makeRequest = async () => {
			if (
				// Only perform the detection check in the variant of the AB test
				isInVariant &&
				// Once we've detected an ad-blocker, we don't care about subsequent detections
				!adBlockerDetected &&
				// Is the reader/content eligible for displaying such a message
				canDisplayAdBlockAsk &&
				// Actually perform the detection
				(await detectByRequests())
			) {
				setAdBlockerDetected(true);

				// Some ad-blockers will remove slots from the DOM, while others don't
				// This clean-up ensures that any space we've reserved for an ad is removed,
				// in order to properly layout the ask.
				document
					.getElementById(slotId)
					?.closest('.ad-slot-container')
					?.remove();

				// Record ad block detection in commercial metrics
				EventTimer.get().setProperty('detectedAdBlocker', true);
			}
		};
		void makeRequest();
	}, [isInVariant, adBlockerDetected, slotId, canDisplayAdBlockAsk]);

	return adBlockerDetected;
};
