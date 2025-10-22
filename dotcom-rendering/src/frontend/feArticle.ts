import {
	any,
	array,
	boolean,
	number,
	object,
	optional,
	record,
	string,
	unknown,
	type z,
} from 'zod';
import { EditionIdSchema } from '../lib/edition';
import { FEArticleBadgeTypeSchema } from '../types/badge';
import { BlockSchema } from '../types/blocks';
import { CommercialPropertiesSchema } from '../types/commercial';
import { ConfigTypeSchema } from '../types/config';
import {
	CAPICrosswordSchema,
	FEElementSchema,
	ImageBlockElementSchema,
	NewsletterSchema,
	StarRatingSchema,
} from '../types/content';
import { FooterTypeSchema } from '../types/footer';
import {
	FELinkTypeSchema,
	FENavTypeSchema,
	LegacyPillarSchema,
} from '../types/frontend';
import { PaginationTypeSchema } from '../types/liveBlog';
import { FEOnwardsSchema } from '../types/onwards';
import { MatchTypeSchema } from '../types/sport';
import { TagTypeSchema } from '../types/tag';
import { FETrailTypeSchema } from '../types/trails';
import { FEFormatSchema } from './format';

const FEStoryPackageSchema = object({
	heading: string(),
	trails: array(FETrailTypeSchema),
});

export type FEStoryPackage = z.infer<typeof FEStoryPackageSchema>;

const PageTypeSchema = object({
	hasShowcaseMainElement: boolean(),
	isFront: boolean(),
	isLiveblog: boolean(),
	isMinuteArticle: boolean(),
	isPaidContent: boolean(),
	isPreview: boolean(),
	isSensitive: boolean(),
});

/**
 * This type is what we receive from `frontend`,
 * hence the FE prefix.
 *
 * WARNING: run `gen-schema` task if changing this to update the associated JSON
 * schema definition.
 */
export const FEArticleSchema = object({
	headline: string(),
	standfirst: string(),
	affiliateLinksDisclaimer: optional(string()),
	webTitle: string(),
	mainMediaElements: array(FEElementSchema),
	main: string(),
	keyEvents: array(BlockSchema),
	blocks: array(BlockSchema),
	pinnedPost: optional(BlockSchema),
	pagination: optional(PaginationTypeSchema),
	byline: optional(string()),
	/** @deprecated - will be removed in the next model version */
	author: optional(unknown()),

	/**
	 * @TJS-format date-time
	 */
	webPublicationDateDeprecated: string(),
	webPublicationDate: string(),
	webPublicationDateDisplay: string(),
	webPublicationSecondaryDateDisplay: string(),
	editionLongForm: string(),
	editionId: EditionIdSchema,
	pageId: string(),
	version: number(), // TODO: check who uses?
	tags: array(TagTypeSchema),
	format: FEFormatSchema,

	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string(),
	pillar: LegacyPillarSchema,

	isImmersive: boolean(),
	sectionLabel: string(),
	sectionUrl: string(),
	sectionName: optional(string()),
	subMetaSectionLinks: array(FELinkTypeSchema),
	subMetaKeywordLinks: array(FELinkTypeSchema),
	shouldHideAds: boolean(),
	isAdFreeUser: boolean(),
	openGraphData: record(string(), string()),
	twitterData: record(string(), string()),
	webURL: string(),
	linkedData: array(record(string(), any())),
	config: ConfigTypeSchema,

	showBottomSocialButtons: boolean(),
	shouldHideReaderRevenue: boolean(),

	guardianBaseURL: string(),
	contentType: string(),
	hasRelated: boolean(),
	publication: string(), // TODO: check who uses?
	hasStoryPackage: boolean(),
	storyPackage: optional(FEStoryPackageSchema),
	onwards: optional(array(FEOnwardsSchema)),
	beaconURL: string(),
	isCommentable: boolean(),
	commercialProperties: CommercialPropertiesSchema,
	starRating: optional(StarRatingSchema),
	audioArticleImage: optional(ImageBlockElementSchema),
	trailPicture: optional(ImageBlockElementSchema),
	trailText: string(),
	badge: optional(FEArticleBadgeTypeSchema),

	nav: FENavTypeSchema, // TODO move this out as most code uses a different internal NAV model.

	pageFooter: FooterTypeSchema,

	contributionsServiceUrl: string(),
	slotMachineFlags: optional(string()),

	pageType: PageTypeSchema,

	matchUrl: optional(string()),
	matchType: optional(MatchTypeSchema),
	isSpecialReport: boolean(),

	// Interactives made on Frontend rather than DCR require special handling.
	// The logic is date-driven. See:
	// https://github.com/guardian/frontend/blob/main/common/app/model/dotcomrendering/InteractiveSwitchOver.scala#L7.
	isLegacyInteractive: optional(boolean()),
	filterKeyEvents: boolean(),

	// Included on live and dead blogs. Used when polling
	mostRecentBlockId: optional(string()),

	promotedNewsletter: optional(NewsletterSchema),
	canonicalUrl: string(),
	showTableOfContents: boolean(),
	lang: optional(string()),
	isRightToLeftLang: optional(boolean()),
	crossword: optional(CAPICrosswordSchema),
});

export type FEArticle = z.infer<typeof FEArticleSchema>;
