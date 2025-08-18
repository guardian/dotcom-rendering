import { log } from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';

/**
 * Send submitComponentEvent event with action: 'INSERT' when the collection is rendered on the page.
 * Send submitComponentEvent event with action: 'VIEW' when a collection is viewed by the user.
 */
export const SectionTracker = () => {
	useEffect(() => {
		const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
			'[data-collection-tracking="true"]',
		);

		const recordInsertEvent = () => {
			try {
				for (const [index, el] of elements.entries()) {
					const sectionName = el.getAttribute('data-component');
					if (sectionName === null) break;

					const ophanComponentEvent: ComponentEvent = {
						component: {
							componentType: 'CONTAINER',
							id: el.id,
							labels: [
								sectionName,
								index.toString(),
								el.getBoundingClientRect().top.toFixed(0),
							],
						},
						action: 'INSERT',
					};

					void submitComponentEvent(ophanComponentEvent, 'Web');
				}
			} catch (error) {
				log('dotcom', 'Failed to track video attention:', error);
			}
		};

		const recordViewEvent = () => {
			try {
				for (const el of elements) {
					const ophanComponentEvent: ComponentEvent = {
						component: {
							componentType: 'CONTAINER',
							id: el.id,
							labels: ['label'],
						},
						action: 'VIEW',
					};

					void submitComponentEvent(ophanComponentEvent, 'Web');
				}
			} catch (error) {
				log('dotcom', 'Failed to track video attention:', error);
			}
		};

		void recordInsertEvent();

		void recordViewEvent();
	}, []);

	return null;
};
