import type { ArticleSpecial, Pillar } from '@guardian/libs';
import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { EditionId } from '../lib/edition';
import type { DCRBadgeType } from './badge';
import type { Branding, EditionBranding } from './branding';
import type { ServerSideTests, Switches } from './config';
import type { Image } from './content';
import type { FooterType } from './footer';
import type { MainMedia } from './mainMedia';
import type { FETagType } from './tag';
import type { Territory } from './territory';
import type { FETrailType, TrailType } from './trails';

export interface FEFrontType {
	pressedPage: FEPressedPageType;
	nav: FENavType;
	editionId: EditionId;
	editionLongForm: string;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfigType;
	commercialProperties: Record<string, unknown>;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	isNetworkFront: boolean;
	mostViewed: FETrailType[];
	mostCommented?: FETrailType;
	mostShared?: FETrailType;
	deeplyRead?: FETrailType[];
	contributionsServiceUrl: string;
}

export interface DCRFrontType {
	pressedPage: DCRPressedPageType;
	nav: FENavType;
	editionId: EditionId;
	webTitle: string;
	config: FEFrontConfigType;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	isNetworkFront: boolean;
	mostViewed: TrailType[];
	mostCommented?: TrailType;
	mostShared?: TrailType;
	deeplyRead?: TrailType[];
	trendingTopics?: FETagType[];
	contributionsServiceUrl: string;
}

interface FEPressedPageType {
	id: string;
	seoData: FESeoDataType;
	frontProperties: FEFrontPropertiesType;
	collections: FECollectionType[];
}

interface DCRPressedPageType {
	id: string;
	seoData: FESeoDataType;
	frontProperties: FEFrontPropertiesType;
	collections: DCRCollectionType[];
}

type FEContainerType =
	| 'dynamic/fast'
	| 'dynamic/package'
	| 'dynamic/slow'
	| 'dynamic/slow-mpu'
	| 'fixed/large/slow-XIV'
	| 'fixed/medium/fast-XI'
	| 'fixed/medium/fast-XII'
	| 'fixed/medium/slow-VI'
	| 'fixed/medium/slow-VII'
	| 'fixed/medium/slow-XII-mpu'
	| 'fixed/small/fast-VIII'
	| 'fixed/small/slow-I'
	| 'fixed/small/slow-III'
	| 'fixed/small/slow-IV'
	| 'fixed/small/slow-V-half'
	| 'fixed/small/slow-V-mpu'
	| 'fixed/small/slow-V-third'
	| 'fixed/thrasher'
	| 'fixed/video'
	| 'fixed/video/vertical'
	| 'nav/list'
	| 'nav/media-list'
	| 'news/most-popular';

export type FEContainerPalette =
	| 'EventPalette'
	| 'SombreAltPalette'
	| 'EventAltPalette'
	| 'InvestigationPalette'
	| 'LongRunningAltPalette'
	| 'LongRunningPalette'
	| 'SombrePalette'
	| 'Canonical'
	| 'Dynamo'
	| 'Special'
	| 'DynamoLike'
	| 'Breaking'
	| 'Podcast'
	| 'Branded'
	| 'BreakingPalette'
	| 'SpecialReportAltPalette';

export type FEFrontCardStyle =
	| 'SpecialReport'
	| 'SpecialReportAlt'
	| 'LiveBlog'
	| 'DeadBlog'
	| 'Feature'
	| 'Editorial'
	| 'Comment'
	| 'Media'
	| 'Analysis'
	| 'Review'
	| 'Letters'
	| 'ExternalLink'
	| 'DefaultCardstyle';

export type DCRContainerPalette =
	| 'EventPalette'
	| 'SombreAltPalette'
	| 'EventAltPalette'
	| 'InvestigationPalette'
	| 'LongRunningAltPalette'
	| 'LongRunningPalette'
	| 'SombrePalette'
	| 'BreakingPalette'
	| 'SpecialReportAltPalette'
	| 'Branded'
	| 'MediaPalette'
	| 'PodcastPalette';

// TODO: These may need to be declared differently than the front types in the future
export type DCRContainerType = FEContainerType;

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L191-L196 */
interface MediaAsset {
	id: string;
	version: number;
	platform: string;
	mimeType?: string;
}

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L158-L169 */
export interface FEMediaAtom {
	id: string;
	// defaultHtml: string; // currently unused
	assets: MediaAsset[];
	title: string;
	duration?: number;
	source?: string;
	posterImage?: { allImages: Image[] };
	expired?: boolean;
	activeVersion?: number;
	// channelId?: string; // currently unused
}

