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
	abTests: ServerSideTests;
	adUnit: string;
	ajaxUrl: string;
	brazeApiKey?: string;
	commercialBundleUrl: string;
	dcrCouldRender?: boolean;
	dcrSentryDsn: string;
	dfpAccountId: string;
	discussionApiClientHeader: string;
	discussionApiUrl: string;
	discussionD2Uid: string;
	edition: EditionId;
	frontendAssetsFullURL: string;
	googleRecaptchaSiteKey?: string;
	googleRecaptchaSiteKeyVisible?: string;
	googletagUrl: string;
	hasPageSkin?: boolean;
	host?: string;
	idApiUrl: string;
	idUrl?: string;
	ipsosTag?: string;
	isDev?: boolean;
	isLive?: boolean;
	isLiveBlog?: boolean;
	isPaidContent?: boolean;
	isPhotoEssay?: boolean;
	isPreview?: boolean;
	isSensitive: boolean;
	keywordIds: string;
	mmaUrl?: string;
	references?: { [key: string]: string }[];
	revisionNumber: string;
	section: string;
	sentryHost: string;
	sentryPublicApiKey: string;
	serverSideABTests: Record<string, string>;
	sharedAdTargeting: SharedAdTargeting;
	shortUrlId: string;
	shouldHideReaderRevenue?: boolean;
	showRelatedContent: boolean;
	source?: string;
	stage: StageType;
	switches: Switches;
	userBenefitsApiUrl?: string;
	videoDuration?: number;
}

/**
 * Config fields that are present in the payload from frontend but are not used in DCR
 * Here to satisfy types when adding new fixtures based on the JSON output from Frontend
 *
 * If not used we should remove these properties from the Frontend model
 */
interface LegacyConfig {
	a9PublisherId?: string;
	allowUserGeneratedContent?: boolean;
	assetsPath?: string;
	atoms?: Array<string>;
	atomTypes?: {
		audio?: boolean;
		callToAction?: boolean;
		chart?: boolean;
		commonsdivision?: boolean;
		explainer?: boolean;
		guide?: boolean;
		interactive?: boolean;
		media?: boolean;
		profile?: boolean;
		qanda?: boolean;
		quizz?: boolean;
		review?: boolean;
		timeline?: boolean;
	};
	authorIds?: string;
	avatarApiUrl?: string;
	avatarImagesUrl?: string;
	beaconUrl?: string;
	blogIds?: string;
	blogs?: string;
	buildNumber?: string;
	byline?: string;
	calloutsUrl?: string;
	campaigns?: Array<{
		id?: string;
		name?: string;
		rules?: Array<unknown>;
		priority?: number;
		displayOnSensitive?: boolean;
		fields?: {
			campaignId?: string;
			_type?: string;
		};
	}>;
	cardStyle?: string;
	commentable?: boolean;
	commissioningDesks?: string;
	contentId?: string;
	contributorBio?: string;
	dfpAdUnitRoot?: string;
	dfpHost?: string;
	disableStickyTopBanner?: boolean;
	externalEmbedHost?: string;
	facebookIaAdUnitRoot?: string;
	fbAppId?: string;
	forecastsapiurl?: string;
	frontendSentryDsn?: string;
	googleSearchId?: string;
	googleSearchUrl?: string;
	googletagJsUrl?: string;
	hasMultipleVideosInPage?: boolean;
	hasShowcaseMainElement?: boolean;
	hasYouTubeAtom?: boolean;
	idOAuthUrl?: string;
	idWebAppUrl?: string;
	inBodyExternalLinkCount?: number;
	inBodyInternalLinkCount?: number;
	isAdFree?: boolean;
	isColumn?: boolean;
	isContent?: boolean;
	isFront?: boolean;
	isHosted?: boolean;
	isImmersive?: boolean;
	isNumberedList?: boolean;
	isProd?: boolean;
	isSplash?: boolean;
	lightboxImages?: {
		id?: string;
		headline?: string;
		shouldHideAdverts?: boolean;
		standfirst?: string;
		images?: Array<{
			caption?: string;
			credit?: string;
			displayCredit?: boolean;
			src?: string;
			srcsets?: string;
			sizes?: string;
			ratio?: number;
			role?: string;
			parentContentId?: string;
			id?: string;
		}>;
	};
	locationapiurl?: string;
	membershipAccess?: string;
	membershipUrl?: string;
	mobileAppsAdUnitRoot?: string;
	nonKeywordTagIds?: string;
	omnitureAccount?: string;
	omnitureAmpAccount?: string;
	onwardWebSocket?: string;
	ophanEmbedJsUrl?: string;
	ophanJsUrl?: string;
	optimizeEpicUrl?: string;
	pageCode?: string;
	pbIndexSites?: unknown;
	pillar?: string;
	plistaPublicApiKey?: string;
	productionOffice?: string;
	publication?: string;
	requiresMembershipAccess?: boolean;
	richLink?: string;
	sectionName?: string;
	shortUrl?: string;
	shouldHideAdverts?: boolean;
	sponsorshipType?: string;
	stripePublicToken?: string;
	supportUrl?: string;
	thirdPartyAppsAccount?: string;
	thumbnail?: string;
	tones?: string;
	userAttributesApiUrl?: string;
	weatherapiurl?: string;
	webTitle?: string;
	wordCount?: number;
}
