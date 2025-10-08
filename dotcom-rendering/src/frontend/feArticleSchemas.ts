import {
	any,
	array,
	boolean,
	literal,
	number,
	object,
	optional,
	type Output,
	record,
	string,
	union,
} from 'valibot';
import { StarRatingSchema } from '../types/content';
import { FEFormatSchema } from './feArticle';

// Edition ID schema
const EditionIdSchema = union([
	literal('UK'),
	literal('US'),
	literal('AU'),
	literal('INT'),
	literal('EUR'),
]);

// Legacy Pillar schema
const LegacyPillarSchema = union([
	literal('news'),
	literal('opinion'),
	literal('sport'),
	literal('culture'),
	literal('lifestyle'),
	literal('labs'),
]);

// PageType schema
const PageTypeSchema = object({
	hasShowcaseMainElement: boolean(),
	isFront: boolean(),
	isLiveblog: boolean(),
	isMinuteArticle: boolean(),
	isPaidContent: boolean(),
	isPreview: boolean(),
	isSensitive: boolean(),
});

// Helper schemas for FEElement types

// RoleType schema
const RoleTypeSchema = union([
	literal('immersive'),
	literal('supporting'),
	literal('showcase'),
	literal('inline'),
	literal('thumbnail'),
	literal('halfWidth'),
]);

// ContentType schema
const ContentTypeSchema = union([
	literal('article'),
	literal('network'),
	literal('section'),
	literal('imageContent'),
	literal('interactive'),
	literal('gallery'),
	literal('video'),
	literal('audio'),
	literal('liveBlog'),
	literal('tag'),
	literal('index'),
	literal('crossword'),
	literal('survey'),
	literal('signup'),
	literal('userid'),
]);

// RatingSizeType schema
const RatingSizeTypeSchema = union([literal('large'), literal('small')]);

// Image schema
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

// ImageSource schema
const ImageSourceSchema = object({
	weighting: string(),
	srcSet: array(
		object({
			src: string(),
			width: number(),
		}),
	),
});

// VideoAssets schema
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

// AudioAsset schema
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

// CampaignFieldType schemas
const CampaignFieldTextSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: union([literal('text'), literal('email'), literal('phone')]),
});

const CampaignFieldTextAreaSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: literal('textarea'),
	minlength: optional(number()),
	maxlength: optional(number()),
});

const CampaignFieldFileSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: literal('file'),
});

const CampaignFieldRadioSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: literal('radio'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

const CampaignFieldCheckboxSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: literal('checkbox'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

const CampaignFieldSelectSchema = object({
	id: string(),
	name: string(),
	description: optional(string()),
	required: boolean(),
	textSize: optional(number()),
	hideLabel: optional(boolean()),
	hidden: optional(boolean()),
	label: string(),
	type: literal('select'),
	options: array(
		object({
			label: string(),
			value: string(),
		}),
	),
});

const CampaignFieldTypeSchema = union([
	CampaignFieldTextSchema,
	CampaignFieldTextAreaSchema,
	CampaignFieldFileSchema,
	CampaignFieldRadioSchema,
	CampaignFieldCheckboxSchema,
	CampaignFieldSelectSchema,
]);

// Forward declaration for recursive FEElement
const FEElementBaseSchema = object({
	_type: string(),
	elementId: optional(string()),
});

// Individual FEElement schemas
const AdPlaceholderBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.AdPlaceholderBlockElement'),
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

const AudioBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.AudioBlockElement'),
	id: optional(string()),
	elementId: string(),
	assets: array(AudioAssetSchema),
});

const BlockquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.BlockquoteBlockElement'),
	elementId: string(),
	html: string(),
	quoted: optional(boolean()),
});

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

const CartoonVariantSchema = object({
	viewportSize: union([literal('small'), literal('large')]),
	images: array(ImageSchema),
});

const CartoonBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CartoonBlockElement'),
	elementId: string(),
	role: RoleTypeSchema,
	variants: array(CartoonVariantSchema),
	caption: optional(string()),
	credit: optional(string()),
	displayCredit: optional(boolean()),
	alt: optional(string()),
	position: optional(number()),
});

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

