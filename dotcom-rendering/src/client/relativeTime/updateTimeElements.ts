import { timeAgo } from '@guardian/libs';

export const updateTimeElement = (element: Element): void => {
	if (element instanceof HTMLElement) {
		// Get required values
		const { relativeformat: relativeFormat } = element.dataset;
		const absoluteTime = element.getAttribute('datetime');
		if (!absoluteTime || !relativeFormat) return;

		let newTime: false | string = false;
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
		if (newTime !== false && newTime !== oldTime)
			element.innerHTML = newTime;
	}
};

export const updateTimeElements = (): void => {
	const elements = document.querySelectorAll('time[data-relativeformat]');
	for (const element of elements) {
		updateTimeElement(element);
	}
};
