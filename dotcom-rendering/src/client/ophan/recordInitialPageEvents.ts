import { type EditionId } from '../../lib/edition';
import type { RenderingTarget } from '../../types/renderingTarget';
import { getOphan, recordExperiences, recordPerformance } from './ophan';

const getEditionForOphan = (editionId: EditionId) => {
	switch (editionId) {
		case 'UK':
		case 'US':
		case 'AU':
			return editionId;
		case 'INT':
			return 'International';
		case 'EUR':
			return 'Europe';
	}
};

export const recordInitialPageEvents = async (
	renderingTarget: RenderingTarget,
): Promise<void> => {
	const { record } = await getOphan(renderingTarget);

	void recordExperiences(renderingTarget, ['dotcom-rendering']);
	const edition = getEditionForOphan(window.guardian.config.page.edition);
	record({ edition });

	// We wait for the load event so that we can be sure our assetPerformance is reported as expected.
	window.addEventListener('load', function load() {
		void recordPerformance(renderingTarget);
		window.removeEventListener('load', load, false);
	});
};
