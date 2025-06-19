import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getInteractionClient } from '../lib/bridgetApi';

export const InteractivesDisableArticleSwipe = () => {
	useEffect(() => {
		void getInteractionClient()
			.disableArticleSwipe(true)
			.catch((error) => {
				log('dotcom', 'disableArticleSwipe failed:', error);
			});
	}, []);
	return null;
};
