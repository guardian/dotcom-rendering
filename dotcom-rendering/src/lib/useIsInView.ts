import libDebounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
	/**
	 * Defaults to `undefined` (falsy),
	 * which trigger a change the instantaneously.
	 *
	 * If `true`, debounce triggers by 200ms.
	 * Enabling debouncing ensures the target element intersects
	 * for at least 200ms before the callback is executed
	 */
	debounce?: true;
	/**
	 * Defaults to `undefined` (falsy),
	 * which only trigger on the first intersection.
	 *
	 * If `true`, trigger the hook on all intersections.
	 */
	repeat?: true;
	/** Set the initial HTML Element, if known. */
	node?: HTMLElement;
};

/**
 * Custom hook around the `IntersectionObserver`.
 *
 * @returns a tuple containing `[isInView, setNode]`
 */
const useIsInView = (
	options: IntersectionObserverInit & Options,
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [isInView, setIsInView] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(options.node ?? null);

	const observer = useRef<IntersectionObserver | null>(null);

	const intersectionObserverCallback =
		useCallback<IntersectionObserverCallback>(
			([entry]) => {
				if (!entry) return;

				if (entry.isIntersecting) {
					setIsInView(true);
				} else if (options.repeat) {
					setIsInView(false);
				}
			},
			[options.repeat],
		);

	const intersectionCallback = options.debounce
		? libDebounce(intersectionObserverCallback, 200)
		: intersectionObserverCallback;

	useEffect(() => {
		options.node && setNode(options.node);
	}, [options.node]);

	useEffect(() => {
		if (!node) return;
		// Check for browser support https://caniuse.com/intersectionobserver
		if (!('IntersectionObserver' in window)) return;

		observer.current = new window.IntersectionObserver(
			intersectionCallback,
			options,
		);

		observer.current.observe(node);

		return () => observer.current?.disconnect();
	}, [node, options, intersectionCallback]);

	useEffect(() => {
		if (!options.repeat && isInView) observer.current?.disconnect();
	}, [isInView, options.repeat]);

	return [isInView, setNode];
};

export { useIsInView };