export type FEFrontCard = {
	properties: {
		isBreaking: boolean;
		showMainVideo: boolean;
		showKickerTag: boolean;
		showByline: boolean;
		imageSlideshowReplace: boolean;
		maybeContent?: {
			trail: {
				trailPicture?: {
					allImages: {
						index: number;
						fields: {
							displayCredit?: string;
							source?: string;
							photographer?: string;
							isMaster?: string;
							altText?: string;
							height: string;
							credit?: string;
							mediaId?: string;
							width: string;
						};
						mediaType: string;
						url: string;
					}[];
				};
				byline?: string;
				thumbnailPath?: string;
				webPublicationDate: number;
			};
			metadata: {
				id: string;
				webTitle: string;
				webUrl: string;
				type: string;
				sectionId?: { value: string };
				format: FEFormat;
			};
			fields: {
				main: string;
				body: string;
				standfirst?: string;
			};
			elements: {
				mainVideo?: unknown;
				mediaAtoms: FEMediaAtom[];
				mainMediaAtom?: FEMediaAtom;
			};
			tags: { tags: FETagType[] };
		};
		maybeContentId?: string;
		isLiveBlog: boolean;
		isCrossword: boolean;
		byline?: string;
		image?: {
			type: string;
			item: {
				imageSrc?: string;
				assets?: {
					imageSrc: string;
					imageCaption?: string;
				}[];
			};
		};
		webTitle: string;
		linkText?: string;
		webUrl?: string;
		editionBrandings: EditionBranding[];
		href?: string;
		embedUri?: string;
	};
	header: {
		isVideo: boolean;
		isComment: boolean;
		isGallery: boolean;
		isAudio: boolean;
		kicker?: {
			type: string;
			item?: {
				properties: {
					kickerText: string;
				};
			};
		};
		seriesOrBlogKicker?: {
			properties: {
				kickerText: string;
			};
			name: string;
			url: string;
			id: string;
		};
		headline: string;
		url: string;
		hasMainVideoElement: boolean;
	};
	card: {
		id: string;
		cardStyle: {
			type: FEFrontCardStyle;
		};
		webPublicationDateOption?: number;
		lastModifiedOption?: number;
		trailText?: string;
		starRating?: number;
		shortUrlPath?: string;
		shortUrl: string;
		group: string;
		isLive: boolean;
	};
	discussion: {
		isCommentable: boolean;
		isClosedForComments: boolean;
		discussionId?: string;
	};
	display: {
		isBoosted: boolean;
		showBoostedHeadline: boolean;
		showQuotedHeadline: boolean;
		imageHide: boolean;
		showLivePlayable: boolean;
	};
	format?: FEFormat;
	enriched?: FESnapType;
	supportingContent?: FESupportingContent[];
	cardStyle?: {
		type: FEFrontCardStyle;
	};
	type: string;
};

export type DCRFrontCard = {
	format: ArticleFormat;
	url: string;
	headline: string;
	showQuotedHeadline: boolean;
	trailText?: string;
	starRating?: number;
	webPublicationDate?: string;
	image?: string;
	imageAltText?: string;
	kickerText?: string;
	supportingContent?: DCRSupportingContent[];
	snapData?: DCRSnapType;
	isBoosted?: boolean;
	isCrossword?: boolean;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionApiUrl: string;
	discussionId?: string;
	byline?: string;
	showByline?: boolean;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	isExternalLink: boolean;
	embedUri?: string;
	branding?: Branding;
	slideshowImages?: DCRSlideshowImage[];
	showLivePlayable: boolean;
	showMainVideo: boolean;
};

export type DCRSlideshowImage = {
	imageSrc: string;
	imageCaption?: string;
};

export type FESnapType = {
	embedHtml?: string;
	embedCss?: string;
	embedJs?: string;
};

export type DCRSnapType = {
	embedHtml?: string;
	embedCss?: string;
	embedJs?: string;
};

type FECollectionConfigType = {
	displayName: string;
	metadata?: { type: FEContainerPalette }[];
	collectionType: FEContainerType;
	href?: string;
	groups?: string[];
	uneditable: boolean;
	showTags: boolean;
	showSections: boolean;
	hideKickers: boolean;
	showDateHeader: boolean;
	showLatestUpdate: boolean;
	excludeFromRss: boolean;
	showTimestamps: boolean;
	hideShowMore: boolean;
	platform: string;
};

export type FECollectionType = {
	id: string;
	displayName: string;
	description?: string;
	curated: FEFrontCard[];
	backfill: FEFrontCard[];
	treats: FEFrontCard[];
	lastUpdate?: number;
	href?: string;
	groups?: string[];
	collectionType: FEContainerType;
	uneditable: boolean;
	showTags: boolean;
	showSections: boolean;
	hideKickers: boolean;
	showDateHeader: boolean;
	showLatestUpdate: boolean;
	config: FECollectionConfigType;
	hasMore: boolean;
	targetedTerritory?: Territory;
};

