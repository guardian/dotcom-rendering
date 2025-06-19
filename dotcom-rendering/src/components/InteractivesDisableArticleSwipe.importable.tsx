import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getInteractionClient } from '../lib/bridgetApi';

export const InteractivesDisableArticleSwipe = () => {
	const onTouchStart = () => {
		getInteractionClient()
			.disableArticleSwipe(true)
			.catch((error) => {
				log('dotcom', 'disableArticleSwipe(true) failed', error);
			});
	};

	const onTouchEnd = () => {
		getInteractionClient()
			.disableArticleSwipe(false)
			.catch((error) => {
				log('dotcom', 'disableArticleSwipe(false) failed', error);
			});
	};
	useEffect(() => {
		document.addEventListener('touchstart', onTouchStart, {
			passive: true,
		});
		document.addEventListener('touchend', onTouchEnd, { passive: true });

		return () => {
			document.removeEventListener('touchstart', onTouchStart);
			document.removeEventListener('touchend', onTouchEnd);
		};
	}, []);
	return null;
};
