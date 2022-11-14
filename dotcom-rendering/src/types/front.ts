import type { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import type { ServerSideTests, Switches } from './config';
import type { EditionId } from './edition';
import type { FooterType } from './footer';
import type { FETagType } from './tag';
import type { CAPITrailType, TrailType } from './trails';

export interface FEFrontType {
	pressedPage: FEPressedPageType;
	nav: CAPINavType;
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
	mostViewed?: CAPITrailType[]; // TODO: This doesn't need to be optional
	mostCommented?: CAPITrailType;
	mostShared?: CAPITrailType;
}

export interface DCRFrontType {
	pressedPage: DCRPressedPageType;
	nav: CAPINavType;
	editionId: EditionId;
	webTitle: string;
	config: FEFrontConfigType;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	isNetworkFront: boolean;
	mostViewed: TrailType[];
	mostCommented?: TrailType;
	mostShared?: TrailType;
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

export type DCRContainerPalette =
	| 'EventPalette'
	| 'SombreAltPalette'
	| 'EventAltPalette'
	| 'InvestigationPalette'
	| 'LongRunningAltPalette'
	| 'LongRunningPalette'
	| 'SombrePalette'
	| 'BreakingPalette'
	| 'SpecialReportAltPalette';

// TODO: These may need to be declared differently than the front types in the future
export type DCRContainerType = FEContainerType;

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
							credit: string;
							mediaId: string;
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
				format: CAPIFormat;
			};
			fields: {
				main: string;
				body: string;
				standfirst?: string;
			};
			elements: Record<string, unknown>;
			tags: { tags: FETagType[] };
		};
		maybeContentId?: string;
		isLiveBlog: boolean;
		isCrossword: boolean;
		byline?: string;
		image?: {
			type: string;
			item: {
				imgSource?: string;
			};
		};
		webTitle: string;
		linkText?: string;
		webUrl?: string;
		editionBrandings: { edition: { id: EditionId } }[];
		href?: string;
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
			type: string;
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
	format?: CAPIFormat;
	enriched?: FESnapType;
	supportingContent?: FESupportingContent[];
	cardStyle?: {
		type: string;
	};
	type: string;
};

export type DCRFrontCard = {
	format: ArticleFormat;
	url: string;
	headline: string;
	trailText?: string;
	starRating?: number;
	webPublicationDate?: string;
	image?: string;
	kickerText?: string;
	snapData?: DCRSnapType;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionId?: string;
	byline?: string;
	showByline?: boolean;
	avatarUrl?: string;
};

export type FESnapType = {
	embedHtml?: string;
	embedCss?: string;
	embedJs?: string;
};

export type DCRSnapType = {
	embedHtml?: string;
	embedCss?: string;
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
};

export type DCRCollectionType = {
	id: string;
	displayName: string;
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
};

export type DCRGroupedTrails = {
	snap: TrailType[];
	huge: TrailType[];
	veryBig: TrailType[];
	big: TrailType[];
	standard: TrailType[];
};

type FEFrontConfigType = {
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
	sharedAdTargeting: { [key: string]: unknown };
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
	commercial: Record<string, unknown>;
	isPaidContent?: boolean;
};

export type FESupportingContent = {
	properties: {
		href?: string;
	};
	header?: {
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
	format?: CAPIFormat;
};

export type DCRSupportingContent = {
	headline: string;
	url?: string;
	kickerText?: string;
	format: ArticleFormat;
};

export type TreatType = {
	links: { text: string; linkTo: string }[];
	theme?: ArticlePillar | ArticleSpecial;
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
