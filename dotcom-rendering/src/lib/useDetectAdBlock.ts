import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { detectByRequestsOnce } from './detect-adblock';

export const useDetectAdBlock = (): boolean => {
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);
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
			if (hasConsentForGoogletag) {
				const detectByRequests = await detectByRequestsOnce();
				console.log('AdBlocker detected:', detectByRequests);
				setAdBlockerDetected(detectByRequests);
			}
		};
		void makeRequest();
	}, [hasConsentForGoogletag]);

	return adBlockerDetected;
};
