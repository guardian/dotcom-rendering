import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { useEffect, useRef } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';

const collectionIdentifier = '[data-collection-tracking="true"]';

const getCollectionElements = (): HTMLElement[] => {
	return Array.from(document.querySelectorAll(collectionIdentifier));
};

/**
 * Calculate the distance from the top of the element to the top of the page.
 */
const calculateDistanceFromTop = (collection: HTMLElement) => {
	return (
		collection.getBoundingClientRect().top + window.pageYOffset
	).toFixed(0);
};

const reportInsertEvent = (elements: HTMLElement[]) => {
	for (const [index, element] of elements.entries()) {
		const sectionName = element.id;
		if (sectionName === '') continue;

		const ophanComponentEvent: ComponentEvent = {
			component: {
				componentType: 'CONTAINER',
				id: element.id,
				/**
				 * Labels:
				 * - The name of the collection
				 * - The number of the collection in the list (the top collection is 1)
				 * - The distance from the top of the collection to the top of the page in pixels
				 * - The total height of the page in pixels
				 */
				labels: [
					sectionName,
					(index + 1).toString(),
					calculateDistanceFromTop(element),
					document.body.offsetHeight.toString(),
				],
			},
			action: 'INSERT',
		};

		void submitComponentEvent(ophanComponentEvent, 'Web');
	}
};

const reportViewEvent = (element: HTMLElement) => {
	const ophanComponentEvent: ComponentEvent = {
		component: {
			componentType: 'CONTAINER',
			/**
			 * Labels:
			 * - The name of the collection
			 * - The distance from the top of the collection to the top of the page in pixels
			 * - The total height of the page in pixels
			 */
			labels: [
				element.id,
				calculateDistanceFromTop(element),
				document.body.offsetHeight.toString(),
			],
		},
		action: 'VIEW',
	};

	void submitComponentEvent(ophanComponentEvent, 'Web');
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
	/**
	 * Use a ref to persist this across renders.
	 * Rendering is not affected by what collections have been viewed by the user.
	 */
	const viewedCollectionsRef = useRef<Set<string>>(new Set());

	useEffect(() => {
		if (!('IntersectionObserver' in window)) return;

		const collectionElements: HTMLElement[] = getCollectionElements();

		void reportInsertEvent(collectionElements);

		const callback = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const collectionElement = entry.target as HTMLElement;
					const collectionName = collectionElement.id;

					if (!viewedCollectionsRef.current.has(collectionName)) {
						viewedCollectionsRef.current.add(collectionName);
						reportViewEvent(collectionElement);
						observer.unobserve(collectionElement);
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
