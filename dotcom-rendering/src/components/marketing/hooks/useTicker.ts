/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/hooks/useTicker.ts
 */
import { useState, useEffect } from 'react';

export const useTicker = (total: number, readyToAnimate: boolean): number => {
	const [runningTotal, setRunningTotal] = useState<number>(0);

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
