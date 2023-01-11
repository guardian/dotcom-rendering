import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook around the `IntersectionObserver`.
 *
 * @param options
 * @param {boolean} [options.debouce] If `true`, debounce triggers by 200ms.
 * By default, trigger instantaneously. Enabling debouncing ensures the target
 * element intersects for at least 200ms before the callback is executed
 * @param {boolean} [options.repeat] If `true`, trigger the hook on
 * all intersections. By default, only trigger on the first intersection.
 * @param {boolean} [options.node] Set the initial node, if known.
 * @returns a tuple containing [isInView, setNode];
 */
const useIsInView = (
	options: IntersectionObserverInit & {
		debounce?: true;
		repeat?: true;
		node?: HTMLElement;
	},
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [isInView, setIsInView] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(options.node ?? null);

	const observer = useRef<IntersectionObserver | null>(null);

	const intersectionFn: IntersectionObserverCallback = ([entry]) => {
		if (!entry) return;

		if (entry.isIntersecting) {
			setIsInView(true);
		} else if (options.repeat) {
			setIsInView(false);
		}
	};
	const intersectionCallback = options.debounce
		? libDebounce(intersectionFn, 200)
		: intersectionFn;

	useEffect(() => {
		// TODO: can we remove this? It’s now always cleaned up
		if (observer.current) {
			observer.current.disconnect();
		}

		if (window.IntersectionObserver) {
			observer.current = new window.IntersectionObserver(
				intersectionCallback,
				options,
			);

			if (node) {
				observer.current.observe(node);
			}
		}

		return () => observer.current?.disconnect();
	}, [node, options, intersectionCallback]);

	return [isInView, setNode];
};

export { useIsInView };
