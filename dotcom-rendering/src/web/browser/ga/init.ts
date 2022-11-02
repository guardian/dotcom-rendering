import { startup } from '../startup';
import { init as initGa, sendPageView } from './ga';

const init = (): Promise<void> => {
	initGa();
	sendPageView();

	return Promise.resolve();
};

startup('ga', null, init);
