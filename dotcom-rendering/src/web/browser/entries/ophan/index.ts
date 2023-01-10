import { recordPerformance, sendOphanPlatformRecord } from './ophan';

// side effect only
import 'ophan-tracker-js';

export const ophan = (): Promise<void> => {
	sendOphanPlatformRecord();
	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		recordPerformance();
		window.removeEventListener('load', load, false);
	});

	return Promise.resolve();
};
