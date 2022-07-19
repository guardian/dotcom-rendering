// ------------------------  //
// CAPIArticleType and its subtypes //
// ------------------------- //

type DCRSnapType = import('./src/types/front').DCRSnapType;
type DCRSupportingContent = import('./src/types/front').DCRSupportingContent;

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
type ThemeSpecial = 'SpecialReportTheme' | 'Labs';
type CAPITheme = ThemePillar | ThemeSpecial;

// CAPIDesign is what CAPI gives us on the Format field
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
type CAPIDesign =
	| 'ArticleDesign'
	| 'GalleryDesign'
	| 'AudioDesign'
	| 'VideoDesign'
	| 'ReviewDesign'
	| 'AnalysisDesign'
	| 'CommentDesign'
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
	| 'NewsletterSignupDesign';

// CAPIDisplay is the display information passed through from CAPI and dictates the displaystyle of the content e.g. Immersive
// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Display.scala
type CAPIDisplay =
	| 'StandardDisplay'
	| 'ImmersiveDisplay'
	| 'ShowcaseDisplay'
	| 'NumberedListDisplay';

// CAPIFormat is the stringified version of Format passed through from CAPI.
// It gets converted to the @guardian/libs format on platform

type CAPIFormat = {
	design: CAPIDesign;
	theme: CAPITheme;
	display: CAPIDisplay;
};

type ArticleDisplay = import('@guardian/libs').ArticleDisplay;
type ArticleDesign = import('@guardian/libs').ArticleDesign;
type ArticleTheme = import('@guardian/libs').ArticleTheme;
type ArticleFormat = import('@guardian/libs').ArticleFormat;
type ArticlePillar = ArticleTheme;

// This is an object that allows you Type defaults of the designTypes.
// The return type looks like: { Feature: any, Live: any, ...}
// and can be used to add TypeSafety when needing to override a style in a designType

type DesignTypesObj = { [key in ArticleDesign]: any };

type Colour = string;

type Palette = {
	text: {
		headline: Colour;
		seriesTitle: Colour;
		sectionTitle: Colour;
		seriesTitleWhenMatch: Colour;
		byline: Colour;
		twitterHandle: Colour;
		twitterHandleBelowDesktop: Colour;
		caption: Colour;
		captionLink: Colour;
		subMeta: Colour;
		subMetaLabel: Colour;
		subMetaLink: Colour;
		syndicationButton: Colour;
		articleLink: Colour;
		articleLinkHover: Colour;
		cardHeadline: Colour;
		cardByline: Colour;
		cardKicker: Colour;
		dynamoHeadline: Colour;
		dynamoKicker: Colour;
		dynamoMeta: Colour;
		linkKicker: Colour;
		cardStandfirst: Colour;
		cardFooter: Colour;
		headlineByline: Colour;
		standfirst: Colour;
		standfirstLink: Colour;
		lastUpdated: Colour;
		branding: Colour;
		disclaimerLink: Colour;
		signInLink: Colour;
		richLink: Colour;
		witnessIcon: Colour;
		witnessAuthor: Colour;
		witnessTitle: Colour;
		carouselTitle: Colour;
		calloutHeading: Colour;
		pullQuote: Colour;
		pullQuoteAttribution: Colour;
		dropCap: Colour;
		blockquote: Colour;
		numberedTitle: Colour;
		numberedPosition: Colour;
		overlayedCaption: Colour;
		shareCount: Colour;
		shareCountUntilDesktop: Colour;
		cricketScoreboardLink: Colour;
		keyEvent: Colour;
		keyEventTime: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		betaLabel: Colour;
	};
	background: {
		article: Colour;
		seriesTitle: Colour;
		sectionTitle: Colour;
		avatar: Colour;
		card: Colour;
		headline: Colour;
		headlineByline: Colour;
		bullet: Colour;
		bulletStandfirst: Colour;
		header: Colour;
		standfirst: Colour;
		richLink: Colour;
		imageTitle: Colour;
		speechBubble: Colour;
		carouselDot: Colour;
		carouselDotFocus: Colour;
		headlineTag: Colour;
		mostViewedTab: Colour;
		matchNav: Colour;
		analysisUnderline: Colour;
		matchStats: Colour;
		ageWarning: Colour;
		keyEventBullet: Colour;
		summaryEventBullet: Colour;
		keyEvent: Colour;
		keyEventFromDesktop: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
	};
	fill: {
		commentCount: Colour;
		commentCountUntilDesktop: Colour;
		shareCountIcon: Colour;
		shareCountIconUntilDesktop: Colour;
		shareIcon: Colour;
		shareIconGrayBackground: Colour;
		cameraCaptionIcon: Colour;
		richLink: Colour;
		quoteIcon: Colour;
		blockquoteIcon: Colour;
		twitterHandleBelowDesktop: Colour;
	};
	border: {
		syndicationButton: Colour;
		subNav: Colour;
		articleLink: Colour;
		articleLinkHover: Colour;
		liveBlock: Colour;
		pinnedPost: Colour;
		standfirstLink: Colour;
		headline: Colour;
		standfirst: Colour;
		richLink: Colour;
		navPillar: Colour;
		article: Colour;
		lines: Colour;
		matchTab: Colour;
		activeMatchTab: Colour;
		cricketScoreboardTop: Colour;
		cricketScoreboardDivider: Colour;
		cardSupporting: Colour;
		keyEvent: Colour;
		filterButton: Colour;
	};
	topBar: {
		card: Colour;
	};
	hover: {
		headlineByline: Colour;
		standfirstLink: Colour;
		keyEventLink: Colour;
		keyEventBullet: Colour;
		summaryEventBullet: Colour;
	};
};

