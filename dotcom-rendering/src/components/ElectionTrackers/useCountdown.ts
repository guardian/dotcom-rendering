import { useEffect, useState } from 'react';

/**
 * Count down from a provided number of seconds to zero, emitting a new value
 * every second, and then stay at zero. Calling `reset` will start the countdown
 * again.
 *
 * Note that calling reset will only restart the countdown to within about a
 * second of its original value. E.g. if the countdown is from 60, it will
 * reset to somewhere between 59-60 seconds. If greater accuracy is required,
 * this hook is not suitable.
 *
 * @param from The number of seconds to count down from.
 */
export const useCountdown = (from: number): [number, () => void] => {
	const [remaining, setRemaining] = useState(from);

	const reset = () => setRemaining(from);

	useEffect(() => {
		const id = setInterval(() => {
			setRemaining((r) => (r <= 0 ? 0 : r - 1));
		}, 1_000);

		return () => clearInterval(id);
	}, []);

	return [remaining, reset];
};
