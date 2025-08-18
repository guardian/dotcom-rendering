import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';

const collectionIdentifier = '[data-collection-tracking="true"]';

const getCollectionElements = (): HTMLElement[] => {
	return Array.from(document.querySelectorAll(collectionIdentifier));
};

const reportInsertEvent = (elements: HTMLElement[]) => {
	for (const [index, element] of elements.entries()) {
		const sectionName = element.id;
		if (sectionName === '') continue;

		const distanceFromTop = (
			element.getBoundingClientRect().top + window.pageYOffset
		).toFixed(0);

		const ophanComponentEvent: ComponentEvent = {
			component: {
				componentType: 'CONTAINER',
				id: element.id,
				/**
				 * Labels:
				 * - The name of the collection
				 * - The number of the collection in the list (the top collection is 1)
				 * - The distance from the top of the collection to the top of the page
				 */
				labels: [sectionName, (index + 1).toString(), distanceFromTop],
			},
			action: 'INSERT',
		};

		void submitComponentEvent(ophanComponentEvent, 'Web');
	}
};

const reportViewEvent = (sectionName: string) => {
	const ophanComponentEvent: ComponentEvent = {
		component: {
			componentType: 'CONTAINER',
			labels: [sectionName],
		},
		action: 'VIEW',
	};

	void submitComponentEvent(ophanComponentEvent, 'Web');
};

const viewedCollections = new Set<string>();

const setCollectionAsViewed = (id: string) => {
	viewedCollections.add(id);
};

/**
 * Report fronts section data to Ophan.
 *
 * Sends an event with action: 'INSERT' for each collection that is rendered on the page, even if out of the viewport.
 * Sends an event with action: 'VIEW' when a collection is viewed by the user, i.e. within the viewport.
 *
 * Assumptions:
 *  - The id of the section/collection is also the human-readable name of the collection
 */
export const FrontSectionTracker = () => {
	useEffect(() => {
		if (!('IntersectionObserver' in window)) return;

		const collectionElements: HTMLElement[] = getCollectionElements();

		void reportInsertEvent(collectionElements);

		const callback = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const collectionName = entry.target.id;
					if (!viewedCollections.has(collectionName)) {
						setCollectionAsViewed(collectionName);
						reportViewEvent(collectionName);
						observer.unobserve(entry.target);
					}
				}
			}
		};
		const options = {
			rootMargin: '-100px',
		};
		const observer = new IntersectionObserver(callback, options);

		for (const collection of collectionElements) {
			observer.observe(collection);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return null;
};
