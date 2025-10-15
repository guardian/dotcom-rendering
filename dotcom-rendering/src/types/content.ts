import { type CrosswordProps } from '@guardian/react-crossword';
import {
	array,
	boolean,
	custom,
	type GenericSchema,
	type InferOutput,
	lazy,
	literal,
	nonEmpty,
	number,
	object,
	optional,
	pipe,
	record,
	string,
	union,
} from 'valibot';
import { type ArticleFormat } from '../lib/articleFormat';

export type BoostLevel = 'default' | 'boost' | 'megaboost' | 'gigaboost';

export type ContentType =
	| 'article'
	| 'network'
	| 'section'
	| 'imageContent'
	| 'interactive'
	| 'gallery'
	| 'video'
	| 'audio'
	| 'liveBlog'
	| 'tag'
	| 'index'
	| 'crossword'
	| 'survey'
	| 'signup'
	| 'userid';

// ------------------------------------- Elements

const ThirdPartyEmbeddedContentSchema = object({
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VideoAssetsSchema = object({
	url: string(),
	mimeType: optional(string()),
	fields: optional(
		object({
			source: optional(string()),
			embeddable: optional(string()),
			height: optional(string()),
			width: optional(string()),
			caption: optional(string()),
		}),
	),
});

/**
 * Affects how an image is placed.
 *
 * Also known as “weighting” in Composer, but we respect the CAPI naming.
 *
 * @see https://github.com/guardian/frontend/blob/0a32dba0/common/app/model/dotcomrendering/pageElements/Role.scala
 */
const RoleTypeSchema = union([
	literal('immersive'),
	literal('supporting'),
	literal('showcase'),
	literal('inline'),
	literal('thumbnail'),
	literal('halfWidth'),
]);

export type RoleType = InferOutput<typeof RoleTypeSchema>;

/**
 * This duplicate type is unfortunate, but the image sources come lowercase
 * Note, 'richLink' is used internally but does not exist upstream.
 */
// TODO: type Weighting = Exclude<RoleType, 'halfWidth' | 'richLink'> | 'halfwidth';
// What's better to do here? use literals or create schema based on RoleTypeSchema
const roleTypeLiterals = RoleTypeSchema.options
	.map((opt) => opt.literal)
	.map((weighting) => (weighting === 'halfWidth' ? 'halfwidth' : weighting))
	.map((weighting) => literal(weighting));

export const WeightingSchema = union([...roleTypeLiterals]);

export type Weighting = InferOutput<typeof WeightingSchema>;

const SrcSetItemSchema = object({
	src: string(),
	width: number(),
});

const ImageSourceSchema = object({
	weighting: WeightingSchema,
	srcSet: array(SrcSetItemSchema),
});

export const StarRatingSchema = union([
	literal(0),
	literal(1),
	literal(2),
	literal(3),
	literal(4),
	literal(5),
]);

export type StarRating = InferOutput<typeof StarRatingSchema>;

const RatingSizeTypeSchema = union([literal('large'), literal('small')]);

export type RatingSizeType = InferOutput<typeof RatingSizeTypeSchema>;

const TimelineAtomEventSchema = object({
	title: string(),
	date: string(),
	unixDate: number(),
	body: optional(string()),
	toDate: optional(string()),
	toUnixDate: optional(number()),
});

export type TimelineAtomEvent = InferOutput<typeof TimelineAtomEventSchema>;

// -------------------------------------
// Newsletter
// -------------------------------------

export const NewsletterSchema = object({
	listId: number(),
	identityName: string(),
	name: string(),
	description: string(),
	frequency: string(),
	successDescription: string(),
	theme: string(),
	group: string(),
	regionFocus: optional(string()),
	illustrationCard: optional(string()),
});

export type Newsletter = InferOutput<typeof NewsletterSchema>;

const NewsletterLayoutSchema = object({
	groups: array(
		object({
			title: string(),
			subtitle: optional(string()),
			newsletters: array(string()),
		}),
	),
});

export type NewsletterLayout = InferOutput<typeof NewsletterLayoutSchema>;

// ------------------------------------- Article

const AudioAssetSchema = object({
	url: string(),
	mimeType: optional(string()),
	fields: optional(
		object({
			durationMinutes: optional(string()),
			durationSeconds: optional(string()),
			explicit: optional(string()),
			source: optional(string()),
		}),
	),
});

export type AudioAsset = InferOutput<typeof AudioAssetSchema>;

const CampaignFieldSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
});

const CampaignFieldTextSchema = object({
	...CampaignFieldSchema.entries,
	type: union([literal('text'), literal('email'), literal('phone')]),
});

export type CampaignFieldText = InferOutput<typeof CampaignFieldTextSchema>;

const CampaignFieldTextAreaSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('textarea'),
	minlength: optional(number()),
	maxlength: optional(number()),
});

export type CampaignFieldTextArea = InferOutput<
	typeof CampaignFieldTextAreaSchema
>;

const CampaignFieldFileSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('file'),
});

export type CampaignFieldFile = InferOutput<typeof CampaignFieldFileSchema>;

const CampaignFieldRadioSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('radio'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

export type CampaignFieldRadio = InferOutput<typeof CampaignFieldRadioSchema>;

const CampaignFieldCheckboxSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('checkbox'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

export type CampaignFieldCheckbox = InferOutput<
	typeof CampaignFieldCheckboxSchema
>;

const CampaignFieldSelectSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('select'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

export type CampaignFieldSelect = InferOutput<typeof CampaignFieldSelectSchema>;

// -------------------------------------
// Callout Campaign
// -------------------------------------
const CampaignFieldTypeSchema = union([
	CampaignFieldTextSchema,
	CampaignFieldTextAreaSchema,
	CampaignFieldFileSchema,
	CampaignFieldRadioSchema,
	CampaignFieldCheckboxSchema,
	CampaignFieldSelectSchema,
]);
export type CampaignFieldType = InferOutput<typeof CampaignFieldTypeSchema>;

// -------------------------------------
// Quiz
// -------------------------------------

const AnswerTypeSchema = object({
	id: string(),
	text: string(),
	revealText: optional(string()),
	isCorrect: boolean(),
	answerBuckets: array(string()),
});

export type AnswerType = InferOutput<typeof AnswerTypeSchema>;

const QuestionTypeSchema = object({
	id: string(),
	text: string(),
	answers: array(AnswerTypeSchema),
	imageUrl: optional(string()),
	imageAlt: optional(string()),
});

export type QuestionType = InferOutput<typeof QuestionTypeSchema>;

const ResultGroupsTypeSchema = object({
	title: string(),
	shareText: string(),
	minScore: number(),
	id: string(),
});

export type ResultGroupsType = InferOutput<typeof ResultGroupsTypeSchema>;

const ResultsBucketTypeSchema = object({
	id: string(),
	title: string(),
	description: string(),
});

export type ResultsBucketType = InferOutput<typeof ResultsBucketTypeSchema>;

export type KnowledgeQuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultGroups: ResultGroupsType[];
	pageId: string;
	webTitle: string;
	format: ArticleFormat;
};

export type PersonalityQuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultBuckets: ResultsBucketType[];
	pageId: string;
	webTitle: string;
	format: ArticleFormat;
};

export type QuizSelectionType = Record<string, AnswerType>;

const ImageSchema = object({
	index: number(),
	fields: object({
		height: string(),
		width: string(),
		aspectRatio: optional(string()),
		isMaster: optional(string()),
		source: optional(string()),
		caption: optional(string()),
	}),
	mediaType: string(),
	mimeType: optional(string()),
	url: string(),
});

export type Image = InferOutput<typeof ImageSchema>;

const AudioAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.AudioAtomBlockElement'),
	elementId: string(),
	id: string(),
	kicker: string(),
	title: optional(string()),
	trackUrl: string(),
	duration: number(),
	coverUrl: string(),
	role: optional(RoleTypeSchema),
});

export type AudioAtomBlockElement = InferOutput<
	typeof AudioAtomBlockElementSchema
>;

const AudioBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.AudioBlockElement'),
	id: optional(string()),
	elementId: string(),
	assets: array(AudioAssetSchema),
});

export type AudioBlockElement = InferOutput<typeof AudioBlockElementSchema>;

const BlockquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.BlockquoteBlockElement'),
	elementId: string(),
	html: string(),
	quoted: optional(boolean()),
});

export type BlockquoteBlockElement = InferOutput<
	typeof BlockquoteBlockElementSchema
>;

const CaptionBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CaptionBlockElement'),
	elementId: string(),
	captionText: optional(string()),
	padCaption: optional(boolean()),
	credit: optional(string()),
	displayCredit: optional(boolean()),
	shouldLimitWidth: optional(boolean()),
	isOverlaid: optional(boolean()),
});

export type CaptionBlockElement = InferOutput<typeof CaptionBlockElementSchema>;

const CalloutBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CalloutBlockElement'),
	elementId: string(),
	id: string(),
	calloutsUrl: string(),
	activeFrom: number(),
	activeUntil: optional(number()),
	displayOnSensitive: boolean(),
	formId: number(),
	title: string(),
	description: string(),
	tagName: string(),
	formFields: array(CampaignFieldTypeSchema),
	role: optional(RoleTypeSchema),
});

export type CalloutBlockElement = InferOutput<typeof CalloutBlockElementSchema>;

