import { isObject, isString, storage } from '@guardian/libs';
import { useEffect } from 'react';
import { useIsSignedIn } from '../lib/useAuthStatus';

/**
 * A mapping of container IDs to their states ('opened' or 'closed').
 */
type ContainerStates = { [id: string]: string };

/**
 * Type guard to check if an item is a valid `ContainerStates` object.
 */
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

const toggleContainer = (
	sectionId: string,
	button: HTMLElement,
	containerStates: ContainerStates,
) => {
	const isExpanded = button.getAttribute('aria-expanded') === 'true';
	const section = document.getElementById(sectionId);
	const carouselButtons: Element | null = document.getElementById(
		`${sectionId}-carousel-navigation`,
	);

	if (isExpanded) {
		containerStates[sectionId] = 'closed';
		section?.classList.add('hidden');
		carouselButtons?.classList.add('hidden');

		button.innerHTML = 'Show';
		button.setAttribute('aria-expanded', 'false');
		button.setAttribute('data-link-name', 'Show');
	} else {
		containerStates[sectionId] = 'opened';
		section?.classList.remove('hidden');
		carouselButtons?.classList.remove('hidden');
		button.innerHTML = 'Hide';
		button.setAttribute('aria-expanded', 'true');
		button.setAttribute('data-link-name', 'Hide');
	}

	storage.local.set(`gu.prefs.container-states`, containerStates);
};

/**
 * Initializes the show/hide functionality for a button and its associated container.
 */
const initialiseShowHide = (
	sectionId: string,
	button: HTMLElement,
	containerStates: ContainerStates,
) => {
	button.classList.remove('hidden');
	button.onclick = () => toggleContainer(sectionId, button, containerStates);

	if (containerStates[sectionId] === 'closed') {
		toggleContainer(sectionId, button, containerStates);
	}
};
/**
 * A component that manages the show/hide functionality of containers
 * based on user interaction and signed-in status.
 *
 * This component:
 * - Reads container states from local storage.
 * - Toggles the visibility of containers when buttons are clicked.
 * - Updates container states in local storage.
 * - Hides or shows buttons based on the signed-in status of the user.
 *
 * @returns {JSX.Element} - A React fragment (renders nothing to the DOM directly).
 */
export const ShowHideContainers = () => {
	const isSignedIn = useIsSignedIn();
	const containerStates = getContainerStates();

	useEffect(() => {
		const showHideButtons = document.querySelectorAll<HTMLElement>(
			'[data-show-hide-button]',
		);

		for (const button of showHideButtons) {
			if (isSignedIn === 'Pending') return;

			const sectionId = button.getAttribute('data-show-hide-button');
			const isBetaContainer = button.getAttribute('data-beta-container');

			if (!sectionId) continue;

			/**
			 * We have disabled show hide for beta containers when the user is not signed in.
			 * It is currently still available for legacy containers regardless of sign in state.
			 *
			 * Once beta containers are in production, show hide will be behind a sign in flag for all containers.
			 * At this point, the isBetaContainer check can be removed from the below code.
			 */
			if (isBetaContainer === 'true' && !isSignedIn) {
				button.classList.add('hidden');
				return;
			} else {
				initialiseShowHide(sectionId, button, containerStates);
			}
		}
	}, [isSignedIn, containerStates]);

	return <></>;
};
