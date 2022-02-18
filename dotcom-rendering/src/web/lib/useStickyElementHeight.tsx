import { RefObject } from 'preact';
import { useEffect, useState } from 'react';

/**
 * Uses a ref on a parent div to obtain element height
 * @param {RefObject<HTMLDivElement>} ref - Ref of the parent div
 * @param {Boolean} isSticky - Additional trigger in case window resizing causes video to stick
 * */
const useStickyElementHeight = (ref: RefObject<HTMLDivElement>): [number] => {
	const [containerHeight, setContainerHeight] = useState(0);

	useEffect(() => {
		const updateContainerHeight = () => {
			if (!ref.current) return;

			setContainerHeight(ref.current.clientHeight);
		};

		updateContainerHeight();

		const handleResize = () => {
			updateContainerHeight();
		};

		window.addEventListener('resize', handleResize);

		return function cleanup() {
			window.removeEventListener('resize', handleResize);
		};
	}, [ref]);

	return [containerHeight];
};

export { useStickyElementHeight };
