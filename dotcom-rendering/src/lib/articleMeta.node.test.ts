import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { ArticleDesign, ArticleDisplay, Pillar } from './articleFormat';
import { shouldShowContributor } from './articleMeta';

void nodeDescribe('shouldShowContributor', () => {
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

	void nodeIt(
		'should return true if Standard display and Standard design',
		() => {
			assert.equal(shouldShowContributor(standardFormat), true);
		},
	);

	void nodeIt(
		'should return false if Standard display and Comment design',
		() => {
			assert.equal(shouldShowContributor(standardComment), false);
		},
	);

	void nodeIt(
		'should return true if Showcase display and Standard design',
		() => {
			assert.equal(shouldShowContributor(showcaseStandard), true);
		},
	);

	void nodeIt(
		'should return false if Showcase display and Comment design',
		() => {
			assert.equal(shouldShowContributor(showcaseComment), false);
		},
	);

	void nodeIt('should return true if Numbered list display', () => {
		assert.equal(shouldShowContributor(numberedList), true);
	});

	void nodeIt('should return false if Immersive display', () => {
		assert.equal(shouldShowContributor(immersive), false);
	});

	void nodeIt(
		'should return true if Immersive display uses the new grid',
		() => {
			assert.equal(shouldShowContributor(immersive, true), true);
		},
	);
});