const AnswerTypeSchema = object({
	id: string(),
	text: string(),
	revealText: optional(string()),
	isCorrect: boolean(),
	answerBuckets: array(string()),
});

const QuestionTypeSchema = object({
	id: string(),
	text: string(),
	answers: array(AnswerTypeSchema),
	imageUrl: optional(string()),
	imageAlt: optional(string()),
});

const ResultsBucketTypeSchema = object({
	id: string(),
	title: string(),
	description: string(),
});

const ResultGroupsTypeSchema = object({
	title: string(),
	shareText: string(),
	minScore: number(),
	id: string(),
});

const QuizAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QuizAtomBlockElement'),
	elementId: string(),
	quizType: union([literal('personality'), literal('knowledge')]),
	id: string(),
	questions: array(QuestionTypeSchema),
	resultBuckets: array(ResultsBucketTypeSchema),
	resultGroups: array(ResultGroupsTypeSchema),
});

const CodeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CodeBlockElement'),
	elementId: string(),
	html: string(),
	isMandatory: boolean(),
	language: optional(string()),
});

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

const ContentAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ContentAtomBlockElement'),
	elementId: string(),
	atomId: string(),
});

const DisclaimerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DisclaimerBlockElement'),
	elementId: string(),
	html: string(),
	role: optional(RoleTypeSchema),
});

const DividerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DividerBlockElement'),
	size: optional(union([literal('full'), literal('partial')])),
	spaceAbove: optional(union([literal('tight'), literal('loose')])),
});

const DocumentBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DocumentBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	height: optional(number()),
	width: optional(number()),
	title: optional(string()),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const EmbedBlockElementSchema = object({
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
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const ExplainerAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ExplainerAtomBlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	body: string(),
	role: optional(RoleTypeSchema),
});

const GenericAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GenericAtomBlockElement'),
	url: string(),
	placeholderUrl: optional(string()),
	id: optional(string()),
	html: optional(string()),
	css: optional(string()),
	js: optional(string()),
	elementId: string(),
});

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

const HighlightBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.HighlightBlockElement'),
	elementId: string(),
	html: string(),
});

const ImageBlockElementDetailedSchema = object({
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
	position: optional(number()),
});

const InstagramBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InstagramBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	hasCaption: boolean(),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const InteractiveAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InteractiveAtomBlockElement'),
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

const InteractiveBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InteractiveBlockElement'),
	elementId: string(),
	url: optional(string()),
	isMandatory: optional(boolean()),
	scriptUrl: optional(string()),
	alt: optional(string()),
	role: optional(RoleTypeSchema),
	caption: optional(string()),
});

const ItemLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ItemLinkBlockElement'),
	elementId: string(),
	html: string(),
});

// Forward declare for recursive type
const ListItemSchema = object({
	title: optional(string()),
	elements: array(any()), // Will be FEElementSchema
	bio: optional(string()),
	endNote: optional(string()),
	contributorImageOverrideUrl: optional(string()),
	contributorIds: optional(array(string())),
	byline: optional(string()),
	bylineHtml: optional(string()),
});

const KeyTakeawaySchema = object({
	title: string(),
	body: array(any()), // Will be FEElementSchema
});

const QAndAExplainerSchema = object({
	title: string(),
	body: array(any()), // Will be FEElementSchema
});

const MiniProfileSchema = object({
	title: string(),
	body: array(any()), // Will be FEElementSchema
	bio: optional(string()),
	endNote: optional(string()),
});

const MultiBylineSchema = object({
	title: string(),
	body: array(any()), // Will be FEElementSchema
	bio: optional(string()),
	endNote: optional(string()),
	imageUrl: optional(string()),
	byline: string(),
	bylineHtml: string(),
});

const KeyTakeawaysBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.KeyTakeawaysBlockElement'),
	keyTakeaways: array(KeyTakeawaySchema),
});

const QAndAExplainerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QAndAExplainerBlockElement'),
	qAndAExplainers: array(QAndAExplainerSchema),
});

const MiniProfilesBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MiniProfilesBlockElement'),
	miniProfiles: array(MiniProfileSchema),
});

const MultiBylinesBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiBylinesBlockElement'),
	multiBylines: array(MultiBylineSchema),
});

const LinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.LinkBlockElement'),
	url: string(),
	label: string(),
	linkType: literal('ProductButton'),
});

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

const MapBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MapBlockElement'),
	elementId: string(),
	embedUrl: string(),
	originalUrl: string(),
	title: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

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

const MultiImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiImageBlockElement'),
	elementId: string(),
	images: array(ImageBlockElementDetailedSchema),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
});

const NewsletterSignupBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.NewsletterSignupBlockElement'),
	newsletter: NewsletterSchema,
	elementId: optional(string()),
});

const NumberedTitleBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.NumberedTitleBlockElement'),
	elementId: string(),
	position: number(),
	html: string(),
});

const SubheadingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SubheadingBlockElement'),
	elementId: string(),
	html: string(),
});

const InteractiveContentsBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InteractiveContentsBlockElement'),
	elementId: string(),
	subheadingLinks: array(SubheadingBlockElementSchema),
	endDocumentElementId: optional(string()),
});

const ProfileAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ProfileAtomBlockElement'),
	elementId: string(),
	id: string(),
	label: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role: optional(RoleTypeSchema),
});

const PullquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.PullquoteBlockElement'),
	elementId: string(),
	html: optional(string()),
	role: RoleTypeSchema,
	attribution: optional(string()),
	isThirdPartyTracking: optional(boolean()),
});

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

const RichLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.RichLinkBlockElement'),
	elementId: string(),
	url: string(),
	text: string(),
	prefix: string(),
	role: optional(union([RoleTypeSchema, literal('richLink')])),
});

const SoundcloudBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SoundcloudBlockElement'),
	elementId: string(),
	html: string(),
	id: string(),
	isTrack: boolean(),
	isMandatory: boolean(),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const SpotifyBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SpotifyBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	title: optional(string()),
	height: optional(number()),
	width: optional(number()),
	caption: optional(string()),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const StarRatingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.StarRatingBlockElement'),
	elementId: string(),
	rating: StarRatingSchema,
	size: RatingSizeTypeSchema,
});

const TableBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TableBlockElement'),
	elementId: string(),
	isMandatory: boolean(),
	html: string(),
	role: optional(RoleTypeSchema),
});

const TextBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TextBlockElement'),
	elementId: string(),
	dropCap: optional(union([literal('on'), literal('off')])),
	html: string(),
});

const DCRTimelineEventSchema = object({
	date: string(),
	title: optional(string()),
	label: optional(string()),
	main: optional(any()), // Will be FEElementSchema
	body: array(any()), // Will be FEElementSchema
});

const DCRTimelineSectionSchema = object({
	title: string(),
	events: array(DCRTimelineEventSchema),
});

const DCRTimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DCRTimelineBlockElement'),
	events: array(DCRTimelineEventSchema),
});

const DCRSectionedTimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement'),
	sections: array(DCRTimelineSectionSchema),
});

const FETimelineEventSchema = object({
	title: optional(string()),
	date: optional(string()),
	label: optional(string()),
	main: optional(any()), // Will be FEElementSchema
	body: array(any()), // Will be FEElementSchema
});

const FETimelineSectionSchema = object({
	title: optional(string()),
	events: array(FETimelineEventSchema),
});

const FETimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineBlockElement'),
	elementId: string(),
	sections: array(FETimelineSectionSchema),
});

const TimelineAtomEventSchema = object({
	title: string(),
	date: string(),
	unixDate: number(),
	body: optional(string()),
	toDate: optional(string()),
	toUnixDate: optional(number()),
});

const TimelineAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineAtomBlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	description: optional(string()),
	events: array(TimelineAtomEventSchema),
	role: optional(RoleTypeSchema),
});

const TweetBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TweetBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	id: string(),
	hasMedia: boolean(),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VineBlockElement'),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	originalUrl: string(),
	title: string(),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VideoBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VideoBlockElement'),
	elementId: string(),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VideoFacebookBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VideoFacebookBlockElement'),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	embedUrl: optional(string()),
	role: optional(RoleTypeSchema),
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VideoVimeoBlockElementSchema = object({
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
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const VideoYoutubeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VideoYoutubeBlockElement'),
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
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
});

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

const WitnessTypeDataImageSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataImage'),
	type: literal('image'),
	alt: string(),
	caption: optional(string()),
	mediaId: string(),
	photographer: string(),
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

const WitnessTypeDataVideoSchema = object({
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

const WitnessTypeDataTextSchema = object({
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

const WitnessTypeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessBlockElement'),
	elementId: string(),
	assets: array(WitnessAssetTypeSchema),
	isThirdPartyTracking: boolean(),
	witnessTypeData: union([
		WitnessTypeDataImageSchema,
		WitnessTypeDataVideoSchema,
		WitnessTypeDataTextSchema,
	]),
	source: optional(string()),
	sourceDomain: optional(string()),
});

const CrosswordElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CrosswordElement'),
	crossword: any(), // CrosswordProps['data'] - would need more specific schema
});

// Complete FEElement schema - union of all element types
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
	ImageBlockElementDetailedSchema,
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

// Block schema (simplified)
const BlockSchema = object({
	id: string(),
	elements: array(FEElementSchema),
	attributes: object({
		pinned: boolean(),
		summary: boolean(),
		keyEvent: boolean(),
		membershipPlaceholder: optional(
			object({
				campaignCode: optional(string()),
			}),
		),
	}),
	blockCreatedOn: optional(number()),
	blockCreatedOnDisplay: optional(string()),
	blockLastUpdated: optional(number()),
	blockLastUpdatedDisplay: optional(string()),
	title: optional(string()),
	blockFirstPublished: optional(number()),
	blockFirstPublishedDisplay: optional(string()),
	blockFirstPublishedDisplayNoTimezone: optional(string()),
	primaryDateLine: string(),
	secondaryDateLine: string(),
	createdOn: optional(number()),
	createdOnDisplay: optional(string()),
	lastUpdated: optional(number()),
	lastUpdatedDisplay: optional(string()),
	firstPublished: optional(number()),
	firstPublishedDisplay: optional(string()),
	contributors: optional(
		array(
			object({
				name: string(),
				imageUrl: optional(string()),
				largeImageUrl: optional(string()),
			}),
		),
	),
});

// PaginationType schema
const PaginationTypeSchema = object({
	currentPage: number(),
	totalPages: number(),
	newest: optional(string()),
	newer: optional(string()),
	oldest: optional(string()),
	older: optional(string()),
});

// TagType schema (simplified)
const TagTypeSchema = object({
	properties: object({
		id: string(),
		tagType: string(),
		webTitle: string(),
		bio: optional(string()),
		description: optional(string()),
		bylineImageUrl: optional(string()),
		bylineLargeImageUrl: optional(string()),
		contributorLargeImagePath: optional(string()),
		paidContentType: optional(string()),
		sectionId: optional(string()),
		sectionName: optional(string()),
		twitterHandle: optional(string()),
		url: optional(string()),
		webUrl: optional(string()),
		references: optional(
			array(
				object({
					id: string(),
					type: string(),
				}),
			),
		),
		podcast: optional(
			object({
				subscriptionUrl: optional(string()),
				spotifyUrl: optional(string()),
				image: optional(string()),
			}),
		),
	}),
	pagination: optional(
		object({
			currentPage: number(),
			lastPage: number(),
			totalContent: number(),
		}),
	),
});

// FELinkType schema
const FELinkTypeSchema = object({
	url: string(),
	title: string(),
	longTitle: optional(string()),
	iconName: optional(string()),
	children: optional(array(any())), // recursive, using any() for simplicity
	pillar: optional(LegacyPillarSchema),
	more: optional(boolean()),
	classList: optional(array(string())),
});

