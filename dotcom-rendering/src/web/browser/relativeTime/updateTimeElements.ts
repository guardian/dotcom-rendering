import { timeAgo } from '@guardian/libs';

export const updateTimeElements = (): void => {
	document
		.querySelectorAll('time[data-relativeformat]')
		.forEach((element) => {
			if (element instanceof HTMLElement) {
				// Get required values
				const { relativeformat: relativeFormat } = element.dataset;
				const absoluteTime = element.getAttribute('datetime');
				if (!absoluteTime || !relativeFormat) return;

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
					case 'edition':
						// We don't need to update on client side. Date time is
						// provided by Frontend in correct format by edition.
						break;
				}
				const oldTime = element.innerText;
				if (newTime && newTime !== oldTime) element.innerHTML = newTime;
			}
		});
};
