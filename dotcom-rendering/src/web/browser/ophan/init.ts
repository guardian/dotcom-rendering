import '../webpackPublicPath';
import { startup } from '../startup';
import { recordPerformance, sendOphanPlatformRecord } from './ophan';

import 'ophan-tracker-js';

const init = (): Promise<void> => {
	sendOphanPlatformRecord();
	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		recordPerformance();
		window.removeEventListener('load', load, false);
	});
	return Promise.resolve();
};

startup('ophan', null, init);
