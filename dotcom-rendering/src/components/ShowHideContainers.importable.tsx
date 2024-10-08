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
	disableShowHideContainers: boolean;
};

export const ShowHideContainers = ({ disableShowHideContainers }: Props) => {
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

		const allContainersExpanded = allShowHideButtons.every(
			(e) => e.getAttribute('data-link-name') === 'Hide',
		);

		for (const e of allShowHideButtons) {
			// We want to remove the ability to toggle front containers between expanded and collapsed states.
			// The first part of doing this is removing the feature for those who do not currently use it.
			if (disableShowHideContainers && allContainersExpanded) {
				e.remove();
			}

			const sectionId = e.getAttribute('data-show-hide-button');
			if (!sectionId) continue;

			e.onclick = () => toggleContainer(sectionId, e);

			if (containerStates[sectionId] === 'closed') {
				toggleContainer(sectionId, e);
			}
		}
	}, [disableShowHideContainers]);

	return <></>;
};