const CalloutContactTypeSchema = object({
	name: string(),
	value: string(),
	urlPrefix: string(),
	guidance: optional(string()),
});

export type CalloutContactType = InferOutput<typeof CalloutContactTypeSchema>;

const CalloutBlockElementV2Schema = object({
	_type: literal('model.dotcomrendering.pageElements.CalloutBlockElementV2'),
	elementId: string(),
	id: string(),
	calloutsUrl: string(),
	activeFrom: number(),
	activeUntil: optional(number()),
	displayOnSensitive: boolean(),
	formId: number(),
	prompt: string(),
	title: string(),
	description: string(),
	tagName: string(),
	formFields: array(CampaignFieldTypeSchema),
	role: optional(RoleTypeSchema),
	isNonCollapsible: boolean(),
	contacts: optional(array(CalloutContactTypeSchema)),
});

export type CalloutBlockElementV2 = InferOutput<
	typeof CalloutBlockElementV2Schema
>;

const CartoonVariantSchema = object({
	viewportSize: union([literal('small'), literal('large')]),
	images: array(ImageSchema),
});

export type CartoonVariant = InferOutput<typeof CartoonVariantSchema>;

const CartoonBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CartoonBlockElement'),
	elementId: string(),
	role: RoleTypeSchema,
	variants: array(CartoonVariantSchema),
	caption: optional(string()),
	credit: optional(string()),
	displayCredit: optional(boolean()),
	alt: optional(string()),
	/**
	 * position is an index starting at 1 for all the images
	 * that are “lightboxable”, including main media.
	 *
	 * It is generated by `addImagePositions`
	 */
	position: optional(number()),
});

export type CartoonBlockElement = InferOutput<typeof CartoonBlockElementSchema>;

const ChartAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ChartAtomBlockElement'),
	elementId: string(),
	id: string(),
	url: string(),
	html: string(),
	title: string(),
	css: optional(string()),
	js: optional(string()),
	role: optional(RoleTypeSchema),
	placeholderUrl: optional(string()),
});

export type ChartAtomBlockElement = InferOutput<
	typeof ChartAtomBlockElementSchema
>;

const QuizAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QuizAtomBlockElement'),
	elementId: string(),
	quizType: union([literal('knowledge'), literal('personality')]),
	id: string(),
	questions: array(QuestionTypeSchema),
	resultBuckets: array(ResultsBucketTypeSchema),
	resultGroups: array(ResultGroupsTypeSchema),
});

export type QuizAtomBlockElement = InferOutput<
	typeof QuizAtomBlockElementSchema
>;

const CodeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CodeBlockElement'),
	elementId: string(),
	html: string(),
	isMandatory: boolean(),
	language: optional(string()),
});

export type CodeBlockElement = InferOutput<typeof CodeBlockElementSchema>;

const CommentBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CommentBlockElement'),
	elementId: string(),
	body: string(),
	avatarURL: string(),
	profileURL: string(),
	profileName: string(),
	permalink: string(),
	dateTime: string(),
	role: optional(RoleTypeSchema),
});

export type CommentBlockElement = InferOutput<typeof CommentBlockElementSchema>;

const ContentAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.ContentAtomBlockElement',
	),
	elementId: string(),
	atomId: string(),
});

export type ContentAtomBlockElement = InferOutput<
	typeof ContentAtomBlockElementSchema
>;

const DisclaimerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DisclaimerBlockElement'),
	elementId: string(),
	html: string(),
	role: optional(RoleTypeSchema),
});

export type DisclaimerBlockElement = InferOutput<
	typeof DisclaimerBlockElementSchema
>;

const DividerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DividerBlockElement'),
	size: optional(union([literal('full'), literal('partial')])),
	spaceAbove: optional(union([literal('tight'), literal('loose')])),
});

export type DividerBlockElement = InferOutput<typeof DividerBlockElementSchema>;

const DocumentBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.DocumentBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	height: optional(number()),
	width: optional(number()),
	title: optional(string()),
	role: optional(RoleTypeSchema),
});

export type DocumentBlockElement = InferOutput<
	typeof DocumentBlockElementSchema
>;

const EmbedBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.EmbedBlockElement'),
	elementId: string(),
	safe: optional(boolean()),
	role: optional(RoleTypeSchema),
	alt: optional(string()),
	height: optional(number()),
	width: optional(number()),
	html: string(),
	isMandatory: boolean(),
	caption: optional(string()),
});

export type EmbedBlockElement = InferOutput<typeof EmbedBlockElementSchema>;

const ExplainerAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.ExplainerAtomBlockElement',
	),
	elementId: string(),
	id: string(),
	title: string(),
	body: string(),
	role: optional(RoleTypeSchema),
});

