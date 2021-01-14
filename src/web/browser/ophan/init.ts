import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import { sendOphanPlatformRecord, recordPerformance } from './ophan';

// side effect only
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
