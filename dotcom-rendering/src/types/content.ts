import { type CrosswordProps } from '@guardian/react-crossword';
import {
	array,
	boolean,
	literal,
	number,
	object,
	optional,
	type Output,
	string,
	union,
} from 'valibot';
import type { ArticleFormat } from '../lib/articleFormat';

export type StarRating = 0 | 1 | 2 | 3 | 4 | 5;

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

// -------------------------------------
// Elements

// -------------------------------------
const ThirdPartyEmbeddedContentSchema = object({
	isThirdPartyTracking: boolean(),
	source: optional(string()),
	sourceDomain: optional(string()),
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

export type RoleType = Output<
	typeof RoleTypeSchema
>;

const AudioAssetSchema = object({
	url: string(),
	mimeType: optional(string()),
	fields: optional(object({
		durationMinutes: optional(string()),
		durationSeconds: optional(string()),
		explicit: optional(string()),
		source: optional(string()),
	})),
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
	options: array(object({
		label: string(),
		value: string(),
	})),
});

export type CampaignFieldRadio = Output<typeof CampaignFieldRadioSchema>;

const CampaignFieldCheckboxSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('checkbox'),
	options: array(object({
		label: string(),
		value: string(),
	})),
});

const CampaignFieldSelectSchema = object({
	...CampaignFieldSchema.entries,
	type: literal('select'),
	options: array(object({
		label: string(),
		value: string(),
	})),
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

const ResultGroupsTypeSchema = object({
	title: string(),
	shareText: string(),
	minScore: number(),
	id: string(),
});

const ResultsBucketTypeSchema = object({
	id: string(),
	title: string(),
	description: string(),
});

const KnowledgeQuizAtomTypeSchema = object({
	id: string(),
	questions: array(QuestionTypeSchema),
	resultGroups: array(ResultGroupsTypeSchema),
	pageId: string(),
	webTitle: string(),
	format: ArticleFormat, // TODO
});

const PersonalityQuizAtomTypeSchema = object({
	id: string(),
	questions: array(QuestionTypeSchema),
	resultBuckets: array(ResultsBucketTypeSchema),
	pageId: string(),
	webTitle: string(),
	format: ArticleFormat, // TODO
});

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
	role: optional(RoleTypeSchema)
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

export type BlockquoteBlockElement = Output<typeof BlockquoteBlockElementSchema>;

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

const QuizAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QuizAtomBlockElement'),
	elementId: string(),
	quizType: union([literal('knowledge'), literal('personality')]),
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

// TODO: Ravi we've done it up to here :)

const DocumentBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.DocumentBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	height: optional(number()),
	width: optional(number()),
	title: optional(string()),
	role?: RoleType;
}

const EmbedBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.EmbedBlockElement'),
	elementId: string(),
	safe: optional(boolean()),
	role?: RoleType;
	alt: optional(string()),
	height: optional(number()),
	width: optional(number()),
	html: string(),
	isMandatory: boolean(),
	caption: optional(string()),
}

const ExplainerAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ExplainerAtomBlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	body: string(),
	role?: RoleType;
}

const GenericAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GenericAtomBlockElement'),
	url: string(),
	placeholderUrl: optional(string()),
	id: optional(string()),
	html: optional(string()),
	css: optional(string()),
	js: optional(string()),
	elementId: string(),
}

const GuideAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GuideAtomBlockElement'),
	elementId: string(),
	id: string(),
	label: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role?: RoleType;
}

const GuVideoBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.GuVideoBlockElement'),
	elementId: string(),
	assets: VideoAssets[];
	caption: string(),
	html: string(),
	source: string(),
	role?: RoleType;
	imageMedia?: { allImages: Image[] };
	originalUrl: optional(string()),
	url: optional(string()),
}

const HighlightBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.HighlightBlockElement'),
	elementId: string(),
	html: string(),
}

const ImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ImageBlockElement'),
	elementId: string(),
	media: { allImages: Image[] };
	data: {
		alt: optional(string()),
		credit: optional(string()),
		caption: optional(string()),
		copyright: optional(string()),
	};
	imageSources: ImageSource[];
	displayCredit: optional(boolean()),
	role: RoleType;
	title: optional(string()),
	starRating?: StarRating;
	isAvatar: optional(boolean()),
	/**
	 * position is an index starting at 1 for all the images
	 * that are “lightboxable”, including main media.
	 *
	 * It is generated by `addImagePositions`
	 */
	position: optional(number()),
}

const InstagramBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InstagramBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	hasCaption: boolean(),
	role?: RoleType;
}

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
	role?: RoleType;
}

// Can't guarantee anything in interactiveBlockElement :shrug:
const InteractiveBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.InteractiveBlockElement'),
	elementId: string(),
	url: optional(string()),
	isMandatory: optional(boolean()),
	scriptUrl: optional(string()),
	alt: optional(string()),
	role?: RoleType;
	caption: optional(string()),
}

const ItemLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ItemLinkBlockElement'),
	elementId: string(),
	html: string(),
}

const KeyTakeawaySchema = object({
	title: string(),
	body: FEElement[];
}

const QAndAExplainerSchema = object({
	title: string(),
	body: FEElement[];
}

const MiniProfileSchema = object({
	title: string(),
	body: FEElement[];
	bio: optional(string()),
	endNote: optional(string()),
}

const MultiBylineSchema = object({
	title: string(),
	body: FEElement[];
	bio: optional(string()),
	endNote: optional(string()),
	imageUrl: optional(string()),
	byline: string(),
	bylineHtml: string(),
}

const KeyTakeawaysBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.KeyTakeawaysBlockElement'),
	keyTakeaways: KeyTakeaway[];
}

const QAndAExplainerBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QAndAExplainerBlockElement'),
	qAndAExplainers: QAndAExplainer[];
}

const MiniProfilesBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MiniProfilesBlockElement'),
	miniProfiles: MiniProfile[];
}

const MultiBylinesBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiBylinesBlockElement'),
	multiBylines: MultiByline[];
}

const ListItemSchema = object({
	title: optional(string()),
	elements: FEElement[];
	bio: optional(string()),
	endNote: optional(string()),
	contributorImageOverrideUrl: optional(string()),
	contributorIds?: string[];
	byline: optional(string()),
	bylineHtml: optional(string()),
}

const LinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.LinkBlockElement'),
	url: string(),
	label: string(),
	linkType: 'ProductButton';
}

const ListBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.ListBlockElement'),
	listElementType:
		| 'KeyTakeaways'
		| 'QAndAExplainer'
		| 'MiniProfiles'
		| 'MultiByline';
	items: ListItem[];
	elementId: string(),
}

const MapBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MapBlockElement'),
	elementId: string(),
	embedUrl: string(),
	originalUrl: string(),
	title: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	role?: RoleType;
}

const MediaAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MediaAtomBlockElement'),
	elementId: string(),
	id: string(),
	assets: VideoAssets[];
	posterImage?: {
		url: string(),
		width: number(),
	}[];
	title: optional(string()),
	duration: optional(number()),
}

const MultiImageBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.MultiImageBlockElement'),
	elementId: string(),
	images: ImageBlockElement[];
	caption: optional(string()),
	role?: RoleType;
}

const NewsletterSignupBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.NewsletterSignupBlockElement'),
	newsletter: Newsletter;
	elementId: optional(string()),
}

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
	_type: literal('model.dotcomrendering.pageElements.ProfileAtomBlockElement'),
	elementId: string(),
	id: string(),
	label: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role?: RoleType;
}

const PullquoteBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.PullquoteBlockElement'),
	elementId: string(),
	html: optional(string()),
	role: RoleType;
	attribution: optional(string()),
	isThirdPartyTracking: optional(boolean()),
}

const QABlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.QABlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	img: optional(string()),
	html: string(),
	credit: string(),
	role?: RoleType;
}

const RichLinkBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.RichLinkBlockElement'),
	elementId: string(),
	url: string(),
	text: string(),
	prefix: string(),
	role?: RoleType | 'richLink';
}

const SoundcloudBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SoundcloudBlockElement'),
	elementId: string(),
	html: string(),
	id: string(),
	isTrack: boolean(),
	isMandatory: boolean(),
	role?: RoleType;
}

const SpotifyBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.SpotifyBlockElement'),
	elementId: string(),
	embedUrl: optional(string()),
	title: optional(string()),
	height: optional(number()),
	width: optional(number()),
	caption: optional(string()),
	role?: RoleType;
}

const StarRatingBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.StarRatingBlockElement'),
	elementId: string(),
	rating: StarRating;
	size: RatingSizeType;
}

const TableBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TableBlockElement'),
	elementId: string(),
	isMandatory: boolean(),
	html: string(),
	role?: RoleType;
}

const TextBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TextBlockElement'),
	elementId: string(),
	dropCap?: 'on' | 'off';
	html: string(),
}

export type DCRTimelineEvent = {
	date: string(),
	title: optional(string()),
	label: optional(string()),
	main?: FEElement;
	body: FEElement[];
};

export type DCRTimelineSection = {
	title: string(),
	events: DCRTimelineEvent[];
};

export type DCRTimelineBlockElement = {
	_type: literal('model.dotcomrendering.pageElements.DCRTimelineBlockElement'),
	events: DCRTimelineEvent[];
};

export type DCRSectionedTimelineBlockElement = {
	_type: literal('model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement'),
	sections: DCRTimelineSection[];
};

export type FETimelineEvent = {
	title: optional(string()),
	date: optional(string()),
	label: optional(string()),
	main?: FEElement;
	body: FEElement[];
};

export type FETimelineSection = {
	title: optional(string()),
	events: FETimelineEvent[];
};

const FETimelineBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineBlockElement'),
	elementId: string(),
	sections: FETimelineSection[];
}

const TimelineAtomBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TimelineAtomBlockElement'),
	elementId: string(),
	id: string(),
	title: string(),
	description: optional(string()),
	events: TimelineAtomEvent[];
	role?: RoleType;
}

const TweetBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.TweetBlockElement'),
	elementId: string(),
	html: string(),
	url: string(),
	id: string(),
	hasMedia: boolean(),
	role?: RoleType;
}

const VineBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VineBlockElement'),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	originalUrl: string(),
	title: string(),
}

const VideoBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VideoBlockElement'),
	elementId: string(),
	role?: RoleType;
}

const VideoFacebookBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.VideoFacebookBlockElement'),
	elementId: string(),
	url: string(),
	height: number(),
	width: number(),
	caption: optional(string()),
	embedUrl: optional(string()),
	role?: RoleType;
}

const VideoVimeoBlockElement extends ThirdPartyEmbeddedContentSchema = object({
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
	role?: RoleType;
}

const VideoYoutubeBlockElement extends ThirdPartyEmbeddedContentSchema = object({
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
	role?: RoleType;
}

const YoutubeBlockElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.YoutubeBlockElement'),
	assetId: string(),
	mediaTitle: string(),
	id: string(),
	elementId: string(),
	channelId: optional(string()),
	duration: optional(number()),
	posterImage?: {
		url: string(),
		width: number(),
	}[];
	expired: boolean(),
	overrideImage: optional(string()),
	altText: optional(string()),
	role?: RoleType;
}

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
}

const WitnessTypeDataImage extends WitnessTypeDataBaseSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataImage'),
	type: 'image';
	alt: string(),
	caption: optional(string()),
	mediaId: string(),
	photographer: string(),
}

const WitnessTypeDataVideo extends WitnessTypeDataBaseSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataVideo'),
	type: 'video';
	description: string(),
	youtubeHtml: string(),
	youtubeDescription: string(),
	youtubeUrl: string(),
	width: number(),
	youtubeSource: string(),
	youtubeAuthorName: string(),
	height: number(),
	youtubeTitle: string(),
}

const WitnessTypeDataText extends WitnessTypeDataBaseSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessTypeDataText'),
	type: 'text';
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
}

