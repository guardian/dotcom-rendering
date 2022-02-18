import { useEffect, useState, useRef } from 'react';

/**
 * Uses an intersection observer to determine if
 * @param {IntersectionObserverInit} options - Intersection observer options
 * */
const useStickyObserver = (
	options: IntersectionObserverInit,
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef<IntersectionObserver | null>(null);

	useEffect((): any => {
		const callback: IntersectionObserverCallback = ([entry]) => {
			if (entry.boundingClientRect.top > 0) {
				setIsIntersecting(false);
			} else {
				setIsIntersecting(true);
			}
		};

		if (observer.current) {
			observer.current.disconnect();
		}

		if (window.IntersectionObserver) {
			observer.current = new window.IntersectionObserver(
				callback,
				options,
			);

			const { current: currentObserver } = observer;

			if (node) {
				currentObserver.observe(node);
			}

			return () => currentObserver.disconnect();
		}
	}, [node, options]);

	return [isIntersecting, setNode];
};

export { useStickyObserver };
