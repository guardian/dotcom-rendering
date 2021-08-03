import { useEffect, useRef } from 'react';

// See: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: any, delay: number) => {
	const savedCallback = useRef<any>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};
