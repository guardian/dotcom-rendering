import type { OphanABEvent } from '@guardian/libs';
import { abTestPayload, record, recordPerformance } from './ophan';

// side effect only
import 'ophan-tracker-js';

export const ophan = (): Promise<void> => {
	record({ experiences: 'dotcom-rendering' });
	record({ edition: window.guardian.config.page.edition });

	// Record server-side AB test variants (i.e. control or variant)
	record(abTestPayload(window.guardian.config.tests));

	const borked = Object.entries(window.guardian.borkWebVitals);
	if (borked.length > 0) {
		const abTestRegister: { [key: string]: OphanABEvent } = {};
		borked.forEach(([testName, variantName]) => {
			abTestRegister[`abBork${testName}`] = {
				variantName,
				complete: false,
			};
		});
		console.log('🍊', abTestRegister);
		record({ abTestRegister });
	}

	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		recordPerformance();
		window.removeEventListener('load', load, false);
	});

	return Promise.resolve();
};
