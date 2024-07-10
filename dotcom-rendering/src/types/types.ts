// ------------------------  //
// Frontend format types     //
// ------------------------- //

// Pillars are used for styling
// RealPillars have pillar palette colours
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article
type RealPillars = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';
type FakePillars = 'labs';
export type LegacyPillar = RealPillars | FakePillars;

// Themes are used for styling
// RealPillars have pillar palette colours and have a `Pillar` type in Scala
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article and have a `Special` type in Scala
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Theme.scala
type ThemePillar =
	| 'NewsPillar'
	| 'OpinionPillar'
	| 'SportPillar'
	| 'CulturePillar'
	| 'LifestylePillar';

type ThemeSpecial = 'SpecialReportTheme' | 'Labs' | 'SpecialReportAltTheme';
export type FETheme = ThemePillar | ThemeSpecial;

// FEDesign is what frontend gives (originating in the capi scala client) us on the Format field
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
export type FEDesign =
	| 'ArticleDesign'
	| 'PictureDesign'
	| 'GalleryDesign'
	| 'AudioDesign'
	| 'VideoDesign'
	| 'ReviewDesign'
	| 'AnalysisDesign'
	| 'CommentDesign'
	| 'ExplainerDesign'
	| 'LetterDesign'
	| 'FeatureDesign'
	| 'LiveBlogDesign'
	| 'DeadBlogDesign'
	| 'RecipeDesign'
	| 'MatchReportDesign'
	| 'InterviewDesign'
	| 'EditorialDesign'
	| 'QuizDesign'
	| 'InteractiveDesign'
	| 'PhotoEssayDesign'
	| 'PrintShopDesign'
	| 'ObituaryDesign'
	| 'FullPageInteractiveDesign'
	| 'NewsletterSignupDesign'
	| 'TimelineDesign'
	| 'ProfileDesign';

// FEDisplay is the display information passed through from frontend (originating in the capi scala client) and dictates the displaystyle of the content e.g. Immersive
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Display.scala
export type FEDisplay =
	| 'StandardDisplay'
	| 'ImmersiveDisplay'
	| 'ShowcaseDisplay'
	| 'NumberedListDisplay';

// FEFormat is the stringified version of Format passed through from Frontend.
// It gets converted to the @guardian/libs format on platform

export type FEFormat = {
	design: FEDesign;
	theme: FETheme;
	display: FEDisplay;
};

// Data types for the API request bodies from clients that require
// transformation before internal use.
// Where data types are coming from Frontend we try to use the 'FE' prefix.
//
// Prior to this we used 'CAPI' as a prefix which wasn't entirely accurate,
// and some data structures never received the prefix, meaning some are still missing it.

export interface FELinkType {
	url: string;
	title: string;
	longTitle?: string;
	iconName?: string;
	children?: FELinkType[];
	pillar?: LegacyPillar;
	more?: boolean;
	classList?: string[];
}

export interface FENavType {
	currentUrl: string;
	pillars: FELinkType[];
	otherLinks: FELinkType[];
	brandExtensions: FELinkType[];
	currentNavLink?: FELinkType;
	currentNavLinkTitle?: string;
	currentPillarTitle?: string;
	subNavSections?: {
		parent?: FELinkType;
		links: FELinkType[];
	};
	readerRevenueLinks: ReaderRevenuePositions;
}
