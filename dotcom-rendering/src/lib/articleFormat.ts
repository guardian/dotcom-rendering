import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	type ArticleTheme,
	isString,
	Pillar,
} from '@guardian/libs';
import type { FEArticleType } from '../types/frontend';
import type { TagType as Tag } from '../types/tag';

const hasSomeTag = (tagIds: string[], tags: Tag[]): boolean =>
	tags.some((tag) => tagIds.includes(tag.id));

const hasTag = (tagId: string, tags: Tag[]): boolean =>
	tags.some((tag) => tag.id === tagId);

const parseDesign = (frontendData: FEArticleType): ArticleDesign => {
	const { tags } = frontendData;

	// TODO: To parse this correctly we need: display hint, content type
	if (frontendData.format.design === 'FullPageInteractiveDesign') {
		return ArticleDesign.FullPageInteractive;
	}

	// TODO: To parse this correctly we need: content type
	if (frontendData.format.design === 'InteractiveDesign') {
		return ArticleDesign.Interactive;
	}

	if (hasTag('info/newsletter-sign-up', tags)) {
		return ArticleDesign.NewsletterSignup;
	}

	// TODO: To parse this correctly we need: content type
	if (frontendData.format.design === 'PrintShopDesign') {
		return ArticleDesign.PrintShop;
	}

	if (hasTag('type/gallery', tags)) {
		return ArticleDesign.Gallery;
	}

	// TODO: To parse this correctly we need: content type
	if (frontendData.format.design === 'PictureDesign') {
		return ArticleDesign.Picture;
	}

	if (hasTag('type/audio', tags)) {
		return ArticleDesign.Audio;
	}

	if (hasTag('type/video', tags)) {
		return ArticleDesign.Video;
	}

	if (
		hasSomeTag(
			['tone/reviews', 'tone/livereview', 'tone/albumreview'],
			tags,
		)
	) {
		return ArticleDesign.Review;
	}

	if (hasTag('tone/obituaries', tags) && !hasTag('tone/letters', tags)) {
		return ArticleDesign.Obituary;
	}

	if (hasTag('tone/analysis', tags)) {
		return ArticleDesign.Analysis;
	}

	if (hasTag('tone/explainers', tags)) {
		return ArticleDesign.Explainer;
	}

	if (hasTag('tone/comment', tags)) {
		return ArticleDesign.Comment;
	}

	if (hasTag('tone/letters', tags)) {
		return ArticleDesign.Letter;
	}

	// TODO: To parse this correctly we need: display hint
	if (frontendData.format.design === 'PhotoEssayDesign') {
		return ArticleDesign.PhotoEssay;
	}

	if (hasTag('tone/interview', tags)) {
		return ArticleDesign.Interview;
	}

	if (hasTag('tone/recipes', tags)) {
		return ArticleDesign.Recipe;
	}

	if (hasTag('tone/editorials', tags)) {
		return ArticleDesign.Editorial;
	}

	if (hasTag('tone/quizzes', tags)) {
		return ArticleDesign.Quiz;
	}

	// TODO: To parse this correctly we need: `liveBloggingNow`
	if (frontendData.format.design === 'LiveBlogDesign') {
		return ArticleDesign.LiveBlog;
	}

	// TODO: To parse this correctly we need: `liveBloggingNow`
	if (frontendData.format.design === 'DeadBlogDesign') {
		return ArticleDesign.DeadBlog;
	}

	if (hasTag('tone/features', tags)) {
		return ArticleDesign.Feature;
	}

	if (hasTag('tone/matchreports', tags)) {
		return ArticleDesign.MatchReport;
	}

	if (hasTag('tone/timelines', tags)) {
		return ArticleDesign.Timeline;
	}

	if (hasTag('tone/profiles', tags)) {
		return ArticleDesign.Profile;
	}

	return ArticleDesign.Standard;
};

const parseDisplay = (frontendData: FEArticleType): ArticleDisplay => {
	// TODO: To parse this correctly we need: display hint, content type
	if (frontendData.format.design === 'FullPageInteractiveDesign') {
		return ArticleDisplay.Standard;
	}

	// TODO: To parse this correctly we need: display hint
	if (frontendData.format.display === 'ImmersiveDisplay') {
		return ArticleDisplay.Immersive;
	}

	// TODO: To parse this correctly we need: display hint
	if (frontendData.format.display === 'NumberedListDisplay') {
		return ArticleDisplay.NumberedList;
	}

	// TODO: To parse this correctly we need: display hint, content type
	if (frontendData.format.display === 'ShowcaseDisplay') {
		return ArticleDisplay.Showcase;
	}

	return ArticleDisplay.Standard;
};

const specialReportSeries = [
	'business/series/undercover-in-the-chicken-industry',
	'business/series/britains-debt-timebomb',
	'environment/series/the-polluters',
	'news/series/hsbc-files',
	'news/series/panama-papers',
	'us-news/homan-square',
	'uk-news/series/the-new-world-of-work',
	'world/series/the-new-arrivals',
	'news/series/nauru-files',
	'us-news/series/counted-us-police-killings',
	'australia-news/series/healthcare-in-detention',
	'society/series/this-is-the-nhs',
	'news/series/facebook-files',
	'news/series/pegasus-project',
	'news/series/pandora-papers',
	'news/series/suisse-secrets',
	'uk-news/series/cost-of-the-crown',
];

const parseTheme = (frontendData: FEArticleType): ArticleTheme => {
	const { tags } = frontendData;

	// TODO: We can probably use the same hashing mechanism as the CAPI client
	// and therefore drop the frontend fallback
	if (
		hasSomeTag(specialReportSeries, tags) ||
		frontendData.format.theme === 'SpecialReportTheme'
	) {
		return ArticleSpecial.SpecialReport;
	}

	// TODO: We can probably use the same hashing mechanism as the CAPI client
	// and therefore drop the frontend fallback
	if (frontendData.format.theme === 'SpecialReportAltTheme') {
		return ArticleSpecial.SpecialReportAlt;
	}

	if (hasTag('tone/advertisement-features', tags)) {
		return ArticleSpecial.Labs;
	}

	if (
		(hasTag('tone/comment', tags) && frontendData.pillar === 'news') ||
		(hasTag('tone/letters', tags) && frontendData.pillar === 'news') ||
		frontendData.pillar === 'opinion'
	) {
		return Pillar.Opinion;
	}

	if (frontendData.pillar === 'sport') {
		return Pillar.Sport;
	}

	if (frontendData.pillar === 'culture') {
		return Pillar.Culture;
	}

	if (frontendData.pillar === 'lifestyle') {
		return Pillar.Lifestyle;
	}

	return Pillar.News;
};

export const parse = (frontendData: FEArticleType): ArticleFormat => ({
	design: parseDesign(frontendData),
	display: parseDisplay(frontendData),
	theme: parseTheme(frontendData),
});

export const getThemeNameAsString = (format: ArticleFormat): string => {
	const themeName = Pillar[format.theme] ?? ArticleSpecial[format.theme];
	if (!themeName) throw new Error('Unknown theme');
	return themeName;
};

/**
 * We need a type guard because TypeScript enums are (confusingly)
 * returning both strings and numbers.
 */
const isTheme = (theme: string | ArticleTheme): theme is ArticleTheme =>
	!isString(theme);

export const getAllThemes = ({
	display,
	design,
}: {
	display: ArticleDisplay;
	design: ArticleDesign;
}): Array<ArticleFormat> =>
	Object.values({ ...Pillar, ...ArticleSpecial })
		.filter(isTheme)
		.map((theme) => ({
			theme,
			display,
			design,
		}));
