import {
	any,
	array,
	boolean,
	number,
	object,
	record,
	string,
	unknown,
} from 'zod';
import { badgeTypeSchema } from './zod/badge';
import { capiFormatSchema, legacyPillarSchema } from './zod/capi';
import { commercialPropertiesSchema } from './zod/commercial';
import { configTypeSchema } from './zod/config';
import { editionId } from './zod/edition';
import { feElementSchema } from './zod/elements';
import { footerTypeSchema } from './zod/footer';
import { matchTypeSchema } from './zod/match';
import { feLinkTypeSchema, feNavTypeSchema } from './zod/nav';
import { feOnwardsTypeSchema } from './zod/onwards';
import { topicSchema } from './zod/topics';
import { feTrailTypeSchema } from './zod/trails';

const membershipPlaceholderSchema = object({
	campaignCode: string().optional(),
});

const attributesSchema = object({
	pinned: boolean(),
	summary: boolean(),
	keyEvent: boolean(),
	membershipPlaceholder: membershipPlaceholderSchema.optional(),
});

const blockContributorSchema = object({
	name: string(),
	imageUrl: string().optional(),
	largeImageUrl: string().optional(),
});

const paginationSchema = object({
	currentPage: number(),
	totalPages: number(),
	newest: string().optional(),
	newer: string().optional(),
	oldest: string().optional(),
	older: string().optional(),
});

const block = object({
	id: string(),
	elements: array(feElementSchema),
	attributes: attributesSchema,
	blockCreatedOn: number().optional(),
	blockCreatedOnDisplay: string().optional(),
	blockLastUpdated: number().optional(),
	blockLastUpdatedDisplay: string().optional(),
	title: string().optional(),
	blockFirstPublished: number().optional(),
	blockFirstPublishedDisplay: string().optional(),
	blockFirstPublishedDisplayNoTimezone: string().optional(),
	primaryDateLine: string(),
	secondaryDateLine: string(),
	createdOn: number().optional(),
	createdOnDisplay: string().optional(),
	lastUpdated: number().optional(),
	lastUpdatedDisplay: string().optional(),
	firstPublished: number().optional(),
	firstPublishedDisplay: string().optional(),
	contributors: array(blockContributorSchema).optional(),
});

const tagTypeSchema = object({
	id: string(),
	type: string(),
	title: string(),
	twitterHandle: string().optional(),
	paidContentType: string().optional(),
	bylineImageUrl: string().optional(),
	bylineLargeImageUrl: string().optional(),
});

const pageTypeTypeSchema = object({
	hasShowcaseMainElement: boolean(),
	isFront: boolean(),
	isLiveblog: boolean(),
	isMinuteArticle: boolean(),
	isPaidContent: boolean(),
	isPreview: boolean(),
	isSensitive: boolean(),
});

const newsletterSchema = object({
	listId: number(),
	identityName: string(),
	name: string(),
	description: string(),
	frequency: string(),
	successDescription: string(),
	theme: string(),
	group: string(),
});

export const feArticleType = object({
	headline: string(),
	standfirst: string(),
	webTitle: string(),
	mainMediaElements: array(feElementSchema),
	main: string(),
	keyEvents: array(block),
	blocks: array(block),
	pinnedPost: block.optional(),
	pagination: paginationSchema.optional(),
	byline: string().optional(),
	/** @deprecated - will be removed in the next model version */
	author: unknown(),

	/**
	 * @TJS-format date-time
	 */
	webPublicationDateDeprecated: string(),
	webPublicationDate: string(),
	webPublicationDateDisplay: string(),
	webPublicationSecondaryDateDisplay: string(),
	editionLongForm: string(),
	editionId,
	pageId: string(),
	/** @TODO check who uses? */
	version: number(),
	tags: array(tagTypeSchema),
	format: capiFormatSchema,

	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string(),
	pillar: legacyPillarSchema,

	isImmersive: boolean(),
	sectionLabel: string(),
	sectionUrl: string(),
	sectionName: string().optional(),
	subMetaSectionLinks: array(feLinkTypeSchema),
	subMetaKeywordLinks: array(feLinkTypeSchema),
	shouldHideAds: boolean(),
	isAdFreeUser: boolean(),
	openGraphData: record(string()),
	twitterData: record(string()),
	webURL: string(),
	linkedData: array(record(any())),
	/** Here we actually pass a lot of unnecessary keys */
	config: configTypeSchema.passthrough(),

	showBottomSocialButtons: boolean(),
	shouldHideReaderRevenue: boolean(),

	// AMP specific (for now)
	guardianBaseURL: string(),
	contentType: string(),
	hasRelated: boolean(),
	publication: string(), // TODO: check who uses?
	hasStoryPackage: boolean(),
	storyPackage: object({
		trails: array(feTrailTypeSchema),
		heading: string(),
	}).optional(),
	onwards: array(feOnwardsTypeSchema).optional(),
	beaconURL: string(),
	isCommentable: boolean(),
	commercialProperties: commercialPropertiesSchema,
	starRating: number().optional(),
	trailText: string(),
	badge: badgeTypeSchema.optional(),

	nav: feNavTypeSchema, // TODO move this out as most code uses a different internal NAV model.

	pageFooter: footerTypeSchema,

	contributionsServiceUrl: string(),
	slotMachineFlags: string().optional(),

	pageType: pageTypeTypeSchema,

	matchUrl: string().optional(),
	matchType: matchTypeSchema.optional(),
	isSpecialReport: boolean(),

	// Interactives made on Frontend rather than DCR require special handling.
	// The logic is date-driven. See:
	// https://github.com/guardian/frontend/blob/main/common/app/model/dotcomrendering/InteractiveSwitchOver.scala#L7.
	isLegacyInteractive: boolean().optional(),
	filterKeyEvents: boolean(),

	// Included on live and dead blogs. Used when polling
	mostRecentBlockId: string().optional(),
	availableTopics: array(topicSchema).optional(),
	selectedTopics: array(topicSchema).optional(),

	promotedNewsletter: newsletterSchema.optional(),
});
