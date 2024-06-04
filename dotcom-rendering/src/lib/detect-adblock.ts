// cache the promise so we only make the requests once
let detectByRequests: Promise<boolean> | undefined;

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
export const detectByRequestsOnce = async (): Promise<boolean> => {
	if (detectByRequests) {
		return detectByRequests;
	}
	detectByRequests = Promise.all([
		requestDoubleclick(1000),
		/**
		 * We set this request with a much smaller timeout than the one we
		 * expect to be ad-blocked. This should reduce the chance that request
		 * fails and this one succeeds due to poor network connectivity
		 */
		requestGuardian(250),
	]).then(
		([doubleclickSuccess, guardianSuccess]) =>
			!doubleclickSuccess && guardianSuccess,
	);

	return detectByRequests;
};
