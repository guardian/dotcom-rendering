import {
	any,
	array,
	boolean,
	literal,
	merge,
	number,
	object,
	optional,
	type Output,
	string,
	union,
} from 'valibot';
import { ArticleFormatSchema } from '../lib/articleFormat';

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

export type RoleType = Output<typeof RoleTypeSchema>;

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
 * This duplicate type is unfortunate, but the image sources come lowercase
 * Note, 'richLink' is used internally but does not exist upstream.
 *
 * TODO check:
 * type Weighting = Exclude<RoleType, 'halfWidth' | 'richLink'> | 'halfwidth';
 * TODO can pick from RoleTypeSchema?
 */
const WeightingSchema = union([
	literal('immersive'),
	literal('supporting'),
	literal('showcase'),
	literal('inline'),
	literal('thumbnail'),
]);

export type Weighting = Output<typeof WeightingSchema>;

const SrcSetItemSchema = object({
	src: string(),
	width: number(),
});

const ImageSourceSchema = object({
	weighting: WeightingSchema,
	srcSet: array(SrcSetItemSchema),
});

const StarRatingSchema = union([
	literal(0),
	literal(1),
	literal(2),
	literal(3),
	literal(4),
	literal(5),
]);

export type StarRating = Output<typeof StarRatingSchema>;

const RatingSizeTypeSchema = union([literal('large'), literal('small')]);

export type RatingSizeType = Output<typeof RatingSizeTypeSchema>;

const TimelineAtomEventSchema = object({
	title: string(),
	date: string(),
	unixDate: number(),
	body: optional(string()),
	toDate: optional(string()),
	toUnixDate: optional(number()),
});

export type TimelineAtomEvent = Output<typeof TimelineAtomEventSchema>;

// -------------------------------------
// Newsletter
// -------------------------------------

const NewsletterSchema = object({
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

export type Newsletter = Output<typeof NewsletterSchema>;

const NewsletterLayoutSchema = object({
	groups: array(
		object({
			title: string(),
			subtitle: optional(string()),
			newsletters: array(string()),
		}),
	),
});

export type NewsletterLayout = Output<typeof NewsletterLayoutSchema>;

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

export type AudioAsset = Output<typeof AudioAssetSchema>;

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

export type CampaignFieldText = Output<typeof CampaignFieldTextSchema>;

const CampaignFieldTextAreaSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('textarea'),
	minlength: optional(number()),
	maxlength: optional(number()),
});

export type CampaignFieldTextArea = Output<typeof CampaignFieldTextAreaSchema>;

const CampaignFieldFileSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('file'),
});

export type CampaignFieldFile = Output<typeof CampaignFieldFileSchema>;

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

export type CampaignFieldRadio = Output<typeof CampaignFieldRadioSchema>;

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

export type CampaignFieldSelect = Output<typeof CampaignFieldSelectSchema>;

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
export type CampaignFieldType = Output<typeof CampaignFieldTypeSchema>;

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

export type AnswerType = Output<typeof AnswerTypeSchema>;

const QuestionTypeSchema = object({
	id: string(),
	text: string(),
	answers: array(AnswerTypeSchema),
	imageUrl: optional(string()),
	imageAlt: optional(string()),
});

export type QuestionType = Output<typeof QuestionTypeSchema>;

const ResultGroupsTypeSchema = object({
	title: string(),
	shareText: string(),
	minScore: number(),
	id: string(),
});

export type ResultGroupsType = Output<typeof ResultGroupsTypeSchema>;

const ResultsBucketTypeSchema = object({
	id: string(),
	title: string(),
	description: string(),
});

export type ResultsBucketType = Output<typeof ResultsBucketTypeSchema>;

const KnowledgeQuizAtomTypeSchema = object({
	id: string(),
	questions: array(QuestionTypeSchema),
	resultGroups: array(ResultGroupsTypeSchema),
	pageId: string(),
	webTitle: string(),
	format: ArticleFormatSchema,
});

export type KnowledgeQuizAtomType = Output<typeof KnowledgeQuizAtomTypeSchema>;

