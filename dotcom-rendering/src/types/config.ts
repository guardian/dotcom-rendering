import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { EditionId } from '../lib/edition';

export type StageType = 'DEV' | 'CODE' | 'PROD';

export interface CommercialConfigType {
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

	hasLiveBlogTopAd?: boolean;
	hasSurveyAd?: boolean;
}

/**
 * Narrowest representation of the server-side tests
 * object shape, which is [defined in `frontend`](https://github.com/guardian/frontend/blob/23743723030a041e4f4f59fa265ee2be0bb51825/common/app/experiments/ExperimentsDefinition.scala#L24-L26).
 *
 * **Note:** This type is not support by JSON-schema, it evaluates as `object`
 */
export type ServerSideTests = {
	[key: `${string}Variant`]: 'variant';
	[key: `${string}Control`]: 'control';
};

export type ServerSideTestNames = keyof ServerSideTests;

export interface Switches {
	[key: string]: boolean | undefined;
}

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
export interface ConfigType extends CommercialConfigType, LegacyConfig {
	dcrCouldRender?: boolean;
	ajaxUrl: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	dcrSentryDsn: string;
	switches: Switches;
	abTests: ServerSideTests;
	serverSideABTests: Record<string, string>;
	dfpAccountId: string;
	commercialBundleUrl: string;
	revisionNumber: string;
	shortUrlId: string;
	isDev?: boolean;
	googletagUrl: string;
	stage: StageType;
	frontendAssetsFullURL: string;
	adUnit: string;
	isSensitive: boolean;
	videoDuration?: number;
	edition: EditionId;
	section: string;
	source?: string;

	sharedAdTargeting: SharedAdTargeting;
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
	googleRecaptchaSiteKey?: string;
	googleRecaptchaSiteKeyVisible?: string;
	hasPageSkin?: boolean;
}

/** Legacy fields seemingly not used in DCR */
interface LegacyConfig {
	tones?: string;
	avatarApiUrl?: string;
	isSplash?: boolean;
	isColumn?: boolean;
	membershipUrl?: string;
	isImmersive?: boolean;
	isProd?: boolean;
	membershipAccess?: string;
	allowUserGeneratedContent?: boolean;
	commissioningDesks?: string;
	forecastsapiurl?: string;
	supportUrl?: string;
	isNumberedList?: boolean;
	idOAuthUrl?: string;
	webTitle?: string;
	idWebAppUrl?: string;
	a9PublisherId?: string;
	isFront?: boolean;
	inBodyInternalLinkCount?: number;
	googleSearchUrl?: string;
	inBodyExternalLinkCount?: number;
	lightboxImages?: {
		id: string;
		headline: string;
		shouldHideAdverts: boolean;
		standfirst: string;
		images: Array<{
			caption: string;
			credit: string;
			displayCredit: boolean;
			src: string;
			srcsets: string;
			sizes: string;
			ratio: number;
			role: string;
			parentContentId?: string;
			id?: string;
		}>;
	};
	googleSearchId?: string;
	omnitureAmpAccount?: string;
	dfpAdUnitRoot?: string;
	blogIds?: string;
	sectionName?: string;
	hasMultipleVideosInPage?: boolean;
	hasShowcaseMainElement?: boolean;
	fbAppId?: string;
	isContent?: boolean;
	plistaPublicApiKey?: string;
	wordCount?: number;
	cardStyle?: string;
	ophanEmbedJsUrl?: string;
	frontendSentryDsn?: string;
	blogs?: string;
	userAttributesApiUrl?: string;
	disableStickyTopBanner?: boolean;
	dfpHost?: string;
	weatherapiurl?: string;
	shortUrl?: string;
	thumbnail?: string;
	pillar?: string;
	beaconUrl?: string;
	commentable?: boolean;
	ophanJsUrl?: string;
	contributorBio?: string;
	isHosted?: boolean;
	facebookIaAdUnitRoot?: string;
	sponsorshipType?: string;
	isAdFree?: boolean;
	stripePublicToken?: string;
	omnitureAccount?: string;
	locationapiurl?: string;
	authorIds?: string;
	hasYouTubeAtom?: boolean;
	externalEmbedHost?: string;
	thirdPartyAppsAccount?: string;
	byline?: string;
	contentId?: string;
	nonKeywordTagIds?: string;
	mobileAppsAdUnitRoot?: string;
	requiresMembershipAccess?: boolean;
	optimizeEpicUrl?: string;
	assetsPath?: string;
	richLink?: string;
	campaigns?: Array<{
		id: string;
		name: string;
		rules: Array<unknown>;
		priority: number;
		displayOnSensitive: boolean;
		fields: {
			campaignId: string;
			_type: string;
		};
	}>;
	pageCode?: string;
	avatarImagesUrl?: string;
	publication?: string;
	buildNumber?: string;
	atomTypes?: {
		review: boolean;
		guide: boolean;
		audio: boolean;
		explainer: boolean;
		interactive: boolean;
		profile: boolean;
		chart: boolean;
		quizz: boolean;
		callToAction: boolean;
		commonsdivision: boolean;
		timeline: boolean;
		media: boolean;
		qanda: boolean;
	};
	onwardWebSocket?: string;
	productionOffice?: string;
	shouldHideAdverts?: boolean;
	pbIndexSites?: unknown;
	googletagJsUrl?: string;
	atoms?: Array<string>;
	calloutsUrl?: string;
}
