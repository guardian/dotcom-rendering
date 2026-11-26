import type { ConsentState } from '@guardian/consent-manager';
import { onConsentChange } from '@guardian/consent-manager';
import { useEffect, useState } from 'react';

/**
 * React hook to get consent state from CMP
 */
export const useConsent = (): ConsentState | undefined => {
	const [consentState, setConsentState] = useState<ConsentState>();

	useEffect(() => {
		onConsentChange((consent) => {
			setConsentState(consent);
		});
	}, []);

	return consentState;
};
