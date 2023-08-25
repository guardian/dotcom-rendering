// ------------------------  //
// Frontend format types     //
// ------------------------- //

// Pillars are used for styling
// RealPillars have pillar palette colours
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article
// These are partialy kept for Google Analytics purposes
type RealPillars = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';
type FakePillars = 'labs';
type LegacyPillar = RealPillars | FakePillars;

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
type FETheme = ThemePillar | ThemeSpecial;

// FEDesign is what frontend gives (originating in the capi scala client) us on the Format field
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
type FEDesign =
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
type FEDisplay =
	| 'StandardDisplay'
	| 'ImmersiveDisplay'
	| 'ShowcaseDisplay'
	| 'NumberedListDisplay';

// FEFormat is the stringified version of Format passed through from Frontend.
// It gets converted to the @guardian/libs format on platform

type FEFormat = {
	design: FEDesign;
	theme: FETheme;
	display: FEDisplay;
};

type ArticleDisplay = import('@guardian/libs').ArticleDisplay;
type ArticleDesign = import('@guardian/libs').ArticleDesign;
type ArticleTheme = import('@guardian/libs').ArticleTheme;
type ArticleFormat = import('@guardian/libs').ArticleFormat;

// This is an object that allows you Type defaults of the designTypes.
// The return type looks like: { Feature: any, Live: any, ...}
// and can be used to add TypeSafety when needing to override a style in a designType

type DesignTypesObj = { [key in ArticleDesign]: any };

type SharePlatform =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'whatsApp'
	| 'linkedIn'
	| 'messenger';

// shared type declarations

interface AdTargetParam {
	name: string;
	value: string | string[];
}

type CustomParams = {
	sens: 't' | 'f';
	urlkw: string[];
	[key: string]: string | string[] | number | number[] | boolean | boolean[];
};

type AdTargeting =
	| {
			adUnit: string;
			customParams: CustomParams;
			disableAds?: false;
	  }
	| {
			disableAds: true;
	  };

interface SectionNielsenAPI {
	name: string;
	apiID: string;
}

interface ReaderRevenueCategories {
	contribute: string;
	subscribe: string;
	support: string;
	supporter: string;
	gifting?: string;
}

type ReaderRevenueCategory = 'contribute' | 'subscribe' | 'support';
interface ReaderRevenuePositions {
	header: ReaderRevenueCategories;
	footer: ReaderRevenueCategories;
	sideMenu: ReaderRevenueCategories;
	ampHeader: ReaderRevenueCategories;
	ampFooter: ReaderRevenueCategories;
}

type ReaderRevenuePosition = keyof ReaderRevenuePositions;

interface MembershipPlaceholder {
	campaignCode?: string;
}

interface Attributes {
	pinned: boolean;
	summary: boolean;
	keyEvent: boolean;
	membershipPlaceholder?: MembershipPlaceholder;
}

interface BlockContributor {
	name: string;
	imageUrl?: string;
	largeImageUrl?: string;
}

interface Block {
	id: string;
	elements: import('./src/types/content').FEElement[];
	attributes: Attributes;
	blockCreatedOn?: number;
	blockCreatedOnDisplay?: string;
	blockLastUpdated?: number;
	blockLastUpdatedDisplay?: string;
	title?: string;
	blockFirstPublished?: number;
	blockFirstPublishedDisplay?: string;
	blockFirstPublishedDisplayNoTimezone?: string;
	primaryDateLine: string;
	secondaryDateLine: string;
	createdOn?: number;
	createdOnDisplay?: string;
	lastUpdated?: number;
	lastUpdatedDisplay?: string;
	firstPublished?: number;
	firstPublishedDisplay?: string;
	contributors?: BlockContributor[];
}

interface Pagination {
	currentPage: number;
	totalPages: number;
	newest?: string;
	newer?: string;
	oldest?: string;
	older?: string;
}

type ContentType =
	| 'article'
	| 'network'
	| 'section'
	| 'imageContent'
	| 'interactive'
	| 'gallery'
	| 'video'
	| 'audio'
	| 'liveBlog'
	| 'tag'
	| 'index'
	| 'crossword'
	| 'survey'
	| 'signup'
	| 'userid';

