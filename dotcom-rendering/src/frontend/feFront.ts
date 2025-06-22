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
	| 'dynamic/fast' // to remove once 0 dynamic/fast remain
	| 'dynamic/package' // to remove once 0 dynamic/package remain
	| 'dynamic/slow' // to remove once 0 dynamic/slow remain
	| 'dynamic/slow-mpu' // to remove once 0 dynamic/slow-mpu
	| 'fixed/large/slow-XIV' // to remove once 0 fixed/large/slow-XIV remain
	| 'fixed/medium/fast-XI'
	| 'fixed/medium/fast-XII' // to remove once 0 fixed/medium/fast-XII
	| 'fixed/medium/slow-VI'
	| 'fixed/medium/slow-VII'
	| 'fixed/medium/slow-XII-mpu'
	| 'fixed/small/fast-VIII' // to remove once 0 fixed/small/fast-VIII remain.
	| 'fixed/small/slow-I' // to remove once 0 fixed/small/slow-I remain.
	| 'fixed/small/slow-III'
	| 'fixed/small/slow-IV'
	| 'fixed/small/slow-V-half' // to remove once 0 fixed/small/slow-V-half remain.
	| 'fixed/small/slow-V-mpu' // to remove once 0 fixed/small/slow-V-mpu half remain.
	| 'fixed/small/slow-V-third' // to remove once 0 fixed/small/slow-V-third remain
	| 'fixed/thrasher'
	| 'fixed/video' // to remove once 0 fixed/videos remain.
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
	| 'Dynamo'
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
interface FEMediaAsset {
	id: string;
	version: number;
	platform: string;
	mimeType?: string;
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
	expired?: boolean;
	activeVersion?: number;
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
	hideShowMore: boolean;
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
	hasMore: boolean;
	targetedTerritory?: Territory;
};

export type FEFrontConfig = {
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
