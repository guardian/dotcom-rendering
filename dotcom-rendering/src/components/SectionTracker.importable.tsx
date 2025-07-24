import { useEffect } from 'react';
import { getOphan } from '../client/ophan/ophan';

export const SectionTracker = () => {
	useEffect(() => {
		const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
			'[data-tracking="true"]',
		);

		const trackAttention = async () => {
			try {
				const ophan = await getOphan('Web');
				for (const el of elements) {
					ophan.trackComponentAttention(el.id, el, 0.1, false);
				}
			} catch (error) {
				console.error('Failed to track video attention:', error);
			}
		};
		void trackAttention();
	}, []);

	return null;
};
