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
				if (isOnline) {
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
	}, [isOnline]);

	return isInVariant && adBlockerDetected;
};
