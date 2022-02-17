import '../webpackPublicPath';

import { startup } from '../startup';
import { initHydration } from './initHydration';

const init = () => {
	const elements = document.querySelectorAll('gu-island');
	initHydration(elements);

	return Promise.resolve();
};

startup('islands', null, init);