export type ExplainerAtomBlockElement = InferOutput<
	typeof ExplainerAtomBlockElementSchema
>;

const GenericAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.GenericAtomBlockElement',
	),
	url: string(),
	placeholderUrl: optional(string()),
	id: optional(string()),
	html: optional(string()),
	css: optional(string()),
	js: optional(string()),
	elementId: string(),
});

export type GenericAtomBlockElement = InferOutput<
	typeof GenericAtomBlockElementSchema
>;

const GuideAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GuideAtomBlockElement'),
	elementId: string(),
	id: string(),
	label: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role: optional(RoleTypeSchema),
});

export type GuideAtomBlockElement = InferOutput<
	typeof GuideAtomBlockElementSchema
>;

const GuVideoBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GuVideoBlockElement'),
	elementId: string(),
	assets: array(VideoAssetsSchema),
	caption: string(),
	html: string(),
	source: string(),
	role: optional(RoleTypeSchema),
	imageMedia: optional(object({ allImages: array(ImageSchema) })),
	originalUrl: optional(string()),
	url: optional(string()),
});

export type GuVideoBlockElement = InferOutput<typeof GuVideoBlockElementSchema>;

const HighlightBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.HighlightBlockElement'),
	elementId: string(),
	html: string(),
});

export type HighlightBlockElement = InferOutput<
	typeof HighlightBlockElementSchema
>;

export const ImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ImageBlockElement'),
	elementId: string(),
	media: object({ allImages: array(ImageSchema) }),
	data: object({
		alt: optional(string()),
		credit: optional(string()),
		caption: optional(string()),
		copyright: optional(string()),
	}),
	imageSources: array(ImageSourceSchema),
	displayCredit: optional(boolean()),
	role: RoleTypeSchema,
	title: optional(string()),
	starRating: optional(StarRatingSchema),
	isAvatar: optional(boolean()),
	/**
	 * position is an index starting at 1 for all the images
	 * that are “lightboxable”, including main media.
	 *
	 * It is generated by `addImagePositions`
	 */
	position: optional(number()),
});

export type ImageBlockElement = InferOutput<typeof ImageBlockElementSchema>;

const InstagramBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.InstagramBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	hasCaption: boolean(),
	role: optional(RoleTypeSchema),
});

export type InstagramBlockElement = InferOutput<
	typeof InstagramBlockElementSchema
>;

const InteractiveAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
	),
	elementId: string(),
	url: string(),
	id: string(),
	title: string(),
	js: optional(string()),
	html: optional(string()),
	css: optional(string()),
	placeholderUrl: optional(string()),
	role: optional(RoleTypeSchema),
});

export type InteractiveAtomBlockElement = InferOutput<
	typeof InteractiveAtomBlockElementSchema
>;

// Can't guarantee anything in interactiveBlockElement :shrug:
const InteractiveBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.InteractiveBlockElement',
	),
	elementId: string(),
	url: optional(string()),
	isMandatory: optional(boolean()),
	scriptUrl: optional(string()),
	alt: optional(string()),
	role: optional(RoleTypeSchema),
	caption: optional(string()),
});

export type InteractiveBlockElement = InferOutput<
	typeof InteractiveBlockElementSchema
>;

const ItemLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ItemLinkBlockElement'),
	elementId: string(),
	html: string(),
});

export type ItemLinkBlockElement = InferOutput<
	typeof ItemLinkBlockElementSchema
>;

const KeyTakeawaySchema: GenericSchema<KeyTakeaway> = object({
	title: string(),
	body: array(lazy(() => FEElementSchema)),
});

export type KeyTakeaway = {
	title: string;
	body: Array<FEElement>;
};

const QAndAExplainerSchema: GenericSchema<QAndAExplainer> = object({
	title: string(),
	body: array(lazy(() => FEElementSchema)),
});

export type QAndAExplainer = {
	title: string;
	body: Array<FEElement>;
};

const MiniProfileSchema: GenericSchema<MiniProfile> = object({
	title: string(),
	body: array(lazy(() => FEElementSchema)),
	bio: optional(string()),
	endNote: optional(string()),
});

export type MiniProfile = {
	title: string;
	body: Array<FEElement>;
	bio?: string;
	endNote?: string;
};

const MultiBylineSchema: GenericSchema<MultiByline> = object({
	title: string(),
	body: array(lazy(() => FEElementSchema)),
	bio: optional(string()),
	endNote: optional(string()),
	imageUrl: optional(string()),
	byline: string(),
	bylineHtml: string(),
});

export type MultiByline = {
	title: string;
	body: Array<FEElement>;
	bio?: string;
	endNote?: string;
	imageUrl?: string;
	byline: string;
	bylineHtml: string;
};

const KeyTakeawaysBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
	),
	keyTakeaways: array(KeyTakeawaySchema),
});

export type KeyTakeawaysBlockElement = InferOutput<
	typeof KeyTakeawaysBlockElementSchema
>;

const QAndAExplainerBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.QAndAExplainerBlockElement',
	),
	qAndAExplainers: array(QAndAExplainerSchema),
});

export type QAndAExplainerBlockElement = InferOutput<
	typeof QAndAExplainerBlockElementSchema
>;

const MiniProfilesBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.MiniProfilesBlockElement',
	),
	miniProfiles: array(MiniProfileSchema),
});

export type MiniProfilesBlockElement = InferOutput<
	typeof MiniProfilesBlockElementSchema
>;

const MultiBylinesBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.MultiBylinesBlockElement',
	),
	multiBylines: array(MultiBylineSchema),
});

export type MultiBylinesBlockElement = InferOutput<
	typeof MultiBylinesBlockElementSchema
>;

const ListItemSchema: GenericSchema<ListItem> = object({
	title: optional(string()),
	elements: array(lazy(() => FEElementSchema)),
	bio: optional(string()),
	endNote: optional(string()),
	contributorImageOverrideUrl: optional(string()),
	contributorIds: optional(array(string())),
	byline: optional(string()),
	bylineHtml: optional(string()),
});

export type ListItem = {
	title?: string;
	elements: Array<FEElement>;
	bio?: string;
	endNote?: string;
	contributorImageOverrideUrl?: string;
	contributorIds?: Array<string>;
	byline?: string;
	bylineHtml?: string;
};

const LinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.LinkBlockElement'),
	url: string(),
	label: string(),
	linkType: literal('ProductButton'),
});

export type LinkBlockElement = InferOutput<typeof LinkBlockElementSchema>;

const ListBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ListBlockElement'),
	listElementType: union([
		literal('KeyTakeaways'),
		literal('QAndAExplainer'),
		literal('MiniProfiles'),
		literal('MultiByline'),
	]),
	items: array(ListItemSchema),
	elementId: string(),
});

export type ListBlockElement = InferOutput<typeof ListBlockElementSchema>;

const MapBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.MapBlockElement'),
	elementId: string(),
	embedUrl: string(),
	originalUrl: string(),
	title: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
});

export type MapBlockElement = InferOutput<typeof MapBlockElementSchema>;

const MediaAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MediaAtomBlockElement'),
	elementId: string(),
	id: string(),
	assets: array(VideoAssetsSchema),
	posterImage: optional(
		array(
			object({
				url: string(),
				width: number(),
			}),
		),
	),
	title: optional(string()),
	duration: optional(number()),
});

export type MediaAtomBlockElement = InferOutput<
	typeof MediaAtomBlockElementSchema
>;

const MultiImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiImageBlockElement'),
	elementId: string(),
	images: array(ImageBlockElementSchema),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
});

export type MultiImageBlockElement = InferOutput<
	typeof MultiImageBlockElementSchema
>;

const NewsletterSignupBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	),
	newsletter: NewsletterSchema,
	elementId: optional(string()),
});

export type NewsletterSignupBlockElement = InferOutput<
	typeof NewsletterSignupBlockElementSchema
>;

const AdPlaceholderBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
	),
});

export type AdPlaceholderBlockElement = InferOutput<
	typeof AdPlaceholderBlockElementSchema
>;

const NumberedTitleBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.NumberedTitleBlockElement',
	),
	elementId: string(),
	position: number(),
	html: string(),
});

export type NumberedTitleBlockElement = InferOutput<
	typeof NumberedTitleBlockElementSchema
>;

const SubheadingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SubheadingBlockElement'),
	elementId: string(),
	html: string(),
});

export type SubheadingBlockElement = InferOutput<
	typeof SubheadingBlockElementSchema
>;

const InteractiveContentsBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
	),
	elementId: string(),
	subheadingLinks: array(SubheadingBlockElementSchema),
	endDocumentElementId: optional(string()),
});

export type InteractiveContentsBlockElement = InferOutput<
	typeof InteractiveContentsBlockElementSchema
>;

const ProfileAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.ProfileAtomBlockElement',
	),
	elementId: string(),
	id: string(),
	label: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role: optional(RoleTypeSchema),
});

export type ProfileAtomBlockElement = InferOutput<
	typeof ProfileAtomBlockElementSchema
>;

const PullquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.PullquoteBlockElement'),
	elementId: string(),
	html: optional(string()),
	role: RoleTypeSchema,
	attribution: optional(string()),
	isThirdPartyTracking: optional(boolean()),
});

export type PullquoteBlockElement = InferOutput<
	typeof PullquoteBlockElementSchema
