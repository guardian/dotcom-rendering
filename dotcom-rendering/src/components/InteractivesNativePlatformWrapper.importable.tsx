import { NativePlatform } from '@guardian/bridget';
import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getInteractivesClient } from '../lib/bridgetApi';

export const InteractivesNativePlatformWrapper = () => {
	useEffect(() => {
		void getInteractivesClient()
			.getNativePlatform()
			.then((platform) =>
				document.body.classList.add(
					platform === NativePlatform.ios ? 'ios' : 'android',
				),
			)
			.catch((error) => {
				log('dotcom', 'getNativePlatform check failed:', error);
			});
	}, []);
	return null;
};
