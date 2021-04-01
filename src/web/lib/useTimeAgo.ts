import { timeAgo } from '@guardian/libs';

import { useInterval } from '@root/src/web/lib/useInterval';

const DEFAULT_INTERVAL = 15 * 1000; // 15 seconds

type Options = {
	interval?: number;
};

const updateTimeElements = () => {
	document
		.querySelectorAll('time[data-relativeformat]')
		.forEach((element) => {
			if (element instanceof HTMLElement) {
				// Get required values
				const { relativeformat: relativeFormat } = element.dataset;
				const absoluteTime = element.getAttribute('datetime');
				if (!absoluteTime || !relativeFormat) return [];

				let newTime;
				switch (relativeFormat) {
					case 'short':
					case 'med':
						newTime = timeAgo(new Date(absoluteTime).getTime(), {
							verbose: false,
						});
						break;
					case 'long':
						newTime = timeAgo(new Date(absoluteTime).getTime(), {
							verbose: true,
						});
						break;
				}
				const oldTime = element.innerText;
				if (newTime && newTime !== oldTime) element.innerHTML = newTime;
			}
		});
};

export const useTimeAgo = (options?: Options) => {
	// Decide what interval to use
	const interval: number = options?.interval || DEFAULT_INTERVAL;

	useInterval(() => {
		updateTimeElements();
	}, interval);
};