>;

const QABlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QABlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role: optional(RoleTypeSchema),
});

export type QABlockElement = InferOutput<typeof QABlockElementSchema>;

const RichLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.RichLinkBlockElement'),
	elementId: string(),
	url: string(),
	text: string(),
	prefix: string(),
	role: optional(union([RoleTypeSchema, literal('richLink')])),
});

export type RichLinkBlockElement = InferOutput<
	typeof RichLinkBlockElementSchema
>;

const SoundcloudBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.SoundcloudBlockElement'),
	elementId: string(),
	html: string(),
	id: string(),
	isTrack: boolean(),
	isMandatory: boolean(),
	role: optional(RoleTypeSchema),
});

export type SoundcloudBlockElement = InferOutput<
	typeof SoundcloudBlockElementSchema
>;

const SpotifyBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.SpotifyBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	title: optional(string()),
	height: optional(number()),
	width: optional(number()),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
});

export type SpotifyBlockElement = InferOutput<typeof SpotifyBlockElementSchema>;

const StarRatingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.StarRatingBlockElement'),
	elementId: string(),
	rating: StarRatingSchema,
	size: RatingSizeTypeSchema,
});

export type StarRatingBlockElement = InferOutput<
	typeof StarRatingBlockElementSchema
>;

const TableBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TableBlockElement'),
	elementId: string(),
	isMandatory: boolean(),
	html: string(),
	role: optional(RoleTypeSchema),
});

export type TableBlockElement = InferOutput<typeof TableBlockElementSchema>;

const TextBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TextBlockElement'),
	elementId: string(),
	dropCap: optional(union([literal('on'), literal('off')])),
	html: string(),
});

export type TextBlockElement = InferOutput<typeof TextBlockElementSchema>;

const DCRTimelineEventSchema: GenericSchema<DCRTimelineEvent> = object({
	date: string(),
	title: optional(string()),
	label: optional(string()),
	main: optional(lazy(() => FEElementSchema)),
	body: array(lazy(() => FEElementSchema)),
});

export type DCRTimelineEvent = {
	date: string;
	title?: string;
	label?: string;
	main?: FEElement;
	body: Array<FEElement>;
};

const DCRTimelineSectionSchema = object({
	title: string(),
	events: array(DCRTimelineEventSchema),
});

export type DCRTimelineSection = InferOutput<typeof DCRTimelineSectionSchema>;

const DCRTimelineBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
	),
	events: array(DCRTimelineEventSchema),
});

export type DCRTimelineBlockElement = InferOutput<
	typeof DCRTimelineBlockElementSchema
>;

const DCRSectionedTimelineBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
	),
	sections: array(DCRTimelineSectionSchema),
});

export type DCRSectionedTimelineBlockElement = InferOutput<
	typeof DCRSectionedTimelineBlockElementSchema
>;

const FETimelineEventSchema: GenericSchema<FETimelineEvent> = object({
	title: optional(string()),
	date: optional(string()),
	label: optional(string()),
	main: optional(lazy(() => FEElementSchema)),
	body: array(lazy(() => FEElementSchema)),
});

export type FETimelineEvent = {
	title?: string;
	date?: string;
	label?: string;
	main?: FEElement;
	body: Array<FEElement>;
};

const FETimelineSectionSchema = object({
	title: optional(string()),
	events: array(FETimelineEventSchema),
});

export type FETimelineSection = InferOutput<typeof FETimelineSectionSchema>;

const FETimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineBlockElement'),
	elementId: string(),
	sections: array(FETimelineSectionSchema),
});

export type FETimelineBlockElement = InferOutput<
	typeof FETimelineBlockElementSchema
>;

const TimelineAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.TimelineAtomBlockElement',
	),
	elementId: string(),
	id: string(),
	title: string(),
	description: optional(string()),
	events: array(TimelineAtomEventSchema),
	role: optional(RoleTypeSchema),
});

export type TimelineAtomBlockElement = InferOutput<
	typeof TimelineAtomBlockElementSchema
>;

const TweetBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.TweetBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	id: string(),
	hasMedia: boolean(),
	role: optional(RoleTypeSchema),
});

export type TweetBlockElement = InferOutput<typeof TweetBlockElementSchema>;

const VineBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.VineBlockElement'),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	originalUrl: string(),
	title: string(),
});

export type VineBlockElement = InferOutput<typeof VineBlockElementSchema>;

const VideoBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.VideoBlockElement'),
	elementId: string(),
	role: optional(RoleTypeSchema),
});

export type VideoBlockElement = InferOutput<typeof VideoBlockElementSchema>;

const VideoFacebookBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal(
		'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
	),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	embedUrl: optional(string()),
	role: optional(RoleTypeSchema),
});

