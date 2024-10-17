import { isString } from '@guardian/libs';
import type { FEDesign, FEDisplay, FEFormat, FETheme } from '../types/frontend';

export enum ArticleDesign {
	Standard,
	Picture,
	Gallery,
	Audio,
	Video,
	Review,
	Analysis,
	Explainer,
	Comment,
	Letter,
	Feature,
	LiveBlog,
	DeadBlog,
	Recipe,
	MatchReport,
	Interview,
	Editorial,
	Quiz,
	Interactive,
	PhotoEssay,
	Obituary,
	Correction,
	FullPageInteractive,
	NewsletterSignup,
	Timeline,
	Profile,
}

export enum ArticleDisplay {
	Standard,
	Immersive,
	Showcase,
	NumberedList,
}

export enum Pillar {
	News = 0,
	Opinion = 1,
	Sport = 2,
	Culture = 3,
	Lifestyle = 4,
}

export enum ArticleSpecial {
	SpecialReport = 5,
	Labs = 6,
	SpecialReportAlt = 7,
}

export type ArticleTheme = Pillar | ArticleSpecial;

export interface ArticleFormat {
	theme: ArticleTheme;
	design: ArticleDesign;
	display: ArticleDisplay;
}

/**
 * NOTE: Immersive Opinion pieces are not supported,
 * i.e. when `CommentDesign` and `ImmersiveDisplay` are used jointly.
 */
export const decideDesign = ({ design }: Partial<FEFormat>): ArticleDesign => {
	switch (design) {
		case 'ArticleDesign':
			return ArticleDesign.Standard;
		case 'PictureDesign':
			return ArticleDesign.Picture;
		case 'GalleryDesign':
			return ArticleDesign.Gallery;
		case 'AudioDesign':
			return ArticleDesign.Audio;
		case 'VideoDesign':
			return ArticleDesign.Video;
		case 'ReviewDesign':
			return ArticleDesign.Review;
		case 'AnalysisDesign':
			return ArticleDesign.Analysis;
		case 'CommentDesign':
			return ArticleDesign.Comment;
		case 'LetterDesign':
			return ArticleDesign.Letter;
		case 'FeatureDesign':
			return ArticleDesign.Feature;
		case 'LiveBlogDesign':
			return ArticleDesign.LiveBlog;
		case 'DeadBlogDesign':
			return ArticleDesign.DeadBlog;
		case 'RecipeDesign':
			return ArticleDesign.Recipe;
		case 'MatchReportDesign':
			return ArticleDesign.MatchReport;
		case 'InterviewDesign':
			return ArticleDesign.Interview;
		case 'EditorialDesign':
			return ArticleDesign.Editorial;
		case 'QuizDesign':
			return ArticleDesign.Quiz;
		case 'InteractiveDesign':
			return ArticleDesign.Interactive;
		case 'PhotoEssayDesign':
			return ArticleDesign.PhotoEssay;
		case 'ObituaryDesign':
			return ArticleDesign.Obituary;
		case 'FullPageInteractiveDesign':
			return ArticleDesign.FullPageInteractive;
		case 'NewsletterSignupDesign':
			return ArticleDesign.NewsletterSignup;
		case 'ExplainerDesign':
			return ArticleDesign.Explainer;
		case 'TimelineDesign':
			return ArticleDesign.Timeline;
		case 'ProfileDesign':
			return ArticleDesign.Profile;
		default:
			return ArticleDesign.Standard;
	}
};

const decideDisplay = ({
	display,
	design,
}: Partial<FEFormat>): ArticleDisplay => {
	switch (display) {
		case 'StandardDisplay':
			return ArticleDisplay.Standard;
		case 'ImmersiveDisplay':
			// Temporary hack until we can handle Immersive Comment pieces
			return design === 'CommentDesign'
				? ArticleDisplay.Standard
				: ArticleDisplay.Immersive;
		case 'ShowcaseDisplay':
			return ArticleDisplay.Showcase;
		case 'NumberedListDisplay':
			return ArticleDisplay.NumberedList;
		default:
			return ArticleDisplay.Standard;
	}
};

export const decideTheme = ({ theme }: Partial<FEFormat>): ArticleTheme => {
	switch (theme) {
		case 'NewsPillar':
			return Pillar.News;
		case 'OpinionPillar':
			return Pillar.Opinion;
		case 'SportPillar':
			return Pillar.Sport;
		case 'CulturePillar':
			return Pillar.Culture;
		case 'LifestylePillar':
			return Pillar.Lifestyle;
		case 'SpecialReportTheme':
			return ArticleSpecial.SpecialReport;
		case 'SpecialReportAltTheme':
			return ArticleSpecial.SpecialReportAlt;
		case 'Labs':
			return ArticleSpecial.Labs;
		default:
			return Pillar.News;
	}
};

export const decideFormat = (format: Partial<FEFormat>): ArticleFormat => ({
	design: decideDesign(format),
	display: decideDisplay(format),
	theme: decideTheme(format),
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

/**
 * Creates a string representation of {@linkcode ArticleFormat}. Useful for
 * logging, storybook UI etc.
 *
 * @param format An {@linkcode ArticleFormat}
 * @returns A string representation of `ArticleFormat`
 */
export const formatToString = ({
	design,
	display,
	theme,
}: ArticleFormat): string =>
	[
		`${ArticleDesign[design]} Design`,
		`${ArticleDisplay[display]} Display`,
		`and ${Pillar[theme] ?? ArticleSpecial[theme]} Theme`,
	].join(', ');
