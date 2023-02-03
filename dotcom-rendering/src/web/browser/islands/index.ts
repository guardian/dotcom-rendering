import { initHydration } from './initHydration';

export const islands = (): Promise<void> => {
	const elements = document.querySelectorAll('gu-island');
	initHydration(elements);

	return Promise.resolve();
};
