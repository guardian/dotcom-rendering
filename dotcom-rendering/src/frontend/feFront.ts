import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { EditionId } from '../lib/edition';
import type { EditionBranding } from '../types/branding';
import type { ServerSideTests, StageType, Switches } from '../types/config';
import type { BoostLevel, Image, StarRating } from '../types/content';
import type { FooterType } from '../types/footer';
import type { FENavType } from '../types/frontend';
import type { FETagType } from '../types/tag';
import type { Territory } from '../types/territory';
import type { FETrailType } from '../types/trails';
import type { FEFormat } from './feArticle';

export interface FEFront {
	pressedPage: FEPressedPage;
	nav: FENavType;
	editionId: EditionId;
	editionLongForm: string;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfig;
	commercialProperties: Record<string, unknown>;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	isNetworkFront: boolean;
	mostViewed: FETrailType[];
	deeplyRead?: FETrailType[];
	contributionsServiceUrl: string;
	canonicalUrl?: string;
}

interface FEPressedPage {
	id: string;
	seoData: FESeoData;
	frontProperties: FEFrontProperties;
	collections: FECollection[];
}

/* This list of containers supported in DCR must be kept up to date with frontend **manually**.
 * @see https://github.com/guardian/frontend/blob/167dce23a8453ed13a97fbd23c7fc45ecb06e3fe/facia/app/services/dotcomrendering/FaciaPicker.scala#L21-L45 */
export type FEContainer =
	| 'fixed/thrasher'
	| 'nav/list'
	| 'nav/media-list'
	| 'news/most-popular'
	| 'scrollable/highlights'
	| 'flexible/special'
	| 'flexible/general'
	| 'scrollable/small'
	| 'scrollable/medium'
	| 'scrollable/feature'
	| 'static/feature/2'
	| 'static/medium/4';

export type FEContainerLevel = 'Primary' | 'Secondary';

export type FEContainerMetadata =
	| 'EventPalette'
	| 'SombreAltPalette'
	| 'EventAltPalette'
	| 'InvestigationPalette'
	| 'LongRunningAltPalette'
	| 'LongRunningPalette'
	| 'SombrePalette'
	| 'Canonical'
	| 'Special'
	| 'DynamoLike'
	| 'Breaking'
	| 'Podcast'
	| 'Branded'
	| 'BreakingPalette'
	| 'SpecialReportAltPalette'
	| 'Secondary';

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

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L191-L196 */
export interface FEMediaAsset {
	id: string;
	version: number;
	platform: string;
	mimeType?: string;
	assetType: string;
	dimensions?: {
		width: number;
		height: number;
	};
	hasAudio?: boolean;
}

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L158-L169 */
export interface FEMediaAtom {
	id: string;
	// defaultHtml: string; // currently unused
	assets: FEMediaAsset[];
	title: string;
	duration?: number;
	source?: string;
	posterImage?: { allImages: Image[] };
	trailImage?: { allImages: Image[] };
	expired?: boolean;
	activeVersion?: number;
	videoPlayerFormat?: 'Default' | 'Loop' | 'Cinemagraph';
	// channelId?: string; // currently unused
}

export type FEFrontCard = {
	properties: {
		isBreaking: boolean;
		/** Legacy fields retained for backward compatibility:
		 * `showMainVideo` and `imageSlideshowReplace` have been moved into `mediaSelect`,
		 * but must remain at the top level to support unrepressed or older front data.
		 */
		showMainVideo?: boolean;
		imageSlideshowReplace?: boolean;
		mediaSelect?: {
			showMainVideo: boolean;
			imageSlideshowReplace: boolean;
			videoReplace: boolean;
		};
		showKickerTag: boolean;
		showByline: boolean;
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
		starRating?: StarRating;
		shortUrlPath?: string;
		shortUrl: string;
		group: string;
		isLive: boolean;
		galleryCount?: number;
		audioDuration?: string;
	};
	discussion: {
		isCommentable: boolean;
		isClosedForComments: boolean;
		discussionId?: string;
	};
	display: {
		isBoosted: boolean;
		boostLevel?: BoostLevel;
		isImmersive?: boolean;
		showBoostedHeadline: boolean;
		showQuotedHeadline: boolean;
		imageHide: boolean;
		showLivePlayable: boolean;
	};
	format?: FEFormat;
	enriched?: FESnap;
	mediaAtom?: FEMediaAtom;
	supportingContent?: FESupportingContent[];
	cardStyle?: {
		type: FEFrontCardStyle;
	};
	type: string;
};

