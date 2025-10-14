import { any, array, boolean, type InferOutput, literal, number, object, optional, record, string, union, unknown } from 'valibot';
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
	StarRatingSchema
} from '../types/content';
import { FooterTypeSchema } from '../types/footer';
import { FELinkTypeSchema, FENavTypeSchema, LegacyPillarSchema } from '../types/frontend';
import { PaginationTypeSchema } from '../types/liveBlog';
import { FEOnwardsSchema } from '../types/onwards';
import { MatchTypeSchema } from '../types/sport';
import { TagTypeSchema } from '../types/tag';
import { FETrailTypeSchema } from '../types/trails';

const FEPillarSchema = union([
	literal('NewsPillar'),
	literal('OpinionPillar'),
	literal('SportPillar'),
	literal('CulturePillar'),
	literal('LifestylePillar'),
]);

const FEThemeSpecialSchema = union([
	literal('SpecialReportTheme'),
	literal('Labs'),
	literal('SpecialReportAltTheme'),
]);

const FEThemeSchema = union([
	FEPillarSchema,
	FEThemeSpecialSchema,
]);

/**
 * FEDesign is what frontend gives (originating in the capi scala client) us on the Format field
 * https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
 */
const FEDesignSchema = union([
	literal('ArticleDesign'),
	literal('PictureDesign'),
	literal('GalleryDesign'),
	literal('AudioDesign'),
	literal('VideoDesign'),
	literal('CrosswordDesign'),
	literal('ReviewDesign'),
 	literal('AnalysisDesign'),
	literal('CommentDesign'),
	literal('ExplainerDesign'),
	literal('LetterDesign'),
	literal('FeatureDesign'),
	literal('LiveBlogDesign'),
	literal('DeadBlogDesign'),
	literal('RecipeDesign'),
	literal('MatchReportDesign'),
	literal('InterviewDesign'),
	literal('EditorialDesign'),
	literal('QuizDesign'),
	literal('InteractiveDesign'),
	literal('PhotoEssayDesign'),
	literal('ObituaryDesign'),
	literal('FullPageInteractiveDesign'),
	literal('NewsletterSignupDesign'),
	literal('TimelineDesign'),
	literal('ProfileDesign'),
]);

/** FEDisplay is the display information passed through from frontend (originating in the capi scala client) and dictates the display style of the content e.g. Immersive
https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Display.scala */
const FEDisplaySchema = union([
	literal('StandardDisplay'),
	literal('ImmersiveDisplay'),
	literal('ShowcaseDisplay'),
	literal('NumberedListDisplay'),
]);

/**
 * FEFormat is the stringified version of Format passed through from Frontend.
 * It gets converted to the `@guardian/libs` format on platform
 */
export const FEFormatSchema = object({
	design: FEDesignSchema,
	theme: FEThemeSchema,
	display: FEDisplaySchema,
});

export type FEFormat = InferOutput<typeof FEFormatSchema>;

const FEStoryPackageSchema = object({
	heading: string(),
	trails: array(FETrailTypeSchema),
});

export type FEStoryPackage = InferOutput<typeof FEStoryPackageSchema>;

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
const FEArticleSchema = object({
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

export type FEArticle = InferOutput<typeof FEArticleSchema>;
