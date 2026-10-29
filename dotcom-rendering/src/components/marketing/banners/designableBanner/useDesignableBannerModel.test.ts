import type { ConfigurableDesign } from '@guardian/support-dotcom-components/dist/shared/types';
import { buildChoiceCardSettings } from './useDesignableBannerModel';

describe('buildChoiceCardSettings', () => {
	it('passes configured opacities through unchanged', () => {
		const design = {
			visual: {
				kind: 'ChoiceCards',
				buttonOpacity: 0.8,
				buttonSelectOpacity: 0.95,
			},
		} as ConfigurableDesign;

		expect(buildChoiceCardSettings(design)).toMatchObject({
			buttonOpacity: 0.8,
			buttonSelectOpacity: 0.95,
		});
	});

	it('preserves missing opacities for legacy designs', () => {
		const design = {
			visual: { kind: 'ChoiceCards' },
		} as ConfigurableDesign;

		expect(buildChoiceCardSettings(design)).toMatchObject({
			buttonOpacity: undefined,
			buttonSelectOpacity: undefined,
		});
	});
});
