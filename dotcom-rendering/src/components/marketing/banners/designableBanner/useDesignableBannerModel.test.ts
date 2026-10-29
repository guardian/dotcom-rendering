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

	it('treats null opacities as absent and preserves zero', () => {
		const designWithNullOpacities = {
			visual: {
				kind: 'ChoiceCards',
				buttonOpacity: null,
				buttonSelectOpacity: null,
			},
		} as unknown as ConfigurableDesign;

		expect(buildChoiceCardSettings(designWithNullOpacities)).toMatchObject({
			buttonOpacity: undefined,
			buttonSelectOpacity: undefined,
		});

		const designWithZeroOpacity = {
			visual: {
				kind: 'ChoiceCards',
				buttonOpacity: 0,
				buttonSelectOpacity: 0,
			},
		} as ConfigurableDesign;

		expect(buildChoiceCardSettings(designWithZeroOpacity)).toMatchObject({
			buttonOpacity: 0,
			buttonSelectOpacity: 0,
		});
	});
});
