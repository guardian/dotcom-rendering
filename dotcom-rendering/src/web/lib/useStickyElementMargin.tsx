import { RefObject } from 'preact';
import { useEffect, useState } from 'react';

/**
 * Uses a ref on a parent div to obtain a margin right for a fixed position element
 * @param {RefObject<HTMLDivElement>} ref - Ref of the parent div
 * */
const useStickyElementMargin = (ref: RefObject<HTMLDivElement>): [number] => {
	const [marginRight, setMarginRight] = useState(0);

	useEffect(() => {
		const updateMarginRight = () => {
			if (!ref.current) return;

			const { right } = ref.current.getBoundingClientRect();
			const { innerWidth } = window;

			setMarginRight(innerWidth - right);
		};

		updateMarginRight();

		const handleResize = () => {
			updateMarginRight();
		};

		window.addEventListener('resize', handleResize);

		return function cleanup() {
			window.removeEventListener('resize', handleResize);
		};
	}, [ref]);

	return [marginRight];
};

export { useStickyElementMargin };
