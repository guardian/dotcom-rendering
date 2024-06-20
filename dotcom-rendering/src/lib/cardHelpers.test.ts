import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { isUnsupportedFormatForCardWithoutBackground } from './cardHelpers';

describe('isUnsupportedFormatForCardWithoutBackground', () => {
	const standardArticleFormat = {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.News,
	};

	it('should return false for ArticleDesign.Picture', () => {
		const format = {
			...standardArticleFormat,
			design: ArticleDesign.Picture,
		};
		expect(isUnsupportedFormatForCardWithoutBackground(format)).toBe(false);
	});

	it('should return true for ArticleDesign.Gallery', () => {
		const format = {
			...standardArticleFormat,
			design: ArticleDesign.Gallery,
		};
		expect(isUnsupportedFormatForCardWithoutBackground(format)).toBe(true);
	});
});
