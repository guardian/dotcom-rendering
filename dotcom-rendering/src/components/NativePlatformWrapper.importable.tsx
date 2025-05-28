import { useEffect } from 'react';
import { useNativePlatform } from '../lib/useNativePlatform';

export const NativePlatformWrapper = () => {
	const nativePlatform = useNativePlatform();

	useEffect(() => {
		if (nativePlatform) {
			document.body.classList.add(nativePlatform);
		}
	}, [nativePlatform]);
	return null;
};
