import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { EditionId } from '../lib/edition';
import type { FEArticleBadgeType } from './badge';
import type { CommercialProperties } from './commercial';
import type { ConfigType, ServerSideTests } from './config';
import type {
	AudioImageElement,
	FEElement,
	Newsletter,
	StarRating,
} from './content';
import type { FooterType } from './footer';
import type { FEOnwards } from './onwards';
import type { MatchType } from './sport';
import type { TagType } from './tag';
import type { FETrailType } from './trails';

/**
 * This type is what we receive from `frontend`,
 * hence the FE prefix.
 *
 * WARNING: run `gen-schema` task if changing this to update the associated JSON
 * schema definition.
 */
export interface FEArticleType {
	headline: string;
	standfirst: string;
	affiliateLinksDisclaimer?: string;
	webTitle: string;
	mainMediaElements: FEElement[];
	main: string;
	keyEvents: Block[];
	blocks: Block[];
	pinnedPost?: Block;
	pagination?: Pagination;
	byline?: string;
	/** @deprecated - will be removed in the next model version */
	author?: unknown;

	/**
	 * @TJS-format date-time
	 */
	webPublicationDateDeprecated: string;
	webPublicationDate: string;
	webPublicationDateDisplay: string;
	webPublicationSecondaryDateDisplay: string;
	editionLongForm: string;
	editionId: EditionId;
	pageId: string;
	version: number; // TODO: check who uses?
	tags: TagType[];
	format: FEFormat;

	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string;
	pillar: LegacyPillar;

	isImmersive: boolean;
	sectionLabel: string;
	sectionUrl: string;
	sectionName?: string;
	subMetaSectionLinks: FELinkType[];
	subMetaKeywordLinks: FELinkType[];
	shouldHideAds: boolean;
	isAdFreeUser: boolean;
	openGraphData: { [key: string]: string };
	twitterData: { [key: string]: string };
	webURL: string;
	linkedData: { [key: string]: any }[];
	config: ConfigType;

	showBottomSocialButtons: boolean;
	shouldHideReaderRevenue: boolean;

	// AMP specific (for now)
	guardianBaseURL: string;
	contentType: string;
	hasRelated: boolean;
	publication: string; // TODO: check who uses?
	hasStoryPackage: boolean;
	storyPackage?: {
		trails: FETrailType[];
		heading: string;
	};
	onwards?: FEOnwards[];
	beaconURL: string;
	isCommentable: boolean;
	commercialProperties: CommercialProperties;
	starRating?: StarRating;
	audioArticleImage?: AudioImageElement;
	trailText: string;
	badge?: FEArticleBadgeType;

	nav: FENavType; // TODO move this out as most code uses a different internal NAV model.

	pageFooter: FooterType;

	contributionsServiceUrl: string;
	slotMachineFlags?: string;

	pageType: PageTypeType;

	matchUrl?: string;
	matchType?: MatchType;
	isSpecialReport: boolean;

	// Interactives made on Frontend rather than DCR require special handling.
	// The logic is date-driven. See:
	// https://github.com/guardian/frontend/blob/main/common/app/model/dotcomrendering/InteractiveSwitchOver.scala#L7.
	isLegacyInteractive?: boolean;
	filterKeyEvents: boolean;

	// Included on live and dead blogs. Used when polling
	mostRecentBlockId?: string;

	promotedNewsletter?: Newsletter;
	canonicalUrl: string;
	showTableOfContents: boolean;
	lang?: string;
	isRightToLeftLang?: boolean;
}

type PageTypeType = {
	hasShowcaseMainElement: boolean;
	isFront: boolean;
	isLiveblog: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	isPreview: boolean;
	isSensitive: boolean;
};

/**
 * BlocksRequest is the expected body format for POST requests made to /Blocks
 */
export interface FEBlocksRequest {
	blocks: Block[];
	format: FEFormat;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: SharedAdTargeting;
	adUnit: string;
	videoDuration?: number;
	switches: { [key: string]: boolean };
	abTests?: ServerSideTests;
	keywordIds: string;
}

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
	| 'ProfileDesign'; // FEDisplay is the display information passed through from frontend (originating in the capi scala client) and dictates the displaystyle of the content e.g. Immersive
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

// Pillars are used for styling
// RealPillars have pillar palette colours
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article
type RealPillars = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';
type FakePillars = 'labs';
export type LegacyPillar = RealPillars | FakePillars;
