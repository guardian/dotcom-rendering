import { useEffect, useState, useRef } from 'react';
import libDebounce from 'lodash.debounce';

const useStickyVideo = (
	options: IntersectionObserverInit & { debounce?: boolean },
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef<IntersectionObserver | null>(null);

	// Enabling debouncing ensures the target element intersects for at least
	// 200ms before the callback is executed
	const intersectionFn: IntersectionObserverCallback = ([entry]) => {
		if (entry.isIntersecting) {
			setIsIntersecting(true);
		} else {
			setIsIntersecting(false);
		}
	};
	const intersectionCallback = options.debounce
		? libDebounce(intersectionFn, 200)
		: intersectionFn;

	useEffect((): any => {
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

	return [isIntersecting, setNode];
};

export { useStickyVideo };
