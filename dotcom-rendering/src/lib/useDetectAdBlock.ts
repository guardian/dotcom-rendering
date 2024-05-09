import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';

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

export const useDetectAdBlock = (): boolean => {
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);
	const [detectionHasRun, setDetectionHasRun] = useState<boolean>(false);
	const [hasConsentForGoogletag, setHasConsentForGoogletag] = useState(false);

	useEffect(() => {
		onConsentChange((consentState) => {
			if (consentState.tcfv2) {
				return setHasConsentForGoogletag(
					getConsentFor('googletag', consentState),
				);
			}
			setHasConsentForGoogletag(true);
		});
	}, []);

	useEffect(() => {
		const makeRequest = async () => {
			if (!detectionHasRun && hasConsentForGoogletag) {
				setAdBlockerDetected(await detectByRequests());
				setDetectionHasRun(true);
			}
		};
		void makeRequest();
	}, [detectionHasRun, hasConsentForGoogletag]);

	return adBlockerDetected;
};