export type VideoFacebookBlockElement = InferOutput<
	typeof VideoFacebookBlockElementSchema
>;

const VideoVimeoBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.VideoVimeoBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	url: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	credit: optional(string()),
	title: optional(string()),
	originalUrl: optional(string()),
	role: optional(RoleTypeSchema),
});

export type VideoVimeoBlockElement = InferOutput<
	typeof VideoVimeoBlockElementSchema
>;

const VideoYoutubeBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal(
		'model.dotcomrendering.pageElements.VideoYoutubeBlockElement',
	),
	elementId: string(),
	embedUrl: optional(string()),
	url: string(),
	originalUrl: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	credit: optional(string()),
	title: optional(string()),
	role: optional(RoleTypeSchema),
});

export type VideoYoutubeBlockElement = InferOutput<
	typeof VideoYoutubeBlockElementSchema
>;

const YoutubeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.YoutubeBlockElement'),
	assetId: string(),
	mediaTitle: string(),
	id: string(),
	elementId: string(),
	channelId: optional(string()),
	duration: optional(number()),
	posterImage: optional(
		array(
			object({
				url: string(),
				width: number(),
			}),
		),
	),
	expired: boolean(),
	overrideImage: optional(string()),
	altText: optional(string()),
	role: optional(RoleTypeSchema),
});

export type YoutubeBlockElement = InferOutput<typeof YoutubeBlockElementSchema>;

const WitnessTypeDataBaseSchema = object({
	authorUsername: string(),
	originalUrl: string(),
	source: string(),
	title: string(),
	url: string(),
	dateCreated: string(),
	apiUrl: string(),
	authorName: string(),
	witnessEmbedType: string(),
	html: optional(string()),
	authorWitnessProfileUrl: string(),
});

export type WitnessTypeDataBase = InferOutput<typeof WitnessTypeDataBaseSchema>;

const WitnessTypeDataImageSchema = object({
	...WitnessTypeDataBaseSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataImage'),
	type: literal('image'),
	alt: string(),
	caption: optional(string()),
	mediaId: string(),
	photographer: string(),
});

export type WitnessTypeDataImage = InferOutput<
	typeof WitnessTypeDataImageSchema
>;

const WitnessTypeDataVideoSchema = object({
	...WitnessTypeDataBaseSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataVideo'),
	type: literal('video'),
	description: string(),
	youtubeHtml: string(),
	youtubeDescription: string(),
	youtubeUrl: string(),
	width: number(),
	youtubeSource: string(),
	youtubeAuthorName: string(),
	height: number(),
	youtubeTitle: string(),
});

export type WitnessTypeDataVideo = InferOutput<
	typeof WitnessTypeDataVideoSchema
>;

const WitnessTypeDataTextSchema = object({
	...WitnessTypeDataBaseSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataText'),
	type: literal('text'),
	description: string(),
	authorUsername: string(),
	originalUrl: string(),
	source: string(),
	title: string(),
	url: string(),
	dateCreated: string(),
	apiUrl: string(),
	authorName: string(),
	witnessEmbedType: string(),
	authorWitnessProfileUrl: string(),
});

export type WitnessTypeDataText = InferOutput<typeof WitnessTypeDataTextSchema>;

const WitnessAssetTypeSchema = object({
	type: literal('Image'),
	mimeType: optional(string()),
	file: optional(string()),
	typeData: optional(
		object({
			name: optional(string()),
		}),
	),
});

export type WitnessAssetType = InferOutput<typeof WitnessAssetTypeSchema>;

const WitnessTypeBlockElementSchema = object({
	...ThirdPartyEmbeddedContentSchema.entries,
	_type: literal('model.dotcomrendering.pageElements.WitnessBlockElement'),
	elementId: string(),
	assets: array(WitnessAssetTypeSchema),
	isThirdPartyTracking: boolean(),
	witnessTypeData: union([
		WitnessTypeDataImageSchema,
		WitnessTypeDataVideoSchema,
		WitnessTypeDataTextSchema,
	]),
});

export type WitnessTypeBlockElement = InferOutput<
	typeof WitnessTypeBlockElementSchema
>;

type EntryID = CrosswordProps['data']['entries'][0]['id'];

const EntryIDSchema = custom<EntryID>(
	(input) =>
		typeof input === 'string' && /^[0-9]*-(across|down)$/.test(input),
);

