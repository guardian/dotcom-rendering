import '../webpackPublicPath';
import { scrollDepth } from '../../../web/experiments/tests/scroll-depth';
import { startup } from '../startup';
import { ab } from './ab';
import { initScrollDepth } from './scrollDepth';

/** Initialise tracking */
const init = (): Promise<void> => {
	if (ab.isUserInVariant(scrollDepth.id, 'variant')) initScrollDepth();

	return Promise.resolve();
};

startup('tracking', null, init);
