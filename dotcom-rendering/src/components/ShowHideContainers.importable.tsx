import { isObject, isString, storage } from '@guardian/libs';
import { useEffect } from 'react';
import { useIsSignedIn } from 'src/lib/useAuthStatus';

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

	return item;
};

export const ShowHideContainers = () => {
	const isSignedIn = useIsSignedIn();
	useEffect(() => {
		const containerStates = getContainerStates();

		const toggleContainer = (sectionId: string, element: HTMLElement) => {
			const isExpanded = element.getAttribute('aria-expanded') === 'true';

			const section: Element | null =
				window.document.getElementById(sectionId);

			const carouselButtons: Element | null =
				window.document.getElementById(
					`${sectionId}-carousel-navigation`,
				);

			if (isExpanded) {
				containerStates[sectionId] = 'closed';
				section?.classList.add('hidden');
				carouselButtons?.classList.add('hidden');

				element.innerHTML = 'Show';
				element.setAttribute('aria-expanded', 'false');
				element.setAttribute('data-link-name', 'Show');
			} else {
				containerStates[sectionId] = 'opened';
				section?.classList.remove('hidden');
				carouselButtons?.classList.remove('hidden');
				element.innerHTML = 'Hide';
				element.setAttribute('aria-expanded', 'true');
				element.setAttribute('data-link-name', 'Hide');
			}

			storage.local.set(`gu.prefs.container-states`, containerStates);
		};

		const allShowHideButtons = Array.from(
			window.document.querySelectorAll<HTMLElement>(
				'[data-show-hide-button]',
			),
		);

		for (const e of allShowHideButtons) {
			const sectionId = e.getAttribute('data-show-hide-button');
			if (!sectionId) continue;

			for (const e of allShowHideButtons) {
				if (isSignedIn === false) {
					// hide all show hide buttons
					e.classList.add('hidden');
				} else if (isSignedIn === true) {
					// unhide buttons then....
					e.classList.remove('hidden');

					const sectionId = e.getAttribute('data-show-hide-button');
					if (!sectionId) continue;

					e.onclick = () => toggleContainer(sectionId, e);

					if (containerStates[sectionId] === 'closed') {
						toggleContainer(sectionId, e);
					}
				}
			}
		}
	}, [isSignedIn]);

	return <></>;
};
