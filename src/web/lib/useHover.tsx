import { useState, useEffect, useRef, MutableRefObject } from 'react';

export function useHover<T>(): [MutableRefObject<T>, boolean] {
	const [value, setValue] = useState(false);

	const ref = useRef<any>(null);

	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	useEffect(() => {
		const node: HTMLElement | undefined = ref.current;
		if (node) {
			node.addEventListener('mouseover', handleMouseOver);
			node.addEventListener('mouseout', handleMouseOut);

			return () => {
				node.removeEventListener('mouseover', handleMouseOver);
				node.removeEventListener('mouseout', handleMouseOut);
			};
		}
	}, []);

	return [ref, value];
}
