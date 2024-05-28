import type { OphanComponentType } from '@guardian/libs';
import { isObject, isString, storage } from '@guardian/libs';
import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';

type ContainerStates = { [id: string]: string };

const isContainerStates = (item: unknown): item is ContainerStates => {
	if (!isObject(item)) return false;
	if (!Object.keys(item).every(isString)) return false;
	if (!Object.values(item).every(isString)) return false;
	return true;
};

const getContainerStates = (): ContainerStates => {
	const item = storage.local.get(`gu.prefs.container-states`);

	if (!isContainerStates(item)) return {};

	/**
	 * Tracks usage of the feature to allow hiding and showing containers on fronts.
	 *
	 * When fetching the local storage configuration for container states:
	 * - If the user has configuration present, we log to Ophan which containers are hidden and which are shown ("opened" or "closed")
	 * - If a user has never interacted with the show/hide feature, no calls to Ophan will be made
	 */
	Object.entries(item).map(
		([containerId, status]) =>
			void submitComponentEvent(
				{
					component: {
						// Awaiting release of latest libs version to use "satifies" keyword
						componentType: 'CONTAINER' as OphanComponentType,
						id: containerId,
					},
					action: 'VIEW',
					value: status,
				},
				'Web',
			),
	);

	return item;
};

export const ShowHideContainers = () => {
	useEffect(() => {
		const containerStates = getContainerStates();

		const toggleContainer = (sectionId: string, element: HTMLElement) => {
			const isExpanded = element.getAttribute('aria-expanded') === 'true';

			const section: Element | null =
				window.document.getElementById(sectionId);

			if (isExpanded) {
				containerStates[sectionId] = 'closed';
				section?.classList.add('hidden');
				element.innerHTML = 'Show';
				element.setAttribute('aria-expanded', 'false');
				element.setAttribute('data-link-name', 'Show');
			} else {
				containerStates[sectionId] = 'opened';
				section?.classList.remove('hidden');
				element.innerHTML = 'Hide';
				element.setAttribute('aria-expanded', 'true');
				element.setAttribute('data-link-name', 'Hide');
			}

			storage.local.set(`gu.prefs.container-states`, containerStates);
		};

		for (const e of window.document.querySelectorAll<HTMLElement>(
			'[data-show-hide-button]',
		)) {
			const sectionId = e.getAttribute('data-show-hide-button');
			if (!sectionId) continue;

			e.onclick = () => toggleContainer(sectionId, e);

			if (containerStates[sectionId] === 'closed') {
				toggleContainer(sectionId, e);
			}
		}
	}, []);

	return <></>;
};
