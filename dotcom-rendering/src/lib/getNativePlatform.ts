import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getEnvironmentClient } from './bridgetApi';

export const useNativePlatform = (): string | undefined => {
	const [nativePlatform, setNativePlatform] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		void getEnvironmentClient()
			.nativePlatform()
			.then(setNativePlatform)
			.catch((error) => {
				setNativePlatform(undefined);
				log('dotcom', 'nativePlatform check failed:', error);
			});
	}, []);
	return nativePlatform;
};