export type DCRCollectionType = {
	id: string;
	displayName: string;
	description?: string;
	collectionType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	grouped: DCRGroupedTrails;
	curated: DCRFrontCard[];
	backfill: DCRFrontCard[];
	treats: TreatType[];
	href?: string;
	config: {
		showDateHeader: boolean;
	};
	/**
	 * @property {?boolean} canShowMore - Whether the 'show more' button should be shown.
	 * nb. the value of this will typically reflect the `FECollectionType.hasMore` value we get from Frontend,
	 * except when `FECollectionType.config.hideShowMore` is set to `true`, in which case `DCRCollectionType.canShowMore`
	 * will always be `false`.
	 **/
	canShowMore?: boolean;
	editorialBadge?: DCRBadgeType;
	paidContentBadge?: DCRBadgeType;
	sponsoredContentBranding?: Branding;
	targetedTerritory?: Territory;
};

export type DCRGroupedTrails = {
	snap: DCRFrontCard[];
	huge: DCRFrontCard[];
	veryBig: DCRFrontCard[];
	big: DCRFrontCard[];
	standard: DCRFrontCard[];
};

export type FEFrontConfigType = {
	avatarApiUrl: string;
	externalEmbedHost: string;
	ajaxUrl: string;
	keywords: string;
	revisionNumber: string;
	isProd: boolean;
	switches: Switches;
	section: string;
	keywordIds: string;
	locationapiurl: string;
	sharedAdTargeting: SharedAdTargeting;
	buildNumber: string;
	abTests: ServerSideTests;
	pbIndexSites: { [key: string]: unknown }[];
	ampIframeUrl: string;
	beaconUrl: string;
	userAttributesApiUrl: string;
	host: string;
	brazeApiKey?: string;
	calloutsUrl: string;
	requiresMembershipAccess: boolean;
	onwardWebSocket: string;
	a9PublisherId: string;
	contentType: string;
	facebookIaAdUnitRoot: string;
	ophanEmbedJsUrl: string;
	idUrl: string;
	dcrSentryDsn: string;
	isFront: true;
	idWebAppUrl: string;
	discussionApiUrl: string;
	sentryPublicApiKey: string;
	omnitureAccount: string;
	dfpAccountId: string;
	pageId: string;
	forecastsapiurl: string;
	assetsPath: string;
	pillar: string;
	commercialBundleUrl: string;
	discussionApiClientHeader: string;
	membershipUrl: string;
	dfpHost: string;
	cardStyle?: string;
	googletagUrl: string;
	sentryHost: string;
	shouldHideAdverts: boolean;
	mmaUrl: string;
	membershipAccess: string;
	isPreview: boolean;
	googletagJsUrl: string;
	supportUrl: string;
	edition: string;
	discussionFrontendUrl: string;
	ipsosTag: string;
	ophanJsUrl: string;
	isPaidContent?: boolean;
	mobileAppsAdUnitRoot: string;
	plistaPublicApiKey: string;
	frontendAssetsFullURL: string;
	googleSearchId: string;
	allowUserGeneratedContent: boolean;
	dfpAdUnitRoot: string;
	idApiUrl: string;
	omnitureAmpAccount: string;
	adUnit: string;
	hasPageSkin: boolean;
	webTitle: string;
	stripePublicToken: string;
	googleRecaptchaSiteKey: string;
	discussionD2Uid: string;
	weatherapiurl: string;
	googleSearchUrl: string;
	optimizeEpicUrl: string;
	stage: StageType;
	idOAuthUrl: string;
	isSensitive: boolean;
	isDev: boolean;
	thirdPartyAppsAccount?: string;
	avatarImagesUrl: string;
	fbAppId: string;
};

type FESeoDataType = {
	id: string;
	navSection: string;
	webTitle: string;
	title?: string;
	description: string;
};

type FEFrontPropertiesType = {
	isImageDisplayed: boolean;
	commercial: {
		editionBrandings: EditionBranding[];
		editionAdTargetings: unknown;
		prebidIndexSites?: unknown;
	};
	isPaidContent?: boolean;
	onPageDescription?: string;
};

export type FESupportingContent = {
	properties: {
		href?: string;
		webUrl?: string;
	};
	header: {
		kicker?: {
			item?: {
				properties: {
					kickerText: string;
				};
			};
		};
		headline: string;
		url: string;
	};
	format?: FEFormat;
};

export type DCRSupportingContent = {
	headline: string;
	url?: string;
	kickerText?: string;
	format: ArticleFormat;
};

export type TreatType = {
	links: { text: string; title?: string; linkTo: string }[];
	theme?: Pillar | ArticleSpecial;
	editionId?: EditionId;
	imageUrl?: string;
	altText?: string;
	/** The container display name where this treat should show */
	containerTitle?: string;
	/**
	 * `pageId` is the part of the url that comes after the slash
	 *
	 * So for https://www.theguardian.com/uk it would be 'uk'
	 */
	pageId?: string;
};
