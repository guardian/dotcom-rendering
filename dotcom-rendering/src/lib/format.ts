import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { ArticleSpecial, isString, Pillar } from '@guardian/libs';

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

const isDesign = (design: string | ArticleDesign): design is ArticleDesign =>
	!isString(design);

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
export const getAllDesigns = ({
	display,
	theme,
}: {
	display: ArticleDisplay;
	theme: ArticleTheme;
}): Array<ArticleFormat> =>
	Object.values({ ...ArticleDesign })
		.filter(isDesign)
		.map((design) => ({
			theme,
			display,
			design,
		}));

const designToFEDesign = (design: ArticleDesign): FEDesign => {
	switch (design) {
		case ArticleDesign.Standard:
		// Correction doesn't exist in `FEFormat`.
		case ArticleDesign.Correction:
			return 'ArticleDesign';
		case ArticleDesign.Picture:
			return 'PictureDesign';
		case ArticleDesign.Gallery:
			return 'GalleryDesign';
		case ArticleDesign.Audio:
			return 'AudioDesign';
		case ArticleDesign.Video:
			return 'VideoDesign';
		case ArticleDesign.Review:
			return 'ReviewDesign';
		case ArticleDesign.Analysis:
			return 'AnalysisDesign';
		case ArticleDesign.Explainer:
			return 'ExplainerDesign';
		case ArticleDesign.Comment:
			return 'CommentDesign';
		case ArticleDesign.Letter:
			return 'LetterDesign';
		case ArticleDesign.Feature:
			return 'FeatureDesign';
		case ArticleDesign.LiveBlog:
			return 'LiveBlogDesign';
		case ArticleDesign.DeadBlog:
			return 'DeadBlogDesign';
		case ArticleDesign.Recipe:
			return 'RecipeDesign';
		case ArticleDesign.MatchReport:
			return 'MatchReportDesign';
		case ArticleDesign.Interview:
			return 'InterviewDesign';
		case ArticleDesign.Editorial:
			return 'EditorialDesign';
		case ArticleDesign.Quiz:
			return 'QuizDesign';
		case ArticleDesign.Interactive:
			return 'InteractiveDesign';
		case ArticleDesign.PhotoEssay:
			return 'PhotoEssayDesign';
		case ArticleDesign.PrintShop:
			return 'PrintShopDesign';
		case ArticleDesign.Obituary:
			return 'ObituaryDesign';
		case ArticleDesign.FullPageInteractive:
			return 'FullPageInteractiveDesign';
		case ArticleDesign.NewsletterSignup:
			return 'NewsletterSignupDesign';
		case ArticleDesign.Timeline:
			return 'TimelineDesign';
		case ArticleDesign.Profile:
			return 'ProfileDesign';
	}
};

const displayToFEDisplay = (display: ArticleDisplay): FEDisplay => {
	switch (display) {
		case ArticleDisplay.Standard:
			return 'StandardDisplay';
		case ArticleDisplay.Immersive:
			return 'ImmersiveDisplay';
		case ArticleDisplay.Showcase:
			return 'ShowcaseDisplay';
		case ArticleDisplay.NumberedList:
			return 'NumberedListDisplay';
	}
};

const themeToFETheme = (theme: ArticleTheme): FETheme => {
	switch (theme) {
		case Pillar.News:
			return 'NewsPillar';
		case Pillar.Opinion:
			return 'OpinionPillar';
		case Pillar.Sport:
			return 'SportPillar';
		case Pillar.Culture:
			return 'CulturePillar';
		case Pillar.Lifestyle:
			return 'LifestylePillar';
		case ArticleSpecial.SpecialReport:
			return 'SpecialReportTheme';
		case ArticleSpecial.Labs:
			return 'Labs';
		case ArticleSpecial.SpecialReportAlt:
			return 'SpecialReportAltTheme';
	}
};

export const formatToFEFormat = ({
	design,
	display,
	theme,
}: ArticleFormat): FEFormat => ({
	design: designToFEDesign(design),
	display: displayToFEDisplay(display),
	theme: themeToFETheme(theme),
});