const WitnessAssetTypeSchema = object({
	type: 'Image';
	mimeType: optional(string()),
	file: optional(string()),
	typeData?: {
		name: optional(string()),
	};
}
const WitnessTypeBlockElement extends ThirdPartyEmbeddedContentSchema = object({
	_type: literal('model.dotcomrendering.pageElements.WitnessBlockElement'),
	elementId: string(),
	assets: WitnessAssetType[];
	isThirdPartyTracking: boolean(),
	witnessTypeData:
		| WitnessTypeDataImage
		| WitnessTypeDataVideo
		| WitnessTypeDataText;
}

const CrosswordElementSchema = object({
	_type: literal('model.dotcomrendering.pageElements.CrosswordElement'),
	crossword: CrosswordProps['data'];
}

export type FEElement =
	| AdPlaceholderBlockElement
	| AudioAtomBlockElement
	| AudioBlockElement
	| BlockquoteBlockElement
	| CaptionBlockElement
	| CalloutBlockElement
	| CalloutBlockElementV2
	| CartoonBlockElement
	| ChartAtomBlockElement
	| CodeBlockElement
	| CommentBlockElement
	| ContentAtomBlockElement
	| DisclaimerBlockElement
	| DividerBlockElement
	| DocumentBlockElement
	| EmbedBlockElement
	| ExplainerAtomBlockElement
	| GenericAtomBlockElement
	| GuideAtomBlockElement
	| GuVideoBlockElement
	| HighlightBlockElement
	| ImageBlockElement
	| InstagramBlockElement
	| InteractiveAtomBlockElement
	| InteractiveContentsBlockElement
	| InteractiveBlockElement
	| ItemLinkBlockElement
	| KeyTakeawaysBlockElement
	| LinkBlockElement
	| ListBlockElement
	| MapBlockElement
	| MediaAtomBlockElement
	| MiniProfilesBlockElement
	| MultiBylinesBlockElement
	| MultiImageBlockElement
	| NumberedTitleBlockElement
	| NewsletterSignupBlockElement
	| ProfileAtomBlockElement
	| PullquoteBlockElement
	| QAndAExplainerBlockElement
	| QABlockElement
	| QuizAtomBlockElement
	| RichLinkBlockElement
	| SoundcloudBlockElement
	| SpotifyBlockElement
	| StarRatingBlockElement
	| SubheadingBlockElement
	| TableBlockElement
	| TextBlockElement
	| TimelineAtomBlockElement
	| FETimelineBlockElement
	| DCRTimelineBlockElement
	| DCRSectionedTimelineBlockElement
	| TweetBlockElement
	| VideoBlockElement
	| VideoFacebookBlockElement
	| VideoVimeoBlockElement
	| VideoYoutubeBlockElement
	| VineBlockElement
	| YoutubeBlockElement
	| WitnessTypeBlockElement
	| CrosswordElement;

// -------------------------------------
// Misc
// -------------------------------------

/**
 * This duplicate type is unfortunate, but the image sources come lowercase
 * Note, 'richLink' is used internally but does not exist upstream.
 */
type Weighting = Exclude<RoleType, 'halfWidth' | 'richLink'> | 'halfwidth';

const ImageSourceSchema = object({
	weighting: Weighting;
	srcSet: SrcSetItem[];
}

const SrcSetItemSchema = object({
	src: string(),
	width: number(),
}

const VideoAssetsSchema = object({
	url: string(),
	mimeType: optional(string()),
	fields?: {
		source: optional(string()),
		embeddable: optional(string()),
		height: optional(string()),
		width: optional(string()),
		caption: optional(string()),
	};
}

const TimelineAtomEventSchema = object({
	title: string(),
	date: string(),
	unixDate: number(),
	body: optional(string()),
	toDate: optional(string()),
	toUnixDate: optional(number()),
}

export type TimelineAtomType = {
	id: string(),
	events?: TimelineAtomEvent[];
	title: string(),
	description: optional(string()),
	expandForStorybook: optional(boolean()),
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export type RatingSizeType = 'large' | 'small';

export type ImageForLightbox = {
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
};



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
		url: string(),
		userMessage: string(),
	};
};

// -------------------------------------
// Newsletter
// -------------------------------------

export type Newsletter = {
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
};

export type NewsletterLayout = {
	groups: {
		title: string(),
		subtitle: optional(string()),
		newsletters: string[];
	}[];
};