// FENavType schema
const FENavTypeSchema = object({
	currentUrl: string(),
	pillars: array(FELinkTypeSchema),
	otherLinks: array(FELinkTypeSchema),
	brandExtensions: array(FELinkTypeSchema),
	currentNavLink: optional(FELinkTypeSchema),
	currentNavLinkTitle: optional(string()),
	currentPillarTitle: optional(string()),
	subNavSections: optional(
		object({
			parent: optional(FELinkTypeSchema),
			links: array(FELinkTypeSchema),
		}),
	),
	readerRevenueLinks: record(string(), string()), // simplified
});

// ConfigType schema (simplified)
const ConfigTypeSchema = object({
	dcrCouldRender: optional(boolean()),
	ajaxUrl: string(),
	sentryPublicApiKey: string(),
	sentryHost: string(),
	dcrSentryDsn: string(),
	switches: record(string(), boolean()),
	abTests: record(string(), any()),
	serverSideABTests: record(string(), string()),
	dfpAccountId: string(),
	commercialBundleUrl: string(),
	revisionNumber: string(),
	shortUrlId: string(),
	isDev: optional(boolean()),
	googletagUrl: string(),
	stage: string(),
	frontendAssetsFullURL: string(),
	adUnit: string(),
	isSensitive: boolean(),
	videoDuration: optional(number()),
	edition: EditionIdSchema,
	section: string(),
	source: optional(string()),
	sharedAdTargeting: record(string(), any()),
	isPaidContent: optional(boolean()),
	keywordIds: string(),
	showRelatedContent: boolean(),
});

// CommercialProperties schema (simplified)
const CommercialPropertiesSchema = record(string(), any());

// FooterType schema (simplified)
const FooterTypeSchema = object({
	footerLinks: array(array(FELinkTypeSchema)),
});

// ImageBlockElement schema (simplified)
const ImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ImageBlockElement'),
	elementId: string(),
	media: object({
		allImages: array(
			object({
				index: number(),
				fields: object({
					height: string(),
					width: string(),
					isMaster: optional(string()),
					source: optional(string()),
					photographer: optional(string()),
					altText: optional(string()),
					mediaId: optional(string()),
					credit: optional(string()),
					caption: optional(string()),
					displayCredit: optional(boolean()),
				}),
				mediaType: string(),
				url: string(),
			}),
		),
	}),
	data: object({
		alt: optional(string()),
		credit: optional(string()),
		caption: optional(string()),
		copyright: optional(string()),
		photographer: optional(string()),
		source: optional(string()),
	}),
	imageSources: array(
		object({
			weighting: string(),
			srcSet: array(
				object({
					src: string(),
					width: number(),
				}),
			),
		}),
	),
	role: optional(string()),
});

// FEArticleBadgeType schema (simplified)
const FEArticleBadgeTypeSchema = object({
	seriesTag: string(),
	imageUrl: optional(string()),
});

// MatchType schema (simplified)
const MatchTypeSchema = union([literal('football'), literal('cricket')]);

// Newsletter schema (simplified)
const NewsletterSchema = object({
	name: string(),
	description: optional(string()),
	frequency: optional(string()),
	listId: optional(number()),
	successDescription: optional(string()),
});

// FEOnwards schema (simplified)
const FEOnwardsSchema = object({
	heading: string(),
	trails: array(any()), // simplified
});

// FEStoryPackage schema
const FEStoryPackageSchema = object({
	heading: string(),
	trails: array(any()), // simplified
});

// CrosswordProps data schema (simplified)
const CrosswordDataSchema = any(); // This would need to be more specific based on CrosswordProps

// Main FEArticle schema
export const FEArticleSchema = object({
	headline: string(),
	standfirst: string(),
	affiliateLinksDisclaimer: optional(string()),
	webTitle: string(),
	mainMediaElements: array(FEElementSchema), // here
	main: string(),
	keyEvents: array(BlockSchema),
	blocks: array(BlockSchema),
	pinnedPost: optional(BlockSchema),
	pagination: optional(PaginationTypeSchema),
	byline: optional(string()),
	/** @deprecated - will be removed in the next model version */
	author: optional(any()),

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

	// AMP specific (for now)
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
	crossword: optional(CrosswordDataSchema),
});

// export type FEArticle = Output<typeof FEArticleSchema>;
