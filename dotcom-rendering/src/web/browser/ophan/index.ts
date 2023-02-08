import { abTestPayload, record, recordPerformance } from './ophan';

// side effect only
import 'ophan-tracker-js';

export const ophan = (): Promise<void> => {
	record({ experiences: 'dotcom-rendering' });
	record({ edition: window.guardian.config.page.edition });

	// Record server-side AB test variants (i.e. control or variant)
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- Client-side safety,
	if (window.guardian.config.tests) {
		const { tests } = window.guardian.config;
		record(abTestPayload(tests));
	}

	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		recordPerformance();
		window.removeEventListener('load', load, false);
	});

	return Promise.resolve();
};