type PageTypeType = {
	hasShowcaseMainElement: boolean;
	isFront: boolean;
	isLiveblog: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	isPreview: boolean;
	isSensitive: boolean;
};

type MatchType = 'CricketMatchType' | 'FootballMatchType';

type CricketTeam = {
	name: string;
	home: boolean;
};

type FallOfWicket = {
	order: number;
};

type CricketInnings = {
	order: number;
	battingTeam: string;
	runsScored: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWicket: FallOfWicket[];
	overs: string;
};

type CricketMatch = {
	matchId: string;
	competitionName: string;
	venueName: string;
	teams: CricketTeam[];
	innings: CricketInnings[];
	gameDate: string;
};

// Data types for the API request bodies from clients that require
// transformation before internal use.
// Where data types are coming from Frontend we try to use the 'FE' prefix.
//
// Prior to this we used 'CAPI' as a prefix which wasn't entirely accurate,
// and some data structures never received the prefix, meaning some are still missing it.

interface FELinkType {
	url: string;
	title: string;
	longTitle?: string;
	iconName?: string;
	children?: FELinkType[];
	pillar?: LegacyPillar;
	more?: boolean;
	classList?: string[];
}

interface FENavType {
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

type StageType = 'DEV' | 'CODE' | 'PROD';

/**
 * KeyEventsRequest is the expected body format for POST requests made to /KeyEvents
 */
interface FEKeyEventsRequest {
	keyEvents: Block[];
	format: FEFormat;
	filterKeyEvents: boolean;
}

type CardImageType = 'picture' | 'avatar' | 'crossword' | 'slideshow' | 'video';

type SmallHeadlineSize =
	| 'tiny'
	| 'small'
	| 'medium'
	| 'large'
	| 'huge'
	| 'ginormous';

type MediaType = 'Video' | 'Audio' | 'Gallery';

type LeftColSize = 'compact' | 'wide';

type CardPercentageType =
	| '25%'
	| '33.333%'
	| '50%'
	| '66.666%'
	| '75%'
	| '100%';

type HeadlineLink = {
	to: string; // the href for the anchor tag
	visitedColour?: string; // a custom colour for the :visited state
	preventFocus?: boolean; // if true, stop the link from being tabbable and focusable
};

type UserBadge = {
	name: string;
};

type UserProfile = {
	userId: string;
	displayName: string;
	webUrl: string;
	apiUrl: string;
	avatar: string;
	secureAvatarUrl: string;
	badge: UserBadge[];

	// only included from /profile/me endpoint
	privateFields?: {
		canPostComment: boolean;
		isPremoderated: boolean;
		hasCommented: boolean;
	};
};

/**
 * Football
 */
type TeamType = {
	id: string;
	name: string;
	codename: string;
	players: PlayerType[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	score: number;
	crest: string;
	scorers: string[];
};

type PlayerType = {
	id: string;
	name: string;
	position: string;
	lastName: string;
	substitute: boolean;
	timeOnPitch: string;
	shirtNumber: string;
	events: EventType[];
};

type EventType = {
	eventTime: string; // minutes
	eventType: 'substitution' | 'dismissal' | 'booking';
};

type MatchReportType = {
	id: string;
	isResult: boolean;
	homeTeam: TeamType;
	awayTeam: TeamType;
	competition: {
		fullName: string;
	};
	isLive: boolean;
	venue: string;
	comments: string;
	minByMinUrl: string;
	reportUrl: string;
};

interface Topic {
	type: TopicType;
	value: string;
	count?: number;
}

type TopicType = 'ORG' | 'PRODUCT' | 'PERSON' | 'GPE' | 'WORK_OF_ART' | 'LOC';

interface MessageUs {
	formId: string;
	formFields: import('./src/types/content').MessageUsFieldType[];
}

// ----------------- //
// General DataTypes //
// ----------------- //

interface BaseTrailType {
	url: string;
	headline: string;
	webPublicationDate?: string;
	image?: string;
	avatarUrl?: string;
	mediaType?: MediaType;
	mediaDuration?: number;
	ageWarning?: string;
	byline?: string;
	showByline?: boolean;
	kickerText?: string;
	shortUrl?: string;
	commentCount?: number;
	starRating?: number;
	linkText?: string;
	branding?: import('./src/types/branding').Branding;
	isSnap?: boolean;
	snapData?: import('./src/types/front').DCRSnapType;
}

// ------------
// Liveblogs //
// ------------
type LiveUpdateType = {
	numNewBlocks: number;
	html: string;
	mostRecentBlockId: string;
};

// ------------
// RichLinks //
// ------------
type RichLinkCardType =
	| 'special-report'
	| 'live'
	| 'dead'
	| 'feature'
	| 'editorial'
	| 'comment'
	| 'podcast'
	| 'media'
	| 'analysis'
	| 'review'
	| 'letters'
	| 'external'
	| 'news';

// ------------------------------
// 3rd party type declarations //
// ------------------------------

declare module 'chromatic/isChromatic';

declare module 'dynamic-import-polyfill' {
	export const initialize: ({
		modulePath,
		importFunctionName,
	}: {
		modulePath?: string;
		importFunctionName?: string;
	}) => void;
}

// SVG handling
declare module '*.svg' {
	const content: any;
	// eslint-disable-next-line import/no-default-export -- This is how we import SVGs
	export default content;
}

// Extend PerformanceEntry from lib.dom.ts with current 'In Draft' properties (to allow access as use in browsers that support)
// lib.dom.ts: https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.performanceentry.html
// Draft: https://wicg.github.io/element-timing/#sec-performance-element-timing
interface PerformanceEntry {
	loadTime: number;
	renderTime: number;
}

declare namespace JSX {
	interface IntrinsicElements {
		// ------------------------------------- //
		// AMP types                             //
		// ------------------------------------- //
		'amp-accordion': any;
		'amp-ad': any;
		'amp-analytics': any;
		'amp-audio': any;
		'amp-consent': any;
		'amp-embed': any;
		'amp-experiment': any;
		'amp-facebook': any;
		'amp-form': any;
		'amp-geo': any;
		'amp-iframe': any;
		'amp-img': any;
		'amp-instagram': any;
		'amp-list': any;
		'amp-live-list': any;
		'amp-pixel': any;
		'amp-script': any;
		'amp-sidebar': any;
		'amp-soundcloud': any;
		'amp-state': any;
		'amp-sticky-ad': any;
		'amp-twitter': any;
		'amp-video': any;
		'amp-vimeo': any;
		'amp-youtube': any;

		/** Island {@link ./src/components/Island.tsx} */
		'gu-island': {
			name: string;
			deferUntil?: 'idle' | 'visible' | 'interaction' | 'hash';
			rootMargin?: string;
			clientOnly?: boolean;
			props: any;
			children: React.ReactNode;
		};
	}

	interface IntrinsicAttributes {
		/**
		 * **Rendered Components – Ophan**
		 *
		 * The Ophan client automatically tracks components on the page
		 * that have the `data-component` attribute.
		 * To avoid race conditions, it is best to add this attribute only
		 * to server-rendered HTML.
		 *
		 * Add `data-component="component-name"` to the element you want
		 * to track.
		 *
		 * The page views table will then contain `component-name` when the
		 * element is present on the page.
		 */
		'data-component'?: string;
		/**
		 * **Component Clicks – Ophan**
		 *
		 * The Ophan client automatically tracks click interactions
		 * on components that have the `data-link-name` attribute.
		 * To avoid race conditions, it is best to add this attribute only
		 * to server-rendered HTML.
		 *
		 * Add `data-component="component-name"` to the element you want
		 * to track. Then `add data-link-name="link-name"` to the anchor for which
		 * clicks will be tracked.
		 *
		 * The page views table will then contain `link-name` when the
		 * link is clicked.
		 */
		'data-link-name'?: string;
	}
}