const PersonalityQuizAtomTypeSchema = object({
	id: string(),
	questions: array(QuestionTypeSchema),
	resultBuckets: array(ResultsBucketTypeSchema),
	pageId: string(),
	webTitle: string(),
	format: ArticleFormatSchema,
});

export type PersonalityQuizAtomType = Output<
	typeof PersonalityQuizAtomTypeSchema
>;

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

export type AudioAtomBlockElement = Output<typeof AudioAtomBlockElementSchema>;

const AudioBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.AudioBlockElement'),
	id: optional(string()),
	elementId: string(),
	assets: array(AudioAssetSchema),
});

export type AudioBlockElement = Output<typeof AudioBlockElementSchema>;

const BlockquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.BlockquoteBlockElement'),
	elementId: string(),
	html: string(),
	quoted: optional(boolean()),
});

export type BlockquoteBlockElement = Output<
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

export type CaptionBlockElement = Output<typeof CaptionBlockElementSchema>;

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

export type CalloutBlockElement = Output<typeof CalloutBlockElementSchema>;

const CalloutContactTypeSchema = object({
	name: string(),
	value: string(),
	urlPrefix: string(),
	guidance: optional(string()),
});

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

export type CalloutBlockElementV2 = Output<typeof CalloutBlockElementV2Schema>;

const CartoonVariantSchema = object({
	viewportSize: union([literal('small'), literal('large')]),
	images: array(ImageSchema),
});

export type CartoonVariant = Output<typeof CartoonVariantSchema>;

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

export type CartoonBlockElement = Output<typeof CartoonBlockElementSchema>;

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

export type ChartAtomBlockElement = Output<typeof ChartAtomBlockElementSchema>;

const QuizAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QuizAtomBlockElement'),
	elementId: string(),
	quizType: union([literal('knowledge'), literal('personality')]),
	id: string(),
	questions: array(QuestionTypeSchema),
	resultBuckets: array(ResultsBucketTypeSchema),
	resultGroups: array(ResultGroupsTypeSchema),
});

export type QuizAtomBlockElement = Output<typeof QuizAtomBlockElementSchema>;

const CodeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CodeBlockElement'),
	elementId: string(),
	html: string(),
	isMandatory: boolean(),
	language: optional(string()),
});

export type CodeBlockElement = Output<typeof CodeBlockElementSchema>;

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

export type CommentBlockElement = Output<typeof CommentBlockElementSchema>;

const ContentAtomBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.ContentAtomBlockElement',
	),
	elementId: string(),
	atomId: string(),
});

export type ContentAtomBlockElement = Output<
	typeof ContentAtomBlockElementSchema
>;

const DisclaimerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DisclaimerBlockElement'),
	elementId: string(),
	html: string(),
	role: optional(RoleTypeSchema),
});

export type DisclaimerBlockElement = Output<
	typeof DisclaimerBlockElementSchema
>;

const DividerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DividerBlockElement'),
	size: optional(union([literal('full'), literal('partial')])),
	spaceAbove: optional(union([literal('tight'), literal('loose')])),
});

export type DividerBlockElement = Output<typeof DividerBlockElementSchema>;

const DocumentBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.DocumentBlockElement',
		),
		elementId: string(),
		embedUrl: optional(string()),
		height: optional(number()),
		width: optional(number()),
		title: optional(string()),
		role: optional(RoleTypeSchema),
	}),
]);

export type DocumentBlockElement = Output<typeof DocumentBlockElementSchema>;

const EmbedBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
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
	}),
]);

export type EmbedBlockElement = Output<typeof EmbedBlockElementSchema>;

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

export type ExplainerAtomBlockElement = Output<
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

export type GenericAtomBlockElement = Output<
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

export type GuideAtomBlockElement = Output<typeof GuideAtomBlockElementSchema>;

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

export type GuVideoBlockElement = Output<typeof GuVideoBlockElementSchema>;

const HighlightBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.HighlightBlockElement'),
	elementId: string(),
	html: string(),
});

