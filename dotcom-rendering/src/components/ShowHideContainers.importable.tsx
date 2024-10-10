import { isObject, isString, storage } from '@guardian/libs';
import { useEffect } from 'react';

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

type Props = {
	/** When in the ON position, we remove the show/hide functionality for all
	 * containers on the page if the user does not have any hidden containers */
	disableFrontContainerToggleSwitch: boolean;
};

export const ShowHideContainers = ({
	disableFrontContainerToggleSwitch,
}: Props) => {
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

		const allShowHideButtons = Array.from(
			window.document.querySelectorAll<HTMLElement>(
				'[data-show-hide-button]',
			),
		);

		const allContainersAreExpanded = allShowHideButtons
			.map((el) => {
				const sectionId = el.getAttribute('data-show-hide-button');
				return sectionId && containerStates[sectionId];
			})
			.every((state) => state !== 'closed');

		for (const e of allShowHideButtons) {
			// We want to remove the ability to toggle front containers between expanded and collapsed states.
			// The first part of doing this is removing the feature for those who do not currently use it.
			if (disableFrontContainerToggleSwitch && allContainersAreExpanded) {
				e.remove();
			}

			const sectionId = e.getAttribute('data-show-hide-button');
			if (!sectionId) continue;

			e.onclick = () => toggleContainer(sectionId, e);

			if (containerStates[sectionId] === 'closed') {
				toggleContainer(sectionId, e);
			}
		}
	}, [disableFrontContainerToggleSwitch]);

	return <></>;
};