type ContainerOverrides = {
	text: {
		cardHeadline: Colour;
		cardStandfirst: Colour;
		cardKicker: Colour;
		cardByline: Colour;
		cardFooter: Colour;
		cardCommentCount: Colour;
		dynamoHeadline: Colour;
		dynamoKicker: Colour;
		dynamoSublinkKicker: Colour;
		dynamoMeta: Colour;
		container: Colour;
		containerToggle: Colour;
		containerDate: Colour;
	};
	border: {
		container: Colour;
		lines: Colour;
	};
	background: {
		container: Colour;
		card: Colour;
	};
	topBar: {
		card: Colour;
	};
};

type EditionId = 'UK' | 'US' | 'INT' | 'AU';

type Edition = {
	id: EditionId;
	displayName: string;
	locale: string;
};

type SharePlatform =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'whatsApp'
	| 'linkedIn'
	| 'messenger';

// shared type declarations
interface SimpleLinkType {
	url: string;
	title: string;
}

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

interface EditionCommercialProperties {
	adTargeting: AdTargetParam[];
	branding?: Branding;
}

type CommercialProperties = { [E in EditionId]: EditionCommercialProperties };

type BrandingLogo = {
	src: string;
	link: string;
	label: string;
	dimensions: { width: number; height: number };
};

interface Branding {
	brandingType?: { name: string };
	sponsorName: string;
	logo: BrandingLogo;
	aboutThisLink: string;
	logoForDarkBackground?: BrandingLogo;
}

interface LinkType extends SimpleLinkType {
	longTitle: string;
	children?: LinkType[];
	mobileOnly?: boolean;
	pillar?: ArticlePillar;
	more?: boolean;
}

interface PillarType extends LinkType {
	pillar: ArticlePillar;
}

