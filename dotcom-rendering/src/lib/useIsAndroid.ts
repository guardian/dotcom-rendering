import { useEffect, useState } from 'react';
import type { RenderingTarget } from '../types/renderingTarget';

/**
 * @deprecated this is a temporary solution to handle the fact
 * that horizontal scrolling is broken in the android app for
 * web views
 */
export const useIsAndroid = (
	renderingTarget: RenderingTarget,
): boolean | undefined => {
	const [isAndroid, setIsAndroid] = useState<boolean | undefined>(
		renderingTarget === 'Web' ? false : undefined,
	);

	useEffect(() => {
		if (renderingTarget === 'Web') {
			return setIsAndroid(false);
		}
		setIsAndroid(() => /android/i.test(window.navigator.userAgent));
	}, [renderingTarget]);

	return isAndroid;
};
