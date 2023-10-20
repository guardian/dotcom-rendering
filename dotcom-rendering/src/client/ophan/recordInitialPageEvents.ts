import type { RenderingTarget } from '../../types/renderingTarget';
import {
	abTestPayload,
	getOphan,
	recordExperiences,
	recordPerformance,
} from './ophan';

export const recordInitialPageEvents = async (
	renderingTarget: RenderingTarget,
): Promise<void> => {
	const { record } = await getOphan(renderingTarget);

	void recordExperiences(renderingTarget, 'dotcom-rendering');
	record({ edition: window.guardian.config.page.edition });

	// Record server-side AB test variants (i.e. control or variant)
	record(abTestPayload(window.guardian.config.tests));

	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		void recordPerformance(renderingTarget);
		window.removeEventListener('load', load, false);
	});
};
