import { useEffect, useState } from 'react';
import { useAB } from './useAB';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

const makeDetectionRequests = async () => {
	const requestDoubleclick = async () => {
		try {
			const response = await fetch('https://www3.doubleclick.net', {
				method: 'HEAD',
				mode: 'no-cors',
				cache: 'no-store',
				signal: AbortSignal.timeout(150),
			});

			if (response.redirected) {
				return false;
			}

			return true;
		} catch (err) {
			return false;
		}
	};

	const requestGuardian = async () => {
		try {
			await fetch('https://www.theguardian.com', {
				method: 'HEAD',
				mode: 'no-cors',
				cache: 'no-store',
				signal: AbortSignal.timeout(150),
			});
			return true;
		} catch (err) {
			return false;
		}
	};

	const [doubleclickSuccess, guardianSuccess] = await Promise.all([
		requestDoubleclick(),
		requestGuardian(),
	]);

	return !doubleclickSuccess && guardianSuccess;
};

export const useAdblockAsk = (slotId: string): boolean => {
	const isInVariant = useIsInAdBlockAskVariant();
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);

	useEffect(() => {
		const makeRequest = async () => {
			// Once we've detected an ad-blocker, we don't care about subsequent detections
			// Ensure the user is online before performing the detection request
			if (!adBlockerDetected && (await makeDetectionRequests())) {
				setAdBlockerDetected(true);
			}
		};
		void makeRequest();
	}, [adBlockerDetected]);

	/**
	 * Some ad-blockers will remove slots from the DOM, while others don't
	 * This clean-up ensures that any space we've reserved for an ad is removed,
	 * in order to properly layout the ask.
	 */
	useEffect(() => {
		if (adBlockerDetected) {
			document
				.getElementById(slotId)
				?.closest('.ad-slot-container')
				?.remove();
		}
	}, [adBlockerDetected, slotId]);

	return isInVariant && adBlockerDetected;
};
