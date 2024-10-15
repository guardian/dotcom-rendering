import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/format';
import { formatToFEFormat } from './format';

describe('formatToFEFormat', () => {
	it('returns the correct FEFormat given an ArticleFormat', () => {
		expect(
			formatToFEFormat({
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Lifestyle,
			}),
		).toEqual({
			design: 'FeatureDesign',
			display: 'ImmersiveDisplay',
			theme: 'LifestylePillar',
		});
	});
});
