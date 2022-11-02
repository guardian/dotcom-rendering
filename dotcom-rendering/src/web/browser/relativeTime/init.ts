import { startup } from '../startup';
import { updateTimeElements } from './updateTimeElements';

const init = (): Promise<void> => {
	updateTimeElements();
	window.setInterval(() => {
		updateTimeElements();
	}, 15000);

	return Promise.resolve();
};

startup('relativeTime', null, init);
