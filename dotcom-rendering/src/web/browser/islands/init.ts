import '../webpackPublicPath';

import { startup } from '../startup';
import { initHydration } from './initHydration';

const init = () => {
	console.log('hello world2');

	const elements = document.querySelectorAll('gu-island');
	initHydration(elements);

	return Promise.resolve();
};

console.log('hello world');

startup('islands', null, init);
