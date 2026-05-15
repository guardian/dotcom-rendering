import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getInteractionClient } from '../lib/bridgetApi';

export const InteractivesDisableArticleSwipe = () => {
	const onTouchStart = () => {
		getInteractionClient()
			.disableArticleSwipe(true)
			.catch((error) => {
				log('dotcom', 'disableArticleSwipe failed', error);
			});
	};
	useEffect(() => {
		document.addEventListener('touchstart', onTouchStart, {
			passive: true,
		});

		return () => {
			document.removeEventListener('touchstart', onTouchStart);
		};
	}, []);
	return null;
};
