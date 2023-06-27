import { useEffect, useRef } from 'react';

// Why do we have this custom hook?
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: any, delay: number) => {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			const currentCallback: any = savedCallback.current;
			currentCallback();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		} else return;
	}, [delay]);
};
