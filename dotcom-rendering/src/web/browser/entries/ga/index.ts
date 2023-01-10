import { init as initGa, sendPageView } from './ga';

export const ga = (): Promise<void> => {
	initGa();
	sendPageView();

	return Promise.resolve();
};
