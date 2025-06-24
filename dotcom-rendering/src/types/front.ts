import type {
	FEAspectRatio,
	FEContainer,
	FEContainerLevel,
	FEFrontConfig,
	FEFrontProperties,
	FESeoData,
} from '../frontend/feFront';
import type {
	ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { Branding, CollectionBranding } from './branding';
import type { BoostLevel, StarRating } from './content';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';
import type { MainMedia } from './mainMedia';
import type { FETagType } from './tag';
import type { Territory } from './territory';
import type { TrailType } from './trails';

export interface Front {
	pressedPage: PressedPage;
	nav: FENavType;
	editionId: EditionId;
	webTitle: string;
	config: FEFrontConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	isNetworkFront: boolean;
	mostViewed: TrailType[];
	deeplyRead?: TrailType[];
	trendingTopics?: FETagType[];
	contributionsServiceUrl: string;
	canonicalUrl?: string;
	pageId: string;
	webURL: string;
	guardianBaseURL: string;
}

interface PressedPage {
	id: string;
	seoData: FESeoData;
	frontProperties: FEFrontProperties;
	collections: DCRCollectionType[];
}

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
export type DCRContainerType = FEContainer;

export type DCRContainerLevel = FEContainerLevel;

export type DCRFrontImage = {
	src: string;
	altText: string;
};

export type DCRFrontCard = {
	format: ArticleFormat;
	url: string;
	headline: string;
	showQuotedHeadline: boolean;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionApiUrl: string;
	isExternalLink: boolean;
	showLivePlayable: boolean;
	trailText?: string;
	starRating?: StarRating;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	kickerText?: string;
	supportingContent?: DCRSupportingContent[];
	snapData?: DCRSnapType;
	isBoosted?: boolean;
	boostLevel?: BoostLevel;
	isImmersive: boolean;
	isCrossword?: boolean;
	isNewsletter?: boolean;
	discussionId?: string;
	byline?: string;
	showByline?: boolean;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	embedUri?: string;
	branding?: Branding;
	slideshowImages?: DCRSlideshowImage[];
	showVideo?: boolean;
	isInHideTrailsAbTest?: boolean;
};

export type DCRSlideshowImage = {
	imageSrc: string;
	imageCaption?: string;
};

export type DCRSnapType = {
	embedHtml?: string;
	embedCss?: string;
	embedJs?: string;
};

export type AspectRatio = FEAspectRatio;

export type DCRCollectionType = {
	id: string;
	displayName: string;
	description?: string;
	collectionType: DCRContainerType;
	containerPalette?: DCRContainerPalette;
	containerLevel?: DCRContainerLevel;
	isNextCollectionPrimary?: boolean;
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
	collectionBranding?: CollectionBranding;
	targetedTerritory?: Territory;
	aspectRatio?: AspectRatio;
};

export type DCRGroupedTrails = {
	snap: DCRFrontCard[];
	huge: DCRFrontCard[];
	veryBig: DCRFrontCard[];
	big: DCRFrontCard[];
	standard: DCRFrontCard[];
	splash: DCRFrontCard[];
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
