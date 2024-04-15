import { useEffect, useState } from 'react';
import { useAB } from './useAB';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

export const useAdblockAsk = (slotId: string): boolean => {
	const isInVariant = useIsInAdBlockAskVariant();
	const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);

	useEffect(() => {
		// This is just a stub implementation
		// TODO(@chrislomaxjones) Replace with proper ad block detection logic in subsequent PR
		setAdBlockerDetected(true);
	}, []);

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
