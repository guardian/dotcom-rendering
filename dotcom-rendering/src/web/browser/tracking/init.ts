import '../webpackPublicPath';
import { startup } from '../startup';
import { initScrollDepth } from './scrollDepth';

/** Initialise tracking */
const init = (): Promise<void> => {
	initScrollDepth();

	return Promise.resolve();
};

startup('tracking', null, init);