interface MoreType extends LinkType {
	more: true;
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

type ReaderRevenuePosition =
	| 'header'
	| 'footer'
	| 'sideMenu'
	| 'ampHeader'
	| 'ampFooter';

interface BaseNavType {
	otherLinks: MoreType;
	brandExtensions: LinkType[];
	currentNavLink: string;
	subNavSections?: SubNavType;
	readerRevenueLinks: ReaderRevenuePositions;
}

// TODO rename
interface SimpleNavType {
	pillars: PillarType[];
	otherLinks: MoreType;
	brandExtensions: LinkType[];
	readerRevenueLinks: ReaderRevenuePositions;
}

interface NavType extends BaseNavType {
	pillars: PillarType[];
}

interface SubNavBrowserType {
	currentNavLink: string;
	subNavSections?: SubNavType;
}

interface SubNavType {
	parent?: LinkType;
	links: LinkType[];
}

interface AuthorType {
	byline?: string;
	twitterHandle?: string;
	email?: string;
}

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
	elements: CAPIElement[];
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

interface FooterLink {
	text: string;
	url: string;
	dataLinkName: string;
	extraClasses?: string;
}
interface FooterType {
	footerLinks: FooterLink[][];
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
// transformation before internal use. If we use the data as-is, we avoid the
// CAPI prefix. Note also, the 'CAPI' prefix naming convention is a bit
// misleading - the model is *not* the same as the Content API content models.

interface CAPILinkType {
	url: string;
	title: string;
	longTitle?: string;
	iconName?: string;
	children?: CAPILinkType[];
	pillar?: LegacyPillar;
	more?: boolean;
	classList?: string[];
}

interface CAPINavType {
	currentUrl: string;
	pillars: CAPILinkType[];
	otherLinks: CAPILinkType[];
	brandExtensions: CAPILinkType[];
	currentNavLink?: CAPILinkType;
	currentNavLinkTitle?: string;
	currentPillarTitle?: string;
	subNavSections?: {
		parent?: CAPILinkType;
		links: CAPILinkType[];
	};
	readerRevenueLinks: ReaderRevenuePositions;
}

// WARNING: run `gen-schema` task if changing this to update the associated JSON
// schema definition.
interface CAPIArticleType {
	headline: string;
	standfirst: string;
	webTitle: string;
	mainMediaElements: CAPIElement[];
	main: string;
	keyEvents: Block[];
	blocks: Block[];
	pinnedPost?: Block;
	pagination?: Pagination;
	author: AuthorType;

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
	format: CAPIFormat;

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
	subMetaSectionLinks: SimpleLinkType[];
	subMetaKeywordLinks: SimpleLinkType[];
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
	beaconURL: string;
	isCommentable: boolean;
	commercialProperties: CommercialProperties;
	starRating?: number;
	trailText: string;
	badge?: BadgeType;

	nav: CAPINavType; // TODO move this out as most code uses a different internal NAV model.

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
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
	byline?: string;
}

type StageType = 'DEV' | 'CODE' | 'PROD';

interface TagType {
	id: string;
	type: string;
	title: string;
	twitterHandle?: string;
	paidContentType?: string;
	bylineImageUrl?: string;
	bylineLargeImageUrl?: string;
}

/**
 * BlocksRequest is the expected body format for POST requests made to /Blocks
 */
interface BlocksRequest {
	blocks: Block[];
	format: CAPIFormat;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: Record<string, unknown>;
	adUnit: string;
	videoDuration?: number;
	switches: { [key: string]: boolean };
}

/**
 * KeyEventsRequest is the expected body format for POST requests made to /KeyEvents
 */
interface KeyEventsRequest {
	keyEvents: Block[];
	format: CAPIFormat;
	filterKeyEvents: boolean;
}

interface BadgeType {
	seriesTag: string;
	imageUrl: string;
}

type ImagePositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';

type ImageSizeType = 'small' | 'medium' | 'large' | 'jumbo';

type SmallHeadlineSize =
	| 'tiny'
	| 'small'
	| 'medium'
	| 'large'
	| 'huge'
	| 'ginormous';

type AvatarType = {
	src: string;
	alt: string;
};

type MediaType = 'Video' | 'Audio' | 'Gallery';

type LineEffectType = 'labs' | 'dotted' | 'straight';

type LeftColSize = 'compact' | 'wide';

type CardPercentageType = '25%' | '34%' | '50%' | '66%' | '75%' | '100%';

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

/**
 * Onwards
 */
type OnwardsType = {
	heading: string;
	trails: TrailType[];
	description?: string;
	url?: string;
	ophanComponentName: OphanComponentName;
	format: ArticleFormat;
	isCuratedContent?: boolean;
};

type OphanComponentName =
	| 'series'
	| 'more-on-this-story'
	| 'related-stories'
	| 'related-content'
	| 'more-media-in-section'
	| 'more-galleries'
	| 'curated-content'
	| 'default-onwards'; // We should never see this in the analytics data!

interface CommercialConfigType {
	isPaidContent?: boolean;
	pageId: string;
	webPublicationDate?: number;
	headline?: string;
	author?: string;
	keywords?: string;
	section?: string;
	edition?: string;
	series?: string;
	toneIds?: string;
	contentType: string;
	ampIframeUrl: string;
}

type ServerSideTests = {
	[k: `${string}Variant`]: 'variant';
	[k: `${string}Control`]: 'control';
};

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
interface ConfigType extends CommercialConfigType {
	ajaxUrl: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	dcrSentryDsn: string;
	switches: { [key: string]: boolean };
	abTests: ServerSideTests;
	dfpAccountId: string;
	commercialBundleUrl: string;
	revisionNumber: string;
	shortUrlId: string;
	isDev?: boolean;
	googletagUrl: string;
	stage: string;
	frontendAssetsFullURL: string;
	adUnit: string;
	isSensitive: boolean;
	videoDuration?: number;
	edition: string;
	section: string;