export type HighlightBlockElement = Output<typeof HighlightBlockElementSchema>;

const ImageBlockElementSchema = object({
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

export type ImageBlockElement = Output<typeof ImageBlockElementSchema>;

const InstagramBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.InstagramBlockElement',
		),
		elementId: string(),
		html: string(),
		url: string(),
		hasCaption: boolean(),
		role: optional(RoleTypeSchema),
	}),
]);

export type InstagramBlockElement = Output<typeof InstagramBlockElementSchema>;

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

export type InteractiveAtomBlockElement = Output<
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

export type InteractiveBlockElement = Output<
	typeof InteractiveBlockElementSchema
>;

const ItemLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ItemLinkBlockElement'),
	elementId: string(),
	html: string(),
});

export type ItemLinkBlockElement = Output<typeof ItemLinkBlockElementSchema>;

const KeyTakeawaySchema = object({
	title: string(),
	body: array(FEElementSchema),
});

export type KeyTakeaway = Output<typeof KeyTakeawaySchema>;

const QAndAExplainerSchema = object({
	title: string(),
	body: array(FEElementSchema),
});

export type QAndAExplainer = Output<typeof QAndAExplainerSchema>;

const MiniProfileSchema = object({
	title: string(),
	body: array(FEElementSchema),
	bio: optional(string()),
	endNote: optional(string()),
});

export type MiniProfile = Output<typeof MiniProfileSchema>;

const MultiBylineSchema = object({
	title: string(),
	body: array(FEElementSchema),
	bio: optional(string()),
	endNote: optional(string()),
	imageUrl: optional(string()),
	byline: string(),
	bylineHtml: string(),
});

export type MultiByline = Output<typeof MultiBylineSchema>;

const KeyTakeawaysBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
	),
	keyTakeaways: array(KeyTakeawaySchema),
});

export type KeyTakeawaysBlockElement = Output<
	typeof KeyTakeawaysBlockElementSchema
>;

const QAndAExplainerBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.QAndAExplainerBlockElement',
	),
	qAndAExplainers: array(QAndAExplainerSchema),
});

export type QAndAExplainerBlockElement = Output<
	typeof QAndAExplainerBlockElementSchema
>;

const MiniProfilesBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.MiniProfilesBlockElement',
	),
	miniProfiles: array(MiniProfileSchema),
});

export type MiniProfilesBlockElement = Output<
	typeof MiniProfilesBlockElementSchema
>;

const MultiBylinesBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.MultiBylinesBlockElement',
	),
	multiBylines: array(MultiBylineSchema),
});

export type MultiBylinesBlockElement = Output<
	typeof MultiBylinesBlockElementSchema
>;

const ListItemSchema = object({
	title: optional(string()),
	elements: array(FEElementSchema),
	bio: optional(string()),
	endNote: optional(string()),
	contributorImageOverrideUrl: optional(string()),
	contributorIds: optional(array(string())),
	byline: optional(string()),
	bylineHtml: optional(string()),
});

export type ListItem = Output<typeof ListItemSchema>;

const LinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.LinkBlockElement'),
	url: string(),
	label: string(),
	linkType: literal('ProductButton'),
});

export type LinkBlockElement = Output<typeof LinkBlockElementSchema>;

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

export type ListBlockElement = Output<typeof ListBlockElementSchema>;

const MapBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal('model.dotcomrendering.pageElements.MapBlockElement'),
		elementId: string(),
		embedUrl: string(),
		originalUrl: string(),
		title: string(),
		height: number(),
		width: number(),
		caption: optional(string()),
		role: optional(RoleTypeSchema),
	}),
]);

export type MapBlockElement = Output<typeof MapBlockElementSchema>;

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

export type MediaAtomBlockElement = Output<typeof MediaAtomBlockElementSchema>;

const MultiImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiImageBlockElement'),
	elementId: string(),
	images: array(ImageBlockElementSchema),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
});

export type MultiImageBlockElement = Output<
	typeof MultiImageBlockElementSchema
