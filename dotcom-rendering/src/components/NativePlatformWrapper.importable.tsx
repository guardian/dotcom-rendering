import { NativePlatform } from '@guardian/bridget';
import { useEffect } from 'react';
import { useNativePlatform } from '../lib/useNativePlatform';

export const NativePlatformWrapper = () => {
	const nativePlatform = useNativePlatform();

	useEffect(() => {
		if (nativePlatform !== undefined) {
			const className =
				nativePlatform === NativePlatform.ios ? 'ios' : 'android';

			document.body.classList.add(className);
		}
	}, [nativePlatform]);
	return null;
};
