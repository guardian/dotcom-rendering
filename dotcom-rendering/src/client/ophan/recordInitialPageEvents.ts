import {
	abTestPayload,
	maybeRecord,
	recordExperiences,
	recordPerformance,
} from './ophan';

export const recordInitialPageEvents = async (): Promise<void> => {
	void recordExperiences('dotcom-rendering');
	void maybeRecord({ edition: window.guardian.config.page.edition });

	// Record server-side AB test variants (i.e. control or variant)
	void maybeRecord(abTestPayload(window.guardian.config.tests));

	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		void recordPerformance();
		window.removeEventListener('load', load, false);
	});
};