>;

const NewsletterSignupBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	),
	newsletter: NewsletterSchema,
	elementId: optional(string()),
});

export type NewsletterSignupBlockElement = Output<
	typeof NewsletterSignupBlockElementSchema
>;

const AdPlaceholderBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
	),
});

export type AdPlaceholderBlockElement = Output<
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

export type NumberedTitleBlockElement = Output<
	typeof NumberedTitleBlockElementSchema
>;

const SubheadingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SubheadingBlockElement'),
	elementId: string(),
	html: string(),
});

export type SubheadingBlockElement = Output<
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

export type InteractiveContentsBlockElement = Output<
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

export type ProfileAtomBlockElement = Output<
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

export type PullquoteBlockElement = Output<typeof PullquoteBlockElementSchema>;

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

export type QABlockElement = Output<typeof QABlockElementSchema>;

const RichLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.RichLinkBlockElement'),
	elementId: string(),
	url: string(),
	text: string(),
	prefix: string(),
	role: optional(union([RoleTypeSchema, literal('richLink')])),
});

export type RichLinkBlockElement = Output<typeof RichLinkBlockElementSchema>;

const SoundcloudBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.SoundcloudBlockElement',
		),
		elementId: string(),
		html: string(),
		id: string(),
		isTrack: boolean(),
		isMandatory: boolean(),
		role: optional(RoleTypeSchema),
	}),
]);

export type SoundcloudBlockElement = Output<
	typeof SoundcloudBlockElementSchema
>;

const SpotifyBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.SpotifyBlockElement',
		),
		elementId: string(),
		embedUrl: optional(string()),
		title: optional(string()),
		height: optional(number()),
		width: optional(number()),
		caption: optional(string()),
		role: optional(RoleTypeSchema),
	}),
]);

export type SpotifyBlockElement = Output<typeof SpotifyBlockElementSchema>;

const StarRatingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.StarRatingBlockElement'),
	elementId: string(),
	rating: StarRatingSchema,
	size: RatingSizeTypeSchema,
});

export type StarRatingBlockElement = Output<
	typeof StarRatingBlockElementSchema
>;

const TableBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TableBlockElement'),
	elementId: string(),
	isMandatory: boolean(),
	html: string(),
	role: optional(RoleTypeSchema),
});

export type TableBlockElement = Output<typeof TableBlockElementSchema>;

const TextBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TextBlockElement'),
	elementId: string(),
	dropCap: optional(union([literal('on'), literal('off')])),
	html: string(),
});

export type TextBlockElement = Output<typeof TextBlockElementSchema>;

const DCRTimelineEventSchema = object({
	date: string(),
	title: optional(string()),
	label: optional(string()),
	main: optional(FEElementSchema),
	body: array(FEElementSchema),
});

export type DCRTimelineEvent = Output<typeof DCRTimelineEventSchema>;

const DCRTimelineSectionSchema = object({
	title: string(),
	events: array(DCRTimelineEventSchema),
});

export type DCRTimelineSection = Output<typeof DCRTimelineSectionSchema>;

const DCRTimelineBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
	),
	events: array(DCRTimelineEventSchema),
});

export type DCRTimelineBlockElement = Output<
	typeof DCRTimelineBlockElementSchema
>;

const DCRSectionedTimelineBlockElementSchema = object({
	_type: literal(
		'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
	),
	sections: array(DCRTimelineSectionSchema),
});

export type DCRSectionedTimelineBlockElement = Output<
	typeof DCRSectionedTimelineBlockElementSchema
>;

const FETimelineEventSchema = object({
	title: optional(string()),
	date: optional(string()),
	label: optional(string()),
	main: optional(FEElementSchema),
	body: array(FEElementSchema),
});

export type FETimelineEvent = Output<typeof FETimelineEventSchema>;

const FETimelineSectionSchema = object({
	title: optional(string()),
	events: array(FETimelineEventSchema),
});

export type FETimelineSection = Output<typeof FETimelineSectionSchema>;

const FETimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineBlockElement'),
	elementId: string(),
	sections: array(FETimelineSectionSchema),
});

export type FETimelineBlockElement = Output<
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

export type TimelineAtomBlockElement = Output<
	typeof TimelineAtomBlockElementSchema
>;

const TweetBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal('model.dotcomrendering.pageElements.TweetBlockElement'),
		elementId: string(),
		html: string(),
		url: string(),
		id: string(),
		hasMedia: boolean(),
		role: optional(RoleTypeSchema),
	}),
]);

export type TweetBlockElement = Output<typeof TweetBlockElementSchema>;

const VineBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal('model.dotcomrendering.pageElements.VineBlockElement'),
		elementId: string(),
		url: string(),
		height: number(),
		width: number(),
		originalUrl: string(),
		title: string(),
	}),
]);

export type VineBlockElement = Output<typeof VineBlockElementSchema>;

const VideoBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal('model.dotcomrendering.pageElements.VideoBlockElement'),
		elementId: string(),
		role: optional(RoleTypeSchema),
	}),
]);

export type VideoBlockElement = Output<typeof VideoBlockElementSchema>;

const VideoFacebookBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
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
	}),
]);

export type VideoFacebookBlockElement = Output<
	typeof VideoFacebookBlockElementSchema
>;

const VideoVimeoBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.VideoVimeoBlockElement',
		),
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
	}),
]);

export type VideoVimeoBlockElement = Output<
	typeof VideoVimeoBlockElementSchema
>;

const VideoYoutubeBlockElementSchema = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
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
	}),
]);

export type VideoYoutubeBlockElement = Output<
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

export type YoutubeBlockElement = Output<typeof YoutubeBlockElementSchema>;

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

export type WitnessTypeDataBase = Output<typeof WitnessTypeDataBaseSchema>;

const WitnessTypeDataImageSchema = merge([
	WitnessTypeDataBaseSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.WitnessTypeDataImage',
		),
		type: literal('image'),
		alt: string(),
		caption: optional(string()),
		mediaId: string(),
		photographer: string(),
	}),
]);

export type WitnessTypeDataImage = Output<typeof WitnessTypeDataImageSchema>;

const WitnessTypeDataVideoSchema = merge([
	WitnessTypeDataBaseSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.WitnessTypeDataVideo',
		),
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
	}),
]);

export type WitnessTypeDataVideo = Output<typeof WitnessTypeDataVideoSchema>;

const WitnessTypeDataTextSchema = merge([
	WitnessTypeDataBaseSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.WitnessTypeDataText',
		),
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
	}),
]);

export type WitnessTypeDataText = Output<typeof WitnessTypeDataTextSchema>;

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

export type WitnessAssetType = Output<typeof WitnessAssetTypeSchema>;

const WitnessTypeBlockElement = merge([
	ThirdPartyEmbeddedContentSchema,
	object({
		_type: literal(
			'model.dotcomrendering.pageElements.WitnessBlockElement',
		),
		elementId: string(),
		assets: array(WitnessAssetTypeSchema),
		isThirdPartyTracking: boolean(),
		witnessTypeData: union([
			WitnessTypeDataImageSchema,
			WitnessTypeDataVideoSchema,
			WitnessTypeDataTextSchema,
		]),
	}),
]);

export type WitnessTypeBlockElement = Output<typeof WitnessTypeBlockElement>;

const CrosswordElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CrosswordElement'),
	crossword: any(), // TODO - crossword schema
});

export type CrosswordElement = Output<typeof CrosswordElementSchema>;

const FEElementSchema = union([
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
	WitnessTypeBlockElement,
	CrosswordElementSchema,
]);

export type FEElement = Output<typeof FEElementSchema>;

// -------------------------------------
// Misc
// -------------------------------------

export type TimelineAtomType = {
	id: string;
	events?: TimelineAtomEvent[];
	title: string;
	description?: string;
	expandForStorybook: boolean;
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

export type ImageForLightbox = Output<typeof ImageForLightboxSchema>;

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