export type FESnap = {
	embedHtml?: string;
	embedCss?: string;
	embedJs?: string;
};

export type FEAspectRatio = '5:3' | '5:4' | '4:5' | '1:1';

type FECollectionConfig = {
	displayName: string;
	metadata?: { type: FEContainerMetadata }[];
	collectionType: FEContainer;
	collectionLevel?: FEContainerLevel;
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
	hideShowMore?: boolean; // deprecated. Collections no longer show more content.
	platform: string;
	aspectRatio?: FEAspectRatio;
};

export type FECollection = {
	id: string;
	displayName: string;
	description?: string;
	curated: FEFrontCard[];
	backfill: FEFrontCard[];
	treats: FEFrontCard[];
	lastUpdate?: number;
	href?: string;
	groups?: string[];
	collectionType: FEContainer;
	uneditable: boolean;
	showTags: boolean;
	showSections: boolean;
	hideKickers: boolean;
	showDateHeader: boolean;
	showLatestUpdate: boolean;
	config: FECollectionConfig;
	hasMore?: boolean; // deprecated. Collections no longer show more content.
	targetedTerritory?: Territory;
};

export type FEFrontConfig = {
	abTests: ServerSideTests;
	adUnit: string;
	ajaxUrl: string;
	brazeApiKey?: string;
	commercialBundleUrl: string;
	dcrSentryDsn: string;
	dfpAccountId: string;
	discussionApiClientHeader: string;
	discussionApiUrl: string;
	discussionD2Uid: string;
	edition: string;
	frontendAssetsFullURL: string;
	googleRecaptchaSiteKey: string;
	googletagUrl: string;
	hasPageSkin: boolean;
	host: string;
	idApiUrl: string;
	idUrl: string;
	ipsosTag: string;
	isDev: boolean;
	isFront: true;
	isPaidContent?: boolean;
	isPreview: boolean;
	isProd: boolean;
	isSensitive: boolean;
	keywordIds: string;
	mmaUrl: string;
	pageId: string;
	section: string;
	sentryHost: string;
	sentryPublicApiKey: string;
	serverSideABTests: Record<string, string>;
	sharedAdTargeting: SharedAdTargeting;
	stage: StageType;
	supportUrl: string;
	switches: Switches;
	webTitle: string;
} & FELegacyConfig;

/**
 * Config sent in the payload from frontend to DCR but seems to be not used here
 *
 * If not used we should remove these properties from the Frontend model
 */
type FELegacyConfig = {
	a9PublisherId: string;
	allowUserGeneratedContent: boolean;
	ampIframeUrl: string;
	assetsPath: string;
	avatarApiUrl: string;
	avatarImagesUrl: string;
	beaconUrl: string;
	buildNumber: string;
	calloutsUrl: string;
	cardStyle?: string;
	contentType: string;
	dfpAdUnitRoot: string;
	dfpHost: string;
	externalEmbedHost: string;
	facebookIaAdUnitRoot: string;
	fbAppId: string;
	forecastsapiurl: string;
	googleSearchId: string;
	googleSearchUrl: string;
	googletagJsUrl: string;
	idOAuthUrl: string;
	idWebAppUrl: string;
	keywords: string;
	locationapiurl: string;
	membershipAccess: string;
	membershipUrl: string;
	mobileAppsAdUnitRoot: string;
	omnitureAccount: string;
	omnitureAmpAccount: string;
	onwardWebSocket: string;
	ophanEmbedJsUrl: string;
	ophanJsUrl: string;
	optimizeEpicUrl: string;
	pbIndexSites: { [key: string]: unknown }[];
	pillar: string;
	plistaPublicApiKey: string;
	requiresMembershipAccess: boolean;
	revisionNumber: string;
	shouldHideAdverts: boolean;
	stripePublicToken: string;
	thirdPartyAppsAccount?: string;
};

export type FESeoData = {
	id: string;
	navSection: string;
	webTitle: string;
	title?: string;
	description: string;
};

export type FEFrontProperties = {
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
