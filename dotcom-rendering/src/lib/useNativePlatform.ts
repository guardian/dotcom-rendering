import type { NativePlatform } from '@guardian/bridget';
import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getInteractivesClient } from './bridgetApi';

export const useNativePlatform = (): NativePlatform | undefined => {
	const [nativePlatform, setNativePlatform] = useState<
		NativePlatform | undefined
	>(undefined);

	useEffect(() => {
		void getInteractivesClient()
			.getNativePlatform()
			.then(setNativePlatform)
			.catch((error) => {
				setNativePlatform(undefined);
				log('dotcom', 'getNativePlatform check failed:', error);
			});
	}, []);
	return nativePlatform;
};
