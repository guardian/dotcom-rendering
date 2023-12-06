import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { EditionId } from '../lib/edition';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import type { FEArticleBadgeType } from './badge';
import type { CommercialProperties } from './commercial';
import type { ConfigType } from './config';
import type { FEElement, ImageForLightbox, Newsletter } from './content';
import type { FooterType } from './footer';
import type { FEOnwards } from './onwards';
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
	starRating?: number;
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
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
	messageUs?: MessageUs;

	promotedNewsletter?: Newsletter;
	canonicalUrl: string;
	showTableOfContents: boolean;
	lang?: string;
	isRightToLeftLang?: boolean;
}

/**
 * The `DCRArticle` type models the `FEArticleType` in addition to any enhancements DCR makes after
 * receiving the data from Frontend.
 */
export type DCRArticle = FEArticleType & {
	imagesForLightbox?: ImageForLightbox[];
	imagesForAppsLightbox: ImageForAppsLightbox[];
	tableOfContents?: TableOfContentsItem[];
};

export interface TableOfContents {
	items: TableOfContentsItem[];
}

export interface TableOfContentsItem {
	id: string;
	title: string;
}

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
	keywordIds: string;
}