	sharedAdTargeting: { [key: string]: any };
	isPaidContent?: boolean;
	keywordIds: string;
	showRelatedContent: boolean;
	shouldHideReaderRevenue?: boolean;
	idApiUrl: string;
	discussionApiUrl: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	isPhotoEssay?: boolean;
	references?: { [key: string]: string }[];
	host?: string;
	idUrl?: string;
	mmaUrl?: string;
	brazeApiKey?: string;
	ipsosTag?: string;
	isLiveBlog?: boolean;
	isLive?: boolean;
	isPreview?: boolean;
}

interface GADataType {
	pillar: LegacyPillar;
	webTitle: string;
	section: string;
	contentType: string;
	commissioningDesks: string;
	contentId: string;
	authorIds: string;
	keywordIds: string;
	toneIds: string;
	seriesId: string;
	isHosted: string;
	edition: string;
	beaconUrl: string;
}

// ----------------- //
// General DataTypes //
// ----------------- //

interface DCRServerDocumentData {
	page: string;
	site: string;
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	GA: GADataType;
	linkedData: { [key: string]: any };
}

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
	branding?: Branding;
	isSnap?: boolean;
	snapData?: DCRSnapType;
}
interface TrailType extends BaseTrailType {
	palette?: never;
	format: ArticleFormat;
	supportingContent?: DCRSupportingContent[];
	trailText?: string;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionId?: string;
	isBoosted?: boolean;
}

interface CAPITrailType extends BaseTrailType {
	format: CAPIFormat;
	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string;
	pillar: LegacyPillar;
}

interface TrailTabType {
	heading: string;
	trails: TrailType[];
}

interface CAPITrailTabType {
	heading: string;
	trails: CAPITrailType[];
}

interface MostViewedFooterPayloadType {
	tabs: CAPITrailTabType[];
	mostCommented: CAPITrailType;
	mostShared: CAPITrailType;
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

// ----------
// AdSlots //
// ----------
type AdSlotType =
	| 'right'
	| 'top-above-nav'
	| 'mostpop'
	| 'merchandising-high'
	| 'merchandising'
	| 'comments'
	| 'survey';

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

// ------------------------------------- //
// AMP types                             //
// ------------------------------------- //

declare namespace JSX {
	interface IntrinsicElements {
		'amp-state': any;
		'amp-form': any;
		'amp-experiment': any;
		'amp-sidebar': any;
		'amp-accordion': any;
		'amp-img': any;
		'amp-twitter': any;
		'amp-list': any;
		'amp-vimeo': any;
		'amp-facebook': any;
		'amp-video': any;
		'amp-instagram': any;
		'amp-soundcloud': any;
		'amp-iframe': any;
		'amp-analytics': any;
		'amp-pixel': any;
		'amp-ad': any;
		'amp-sticky-ad': any;
		'amp-youtube': any;
		'amp-geo': any;
		'amp-consent': any;
		'amp-live-list': any;
		'amp-audio': any;
		'amp-embed': any;
	}
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
		'gu-island': {
			name: string;
			deferUntil?: 'idle' | 'visible';
			clientOnly?: boolean;
			expediteLoading?: boolean;
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
