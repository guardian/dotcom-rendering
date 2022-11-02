import { startup } from '../startup';
import { initHydration } from './initHydration';

const init = () => {
	const elements = document.querySelectorAll('gu-island');
	initHydration(elements);

	console.log('Init Island');

	return Promise.resolve();
};

startup('islands', null, init);
