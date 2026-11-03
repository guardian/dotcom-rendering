import type { TagType } from '../types/tag';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	containsSeriesTag,
	decideDesign,
	decideFormat,
	decideTheme,
	formatToString,
	getAllDesigns,
	getAllThemes,
	getArticleThemeString,
	hasImmersiveGridTitle,
	isHostedContentDesign,
	isImmersiveOpinion,
	isOpinionDesign,
	Pillar,
} from './articleFormat';

const standardFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const immersiveFormat = {
	...standardFormat,
	display: ArticleDisplay.Immersive,
};

const seriesTag: TagType = {
	id: 'series/example',
	type: 'Series',
	title: 'Example series',
};

const blogTag: TagType = {
	id: 'blog/example',
	type: 'Blog',
	title: 'Example blog',
};

describe('article format conversion', () => {
	it('converts a frontend format', () => {
		expect(
			decideFormat({
				design: 'RecipeDesign',
				display: 'ShowcaseDisplay',
				theme: 'LifestylePillar',
			}),
		).toEqual({
			design: ArticleDesign.Recipe,
			display: ArticleDisplay.Showcase,
			theme: Pillar.Lifestyle,
		});
	});

	it('uses standard news defaults for an empty format', () => {
		expect(decideFormat({})).toEqual(standardFormat);
	});

	it('downgrades immersive comments to standard display', () => {
		expect(
			decideFormat({
				design: 'CommentDesign',
				display: 'ImmersiveDisplay',
				theme: 'OpinionPillar',
			}),
		).toEqual({
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
			theme: Pillar.Opinion,
		});
	});

	it('converts hosted and special formats', () => {
		expect(decideDesign({ design: 'HostedGalleryDesign' })).toBe(
			ArticleDesign.HostedGallery,
		);
		expect(decideTheme({ theme: 'SpecialReportAltTheme' })).toBe(
			ArticleSpecial.SpecialReportAlt,
		);
	});
});

describe('article format classification', () => {
	it.each([
		ArticleDesign.Comment,
		ArticleDesign.Editorial,
		ArticleDesign.Letter,
	])('classifies %s as an opinion design', (design) => {
		expect(isOpinionDesign(design)).toBe(true);
	});

	it.each([
		ArticleDesign.Standard,
		ArticleDesign.Analysis,
		ArticleDesign.WeekendEssay,
	])('does not classify %s as an opinion design', (design) => {
		expect(isOpinionDesign(design)).toBe(false);
	});

	it.each([
		ArticleDesign.Comment,
		ArticleDesign.Editorial,
		ArticleDesign.Letter,
		ArticleDesign.WeekendEssay,
	])('classifies immersive %s as immersive opinion', (design) => {
		expect(
			isImmersiveOpinion({
				...immersiveFormat,
				design,
			}),
		).toBe(true);
	});

	it('requires immersive display for immersive opinion', () => {
		expect(
			isImmersiveOpinion({
				...standardFormat,
				design: ArticleDesign.Comment,
			}),
		).toBe(false);
		expect(isImmersiveOpinion(immersiveFormat)).toBe(false);
	});

	it('detects series tags', () => {
		expect(containsSeriesTag([blogTag, seriesTag])).toBe(true);
		expect(containsSeriesTag([blogTag])).toBe(false);
		expect(containsSeriesTag([])).toBe(false);
	});

	it.each([
		{
			name: 'opinion design',
			format: {
				...immersiveFormat,
				design: ArticleDesign.Comment,
			},
			tags: [],
		},
		{
			name: 'Weekend Essay',
			format: {
				...immersiveFormat,
				design: ArticleDesign.WeekendEssay,
			},
			tags: [],
		},
		{
			name: 'series tag',
			format: immersiveFormat,
			tags: [seriesTag],
		},
		{
			name: 'Labs theme',
			format: {
				...immersiveFormat,
				theme: ArticleSpecial.Labs,
			},
			tags: [],
		},
	])('shows an immersive grid title for $name', ({ format, tags }) => {
		expect(hasImmersiveGridTitle(format, tags)).toBe(true);
	});

	it('does not show an immersive grid title without a qualifying format or tag', () => {
		expect(hasImmersiveGridTitle(immersiveFormat, [])).toBe(false);
		expect(
			hasImmersiveGridTitle(
				{
					...standardFormat,
					design: ArticleDesign.Comment,
					theme: ArticleSpecial.Labs,
				},
				[seriesTag],
			),
		).toBe(false);
	});
});

describe('article format enumeration', () => {
	it.each([
		ArticleDesign.HostedArticle,
		ArticleDesign.HostedVideo,
		ArticleDesign.HostedGallery,
	])('classifies %s as hosted content', (design) => {
		expect(isHostedContentDesign(design)).toBe(true);
	});

	it('excludes hosted designs by default', () => {
		const designs = getAllDesigns({
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		});

		expect(designs).not.toContainEqual({
			...standardFormat,
			design: ArticleDesign.HostedArticle,
		});
		expect(
			designs.every(
				({ display, theme }) =>
					display === ArticleDisplay.Standard &&
					theme === Pillar.News,
			),
		).toBe(true);
	});

	it('includes hosted designs when requested', () => {
		const designs = getAllDesigns({
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			includeHostedContent: true,
		});

		expect(designs).toContainEqual({
			...standardFormat,
			design: ArticleDesign.HostedArticle,
		});
	});

	it('returns every pillar and special theme', () => {
		const themes = getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		});

		expect(themes).toHaveLength(
			Object.keys(Pillar).length / 2 +
				Object.keys(ArticleSpecial).length / 2,
		);
		expect(themes).toContainEqual(standardFormat);
		expect(themes).toContainEqual({
			...standardFormat,
			theme: ArticleSpecial.Labs,
		});
	});
});

describe('article format labels', () => {
	it('formats an article format as a readable string', () => {
		expect(formatToString(standardFormat)).toBe(
			'Standard Design, Standard Display, and News Theme',
		);
	});

	it('gets article theme names', () => {
		expect(getArticleThemeString(Pillar.Lifestyle)).toBe('Lifestyle');
		expect(getArticleThemeString(ArticleSpecial.Labs)).toBe('Labs');
		expect(getArticleThemeString(undefined)).toBeUndefined();
	});
});
