import { useEffect, useState } from 'react';
import { useAB } from './useAB';
import { useOnlineStatus } from './useOnlineStatus';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

export const useAdblockAsk = (): boolean => {
	const isInVariant = useIsInAdBlockAskVariant();
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);
	const isOnline = useOnlineStatus();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				// Once we've detected an ad-blocker, we don't care about subsequent detections
				// Ensure the user is online before performing the detection request
				if (!adBlockerDetected && isOnline) {
					const response = await fetch(
						'https://www3.doubleclick.net',
						{
							method: 'HEAD',
							mode: 'no-cors',
							cache: 'no-store',
						},
					);
					if (response.redirected) {
						setAdBlockerDetected(true);
					}
				}
			} catch (err) {
				setAdBlockerDetected(true);
			}
		};
		void makeRequest();
	}, [adBlockerDetected, isOnline]);

	/**
	 * Some ad-blockers will remove slots from the DOM, while others don't
	 * This clean-up ensures that any space we've reserved for an ad is removed,
	 * in order to properly layout the ask.
	 */
	useEffect(() => {
		if (adBlockerDetected) {
			document.querySelector('.ad-slot-container')?.remove();
		}
	}, [adBlockerDetected]);

	return isInVariant && adBlockerDetected;
};
