import { useState, SetStateAction } from 'react';
import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
	rootId: string;
	children: JSX.Element;
	waitFor?: unknown[];
};

const isReady = (dependencies: unknown[]): boolean => {
	return dependencies.every((dep) => dep !== undefined);
};

const resetHydrationStateEventName = 'resetHydrationState';

// HOF required to enable removeEventListener
const setAlreadyHydratedToFalse =
	() => (setAlreadyHydrated: (value: SetStateAction<boolean>) => void) => {
		setAlreadyHydrated(false);
	};

// For use in storybook for clicking between components
export const fireAndResetHydrationState = () => {
	const event = document.createEvent('HTMLEvents');
	event.initEvent(resetHydrationStateEventName, true, true);
	window.dispatchEvent(event);
	// Remove the event listener, it'll be added again
	// once hydration has happened
	window.removeEventListener(
		resetHydrationStateEventName,
		setAlreadyHydratedToFalse,
		false,
	);
};

/**
 * Finds the element with the same id as `rootId` and calls `ReactDOM.hydrate(children, element)`. Only
 * executes once and only after all variables in `waitFor` are defined.
 * @param {String} rootId - The id of the element to hydrate
 * @param children - The react elements passed to ReactDOM.hydrate()
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const HydrateOnce = ({ rootId, children, waitFor = [] }: Props) => {
	const [alreadyHydrated, setAlreadyHydrated] = useState(false);
	if (alreadyHydrated) return null;
	if (!isReady(waitFor)) return null;
	const { start, end } = initPerf('hydration');
	const element = document.getElementById(rootId);
	if (!element) return null;
	start();
	ReactDOM.hydrate(children, element, () => {
		element.setAttribute('data-cy-hydrated', 'true');
		end();
	});
	setAlreadyHydrated(true);
	// @ts-ignore
	if (window.STORYBOOK_ENV) {
		window.addEventListener(resetHydrationStateEventName, () =>
			setAlreadyHydratedToFalse()(setAlreadyHydrated),
		);
	}
	return null;
};

/**
 * Finds the element with the same id as `rootId` and calls `ReactDOM.hydrate(children, element)`. Only
 * executes once and only after all variables in `waitFor` are defined. Also removes placeholders. Not
 * a pattern that should be extended or used elsewhere.
 * @param {String} rootId - The id of the element to hydrate
 * @param children - The react elements passed to ReactDOM.hydrate()
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const HydrateInteractiveOnce = ({
	rootId,
	children,
	waitFor = [],
}: Props) => {
	const [alreadyHydrated, setAlreadyHydrated] = useState(false);
	if (alreadyHydrated) return null;
	if (!isReady(waitFor)) return null;
	const { start, end } = initPerf('hydration');
	const element = document.getElementById(rootId);
	if (!element) return null;

	// If a component has server-rendered placeholders and we'd like to replace the entire content
	// then we'd expect to use a Portal, not use hydration. For interactive block elements we have
	// a hybrid situation because a single component supports boot scripts that replace the entire
	// component content as well as appending new child elements. Note that interactive block
	// components have multiple placeholders hence the need for querySelectorAll.
	const placeholderElements = element.querySelectorAll(
		'[data-name="placeholder"]',
	);
	if (placeholderElements.length > 0)
		placeholderElements.forEach((el) => el.remove());

	start();
	ReactDOM.hydrate(children, element, () => {
		end();
	});
	setAlreadyHydrated(true);
	// @ts-ignore
	if (window.STORYBOOK_ENV) {
		window.addEventListener(resetHydrationStateEventName, () =>
			setAlreadyHydratedToFalse()(setAlreadyHydrated),
		);
	}
	return null;
};
