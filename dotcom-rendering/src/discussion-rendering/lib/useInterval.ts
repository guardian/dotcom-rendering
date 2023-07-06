import { useEffect, useRef } from 'react';

type CallbackFunction = () => void;

// Why do we have this custom hook?
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (
	callback: CallbackFunction,
	delay: number,
): void => {
	const savedCallback = useRef<CallbackFunction>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			const currentCallback = savedCallback.current;
			if (currentCallback) {
				currentCallback();
			}
		}
		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
};