export const CAPICrosswordSchema = object({
	creator: optional(
		object({
			name: string(),
			webUrl: string(),
		}),
	),
	crosswordType: union([
		literal('cryptic'),
		literal('everyman'),
		literal('prize'),
		literal('quick-cryptic'),
		literal('quick'),
		literal('quiptic'),
		literal('special'),
		literal('speedy'),
		literal('sunday-quick'),
		literal('weekend'),
	]),
	date: number(),
	dateSolutionAvailable: optional(number()),
	dimensions: object({
		rows: number(),
		cols: number(),
	}),
	entries: array(
		object({
			id: EntryIDSchema,
			group: pipe(
				array(EntryIDSchema),
				nonEmpty('group must have at least one item'),
			),
			number: number(),
			direction: union([literal('across'), literal('down')]),
			position: record(union([literal('x'), literal('y')]), number()),
			clue: string(),
			humanNumber: string(),
			solution: optional(string()),
			length: number(),
			separatorLocations: record(string(), array(number())),
		}),
	),
	id: string(),
	name: string(),
	number: number(),
	pdf: optional(string()),
	solutionAvailable: boolean(),
	webPublicationDate: optional(number()),
	instructions: optional(string()),
});

const CrosswordElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CrosswordElement'),
	crossword: CAPICrosswordSchema,
});

export const FEElementSchema = union([
	AdPlaceholderBlockElementSchema,
	AudioAtomBlockElementSchema,
	AudioBlockElementSchema,
	BlockquoteBlockElementSchema,
	CaptionBlockElementSchema,
	CalloutBlockElementSchema,
	CalloutBlockElementV2Schema,
	CartoonBlockElementSchema,
	ChartAtomBlockElementSchema,
	CodeBlockElementSchema,
	CommentBlockElementSchema,
	ContentAtomBlockElementSchema,
	DisclaimerBlockElementSchema,
	DividerBlockElementSchema,
	DocumentBlockElementSchema,
	EmbedBlockElementSchema,
	ExplainerAtomBlockElementSchema,
	GenericAtomBlockElementSchema,
	GuideAtomBlockElementSchema,
	GuVideoBlockElementSchema,
	HighlightBlockElementSchema,
	ImageBlockElementSchema,
	InstagramBlockElementSchema,
	InteractiveAtomBlockElementSchema,
	InteractiveContentsBlockElementSchema,
	InteractiveBlockElementSchema,
	ItemLinkBlockElementSchema,
	KeyTakeawaysBlockElementSchema,
	LinkBlockElementSchema,
	ListBlockElementSchema,
	MapBlockElementSchema,
	MediaAtomBlockElementSchema,
	MiniProfilesBlockElementSchema,
	MultiBylinesBlockElementSchema,
	MultiImageBlockElementSchema,
	NumberedTitleBlockElementSchema,
	NewsletterSignupBlockElementSchema,
	ProfileAtomBlockElementSchema,
	PullquoteBlockElementSchema,
	QAndAExplainerBlockElementSchema,
	QABlockElementSchema,
	QuizAtomBlockElementSchema,
	RichLinkBlockElementSchema,
	SoundcloudBlockElementSchema,
	SpotifyBlockElementSchema,
	StarRatingBlockElementSchema,
	SubheadingBlockElementSchema,
	TableBlockElementSchema,
	TextBlockElementSchema,
	TimelineAtomBlockElementSchema,
	FETimelineBlockElementSchema,
	DCRTimelineBlockElementSchema,
	DCRSectionedTimelineBlockElementSchema,
	TweetBlockElementSchema,
	VideoBlockElementSchema,
	VideoFacebookBlockElementSchema,
	VideoVimeoBlockElementSchema,
	VideoYoutubeBlockElementSchema,
	VineBlockElementSchema,
	YoutubeBlockElementSchema,
	WitnessTypeBlockElementSchema,
	CrosswordElementSchema,
]);

export type FEElement = InferOutput<typeof FEElementSchema>;

// -------------------------------------
// Misc
// -------------------------------------

export type TimelineAtomType = {
	id: string;
	events?: TimelineAtomEvent[];
	title: string;
	description?: string;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

const ImageForLightboxSchema = object({
	masterUrl: string(),
	elementId: string(),
	width: number(),
	height: number(),
	position: number(),
	alt: optional(string()),
	credit: optional(string()),
	caption: optional(string()),
	displayCredit: optional(boolean()),
	title: optional(string()),
	starRating: optional(number()),
	/**
	 * Used for liveblog images to generate a link back to the
	 * original post where the image was used
	 */
	blockId: optional(string()),
	/**
	 * Used to show when a liveblog image was posted
	 */
	firstPublished: optional(number()),
});

export type ImageForLightbox = InferOutput<typeof ImageForLightboxSchema>;

export type SharePlatformType =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'linkedIn'
	| 'pinterest'
	| 'whatsApp'
	| 'messenger';

export type SharingUrlsType = {
	[K in SharePlatformType]?: {
		url: string;
		userMessage: string;
	};
};
