/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/hooks/useHasBeenSeen.ts
 */
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

export type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

const useHasBeenSeen = (
	options: IntersectionObserverInit,
	debounce?: boolean,
): HasBeenSeen => {
	const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef<IntersectionObserver | null>(null);

	// Enabling debouncing ensures the target element intersects for at least
	// 200ms before the callback is executed
	const intersectionFn: IntersectionObserverCallback = ([entry]) => {
		if (entry?.isIntersecting) {
			setHasBeenSeen(true);
		}
	};
	const intersectionCallback = debounce
		? libDebounce(intersectionFn, 200)
		: intersectionFn;

	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new window.IntersectionObserver(
			intersectionCallback,
			options,
		);

		const { current: currentObserver } = observer;

		if (node) {
			currentObserver.observe(node);
		}

		return (): void => currentObserver.disconnect();
	}, [node, options, intersectionCallback]);

	return [hasBeenSeen, setNode];
};

export { useHasBeenSeen };
