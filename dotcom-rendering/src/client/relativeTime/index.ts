import { updateTimeElements } from './updateTimeElements.ts';

export const relativeTime = (): Promise<void> => {
	updateTimeElements();
	window.setInterval(() => {
		updateTimeElements();
	}, 15000);

	return Promise.resolve();
};
