import { useEffect, useState, useRef } from 'react';
import libDebounce from 'lodash.debounce';

const useHasBeenSeen = (
	options: IntersectionObserverInit & { debounce?: boolean },
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef<IntersectionObserver | null>(null);

	// Enabling debouncing ensures the target element intersects for at least
	// 200ms before the callback is executed
	const intersectionFn: IntersectionObserverCallback = ([entry]) => {
		if (entry.isIntersecting) {
			setHasBeenSeen(true);
		}
	};
	const intersectionCallback = options.debounce
		? libDebounce(intersectionFn, 200)
		: intersectionFn;

	// Because useEffect is used for performing side-effects with an optional cleanup function
	// it doesn't deal with returning values, so no types are necessary. For more info see:
	// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#useeffect--uselayouteffect
	// Given this, it seems reasoable to ask typescript to ignore this.
	// @ts-ignore
	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}

		if (window.IntersectionObserver) {
			observer.current = new window.IntersectionObserver(
				intersectionCallback,
				options,
			);

			const { current: currentObserver } = observer;

			if (node) {
				currentObserver.observe(node);
			}

			return () => currentObserver.disconnect();
		}
	}, [node, options, intersectionCallback]);

	return [hasBeenSeen, setNode];
};

export { useHasBeenSeen };
