import { useEffect, useState } from 'react';
import { useConfig } from '../components/ConfigContext';
import { hasMinimumBridgetVersion } from './useIsBridgetCompatible';

/**
 * this is a solution to handle the fact that horizontal
 * scrolling is broken in older android app versions
 * for web views
 */
export const useIsHorizontalScrollingSupported = (): boolean => {
	const { renderingTarget } = useConfig();

	const [isSupported, setIsSupported] = useState<boolean>(true);

	const setHorizontalScrollingSupported = (
		hasDisableArticleSwipeApi: boolean,
	) => {
		// If we don't have article swipe api available in bridget
		// then horizontal scrolling is not supported on android
		if (!hasDisableArticleSwipeApi) {
			const isAndroid = /android/i.test(window.navigator.userAgent);
			setIsSupported(!isAndroid);
		}
	};

	useEffect(() => {
		if (renderingTarget === 'Apps') {
			// TODO: update version after new bridget patch is published
			hasMinimumBridgetVersion('8.1.0').then(
				setHorizontalScrollingSupported,
			);
		}
	}, [renderingTarget]);

	return isSupported;
};
