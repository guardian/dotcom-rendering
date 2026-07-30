import { ArticleDesign, ArticleDisplay, Pillar } from './articleFormat';
import { shouldShowContributor } from './articleMeta';

describe('shouldShowContributor', () => {
	const standardFormat = {
		theme: Pillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};
	const standardComment = {
		...standardFormat,
		design: ArticleDesign.Comment,
	};
	const showcaseStandard = {
		...standardFormat,
		display: ArticleDisplay.Showcase,
	};
	const showcaseComment = {
		...showcaseStandard,
		design: ArticleDesign.Comment,
	};
	const numberedList = {
		...standardFormat,
		display: ArticleDisplay.NumberedList,
	};

	const immersive = {
		...standardFormat,
		display: ArticleDisplay.Immersive,
	};

	const immersivePortraitDefault = {
		...immersive,
		layoutType: 'immersivePortraitDefault',
	};
	const immersivePortraitFeature = {
		...immersive,
		layoutType: 'immersivePortraitFeature',
	};
	const immersiveLandscapeDefault = {
		...immersive,
		layoutType: 'immersiveLandscapeDefault',
	};
	const immersiveLandscapeFeature = {
		...immersive,
		layoutType: 'immersiveLandscapeFeature',
	};

	it('should return true if Standard display and Standard design', () => {
		expect(shouldShowContributor(standardFormat)).toBe(true);
	});

	it('should return false if Standard display and Comment design', () => {
		expect(shouldShowContributor(standardComment)).toBe(false);
	});

	it('should return true if Showcase display and Standard design', () => {
		expect(shouldShowContributor(showcaseStandard)).toBe(true);
	});

	it('should return false if Showcase display and Comment design', () => {
		expect(shouldShowContributor(showcaseComment)).toBe(false);
	});

	it('should return true if Numbered list display', () => {
		expect(shouldShowContributor(numberedList)).toBe(true);
	});

	it('should return false if Immersive display', () => {
		expect(shouldShowContributor(immersive)).toBe(true);
	});

	it('should return true if Immersive display and immersivePortraitDefault layout', () => {
		expect(shouldShowContributor(immersivePortraitDefault)).toBe(true);
	});

	it('should return true if Immersive display and immersivePortraitFeature layout', () => {
		expect(shouldShowContributor(immersivePortraitFeature)).toBe(true);
	});

	it('should return true if Immersive display and immersiveLandscapeDefault layout', () => {
		expect(shouldShowContributor(immersiveLandscapeDefault)).toBe(true);
	});

	it('should return true if Immersive display and immersiveLandscapeFeature layout', () => {
		expect(shouldShowContributor(immersiveLandscapeFeature)).toBe(true);
	});
});
