import { useEffect, useState } from 'react';

export const useTicker = (total: number, readyToAnimate: boolean): number => {
	const [runningTotal, setRunningTotal] = useState<number>(total);

	useEffect(() => {
		if (readyToAnimate && runningTotal < total) {
			window.requestAnimationFrame(() => {
				setRunningTotal((prevRunningTotal) => {
					const newRunningTotal =
						prevRunningTotal + Math.floor(total / 100);

					if (newRunningTotal > total) {
						return total;
					}

					return newRunningTotal;
				});
			});
		}
	}, [readyToAnimate, runningTotal, total]);

	return runningTotal;
};
