import {
	array,
	boolean,
	literal,
	number,
	object,
	optional,
	type output,
	record,
	string,
	union,
	unknown,
} from 'zod';
import { SharedAdTargetingSchema } from '../lib/ad-targeting';
import { EditionIdSchema } from '../lib/edition';
import { EditionBrandingSchema } from '../types/branding';
import {
	ServerSideTestsSchema,
	StageTypeSchema,
	SwitchesSchema,
} from '../types/config';
import {
	BoostLevelSchema,
	ImageSchema,
	StarRatingSchema,
} from '../types/content';
import { FooterTypeSchema } from '../types/footer';
import { FENavTypeSchema } from '../types/frontend';
import { FETagTypeSchema } from '../types/tag';
import { TerritorySchema } from '../types/territory';
import { FETrailTypeSchema } from '../types/trails';
import { FEFormatSchema } from './format';

const FESeoDataSchema = object({
	id: string(),
	navSection: string(),
	webTitle: string(),
	title: optional(string()),
	description: string(),
});

export type FESeoData = output<typeof FESeoDataSchema>;

const FEFrontPropertiesSchema = object({
	isImageDisplayed: boolean(),
	commercial: object({
		editionBrandings: array(EditionBrandingSchema),
		editionAdTargetings: unknown(),
		prebidIndexSites: optional(unknown()),
	}),
	isPaidContent: optional(boolean()),
	onPageDescription: optional(string()),
});

export type FEFrontProperties = output<typeof FEFrontPropertiesSchema>;

/* This list of containers supported in DCR must be kept up to date with frontend **manually**.
 * @see https://github.com/guardian/frontend/blob/167dce23a8453ed13a97fbd23c7fc45ecb06e3fe/facia/app/services/dotcomrendering/FaciaPicker.scala#L21-L45 */
const FEContainerSchema = union([
	literal('dynamic/fast'),
	literal('dynamic/package'),
	literal('dynamic/slow'),
	literal('fixed/large/slow-XIV'),
	literal('fixed/medium/fast-XI'),
	literal('fixed/medium/fast-XII'),
	literal('fixed/medium/slow-VI'),
	literal('fixed/medium/slow-VII'),
	literal('fixed/medium/slow-XII-mpu'),
	literal('fixed/small/fast-VIII'),
	literal('fixed/small/slow-I'),
	literal('fixed/small/slow-III'),
	literal('fixed/small/slow-IV'),
	literal('fixed/small/slow-V-half'),
	literal('fixed/small/slow-V-mpu'),
	literal('fixed/small/slow-V-third'),
	literal('fixed/thrasher'),
	literal('nav/list'),
	literal('nav/media-list'),
	literal('news/most-popular'),
	literal('scrollable/highlights'),
	literal('flexible/special'),
	literal('flexible/general'),
	literal('scrollable/small'),
	literal('scrollable/medium'),
	literal('scrollable/feature'),
	literal('static/feature/2'),
	literal('static/medium/4'),
]);

export type FEContainer = output<typeof FEContainerSchema>;

const FEContainerLevelSchema = union([
	literal('Primary'),
	literal('Secondary'),
]);

export type FEContainerLevel = output<typeof FEContainerLevelSchema>;

const FEContainerMetadataSchema = union([
	literal('EventPalette'),
	literal('SombreAltPalette'),
	literal('EventAltPalette'),
	literal('InvestigationPalette'),
	literal('LongRunningAltPalette'),
	literal('LongRunningPalette'),
	literal('SombrePalette'),
	literal('Canonical'),
	literal('Dynamo'),
	literal('Special'),
	literal('DynamoLike'),
	literal('Breaking'),
	literal('Podcast'),
	literal('Branded'),
	literal('BreakingPalette'),
	literal('SpecialReportAltPalette'),
	literal('Secondary'),
]);

export type FEContainerMetadata = output<typeof FEContainerMetadataSchema>;

const FEFrontCardStyleSchema = union([
	literal('SpecialReport'),
	literal('SpecialReportAlt'),
	literal('LiveBlog'),
	literal('DeadBlog'),
	literal('Feature'),
	literal('Editorial'),
	literal('Comment'),
	literal('Media'),
	literal('Analysis'),
	literal('Review'),
	literal('Letters'),
	literal('ExternalLink'),
	literal('DefaultCardstyle'),
]);

export type FEFrontCardStyle = output<typeof FEFrontCardStyleSchema>;

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L191-L196 */
const FEMediaAssetSchema = object({
	id: string(),
	version: number(),
	platform: string(),
	mimeType: optional(string()),
	assetType: string(),
});

export type FEMediaAsset = output<typeof FEMediaAssetSchema>;

/** @see https://github.com/guardian/frontend/blob/0bf69f55a/common/app/model/content/Atom.scala#L158-L169 */
const FEMediaAtomSchema = object({
	id: string(),
	// defaultHtml: string(), // currently unused
	assets: array(FEMediaAssetSchema),
	title: string(),
	duration: optional(number()),
	source: optional(string()),
	posterImage: optional(object({ allImages: array(ImageSchema) })),
	trailImage: optional(object({ allImages: array(ImageSchema) })),
	expired: optional(boolean()),
	activeVersion: optional(number()),
	// channelId: optional(string()), // currently unused
});

export type FEMediaAtom = output<typeof FEMediaAtomSchema>;

const FESnapSchema = object({
	embedHtml: optional(string()),
	embedCss: optional(string()),
	embedJs: optional(string()),
});

export type FESnap = output<typeof FESnapSchema>;

const FESupportingContentSchema = object({
	properties: object({
		href: optional(string()),
		webUrl: optional(string()),
	}),
	header: object({
		kicker: optional(
			object({
				item: optional(
					object({
						properties: object({
							kickerText: string(),
						}),
					}),
				),
			}),
		),
		headline: string(),
		url: string(),
	}),
	format: optional(FEFormatSchema),
});

export type FESupportingContent = output<typeof FESupportingContentSchema>;

const FEFrontCardSchema = object({
	properties: object({
		isBreaking: boolean(),
		/** Legacy fields retained for backward compatibility:
		 * `showMainVideo` and `imageSlideshowReplace` have been moved into `mediaSelect`,
		 * but must remain at the top level to support unrepressed or older front data.
		 */
		showMainVideo: optional(boolean()),
		imageSlideshowReplace: optional(boolean()),
		mediaSelect: optional(
			object({
				showMainVideo: boolean(),
				imageSlideshowReplace: boolean(),
				videoReplace: boolean(),
			}),
		),
		showKickerTag: boolean(),
		showByline: boolean(),
		maybeContent: optional(
			object({
				trail: object({
					trailPicture: optional(
						object({
							allImages: array(
								object({
									index: number(),
									fields: object({
										displayCredit: optional(string()),
										source: optional(string()),
										photographer: optional(string()),
										isMaster: optional(string()),
										altText: optional(string()),
										height: string(),
										credit: optional(string()),
										mediaId: optional(string()),
										width: string(),
									}),
									mediaType: string(),
									url: string(),
								}),
							),
						}),
					),
					byline: optional(string()),
					thumbnailPath: optional(string()),
					webPublicationDate: number(),
				}),
				metadata: object({
					id: string(),
					webTitle: string(),
					webUrl: string(),
					type: string(),
					sectionId: optional(object({ value: string() })),
					format: FEFormatSchema,
				}),
				fields: object({
					main: string(),
					body: string(),
					standfirst: optional(string()),
				}),
				elements: object({
					mainVideo: optional(unknown()),
					mediaAtoms: array(FEMediaAtomSchema),
					mainMediaAtom: optional(FEMediaAtomSchema),
				}),
				tags: object({ tags: array(FETagTypeSchema) }),
			}),
		),
		maybeContentId: optional(string()),
		isLiveBlog: boolean(),
		isCrossword: boolean(),
		byline: optional(string()),
		image: optional(
			object({
				type: string(),
				item: object({
					imageSrc: optional(string()),
					assets: optional(
						array(
							object({
								imageSrc: string(),
								imageCaption: optional(string()),
							}),
						),
					),
				}),
			}),
		),
		webTitle: string(),
		linkText: optional(string()),
		webUrl: optional(string()),
		editionBrandings: array(EditionBrandingSchema),
		href: optional(string()),
		embedUri: optional(string()),
	}),
	header: object({
		isVideo: boolean(),
		isComment: boolean(),
		isGallery: boolean(),
		isAudio: boolean(),
		kicker: optional(
			object({
				type: string(),
				item: optional(
					object({
						properties: object({
							kickerText: string(),
						}),
					}),
				),
			}),
		),
		seriesOrBlogKicker: optional(
			object({
				properties: object({
					kickerText: string(),
				}),
				name: string(),
				url: string(),
				id: string(),
			}),
		),
		headline: string(),
		url: string(),
		hasMainVideoElement: boolean(),
	}),
	card: object({
		id: string(),
		cardStyle: object({
			type: FEFrontCardStyleSchema,
		}),
		webPublicationDateOption: optional(number()),
		lastModifiedOption: optional(number()),
		trailText: optional(string()),
		starRating: optional(StarRatingSchema),
		shortUrlPath: optional(string()),
		shortUrl: string(),
		group: string(),
		isLive: boolean(),
		galleryCount: optional(number()),
		audioDuration: optional(string()),
	}),
	discussion: object({
		isCommentable: boolean(),
		isClosedForComments: boolean(),
		discussionId: optional(string()),
	}),
	display: object({
		isBoosted: boolean(),
		boostLevel: optional(optional(BoostLevelSchema)),
		isImmersive: optional(boolean()),
		showBoostedHeadline: boolean(),
		showQuotedHeadline: boolean(),
		imageHide: boolean(),
		showLivePlayable: boolean(),
	}),
	format: optional(FEFormatSchema),
	enriched: optional(FESnapSchema),
	mediaAtom: optional(FEMediaAtomSchema),
	supportingContent: optional(array(FESupportingContentSchema)),
	cardStyle: optional(
		object({
			type: FEFrontCardStyleSchema,
		}),
	),
	type: string(),
});

export type FEFrontCard = output<typeof FEFrontCardSchema>;

const FEAspectRatioSchema = union([
	literal('5:3'),
	literal('5:4'),
	literal('4:5'),
	literal('1:1'),
]);
export type FEAspectRatio = output<typeof FEAspectRatioSchema>;

const FECollectionConfigSchema = object({
	displayName: string(),
	metadata: optional(array(object({ type: FEContainerMetadataSchema }))),
	collectionType: FEContainerSchema,
	collectionLevel: optional(FEContainerLevelSchema),
	href: optional(string()),
	groups: optional(array(string())),
	uneditable: boolean(),
	showTags: boolean(),
	showSections: boolean(),
	hideKickers: boolean(),
	showDateHeader: boolean(),
	showLatestUpdate: boolean(),
	excludeFromRss: boolean(),
	showTimestamps: boolean(),
	hideShowMore: boolean(),
	platform: string(),
	aspectRatio: optional(FEAspectRatioSchema),
});

const FECollectionSchema = object({
	id: string(),
	displayName: string(),
	description: optional(string()),
	curated: array(FEFrontCardSchema),
	backfill: array(FEFrontCardSchema),
	treats: array(FEFrontCardSchema),
	lastUpdate: optional(number()),
	href: optional(string()),
	groups: optional(array(string())),
	collectionType: FEContainerSchema,
	uneditable: boolean(),
	showTags: boolean(),
	showSections: boolean(),
	hideKickers: boolean(),
	showDateHeader: boolean(),
	showLatestUpdate: boolean(),
	config: FECollectionConfigSchema,
	hasMore: boolean(),
	targetedTerritory: optional(TerritorySchema),
});

export type FECollection = output<typeof FECollectionSchema>;

const FEPressedPageSchema = object({
	id: string(),
	seoData: FESeoDataSchema,
	frontProperties: FEFrontPropertiesSchema,
	collections: array(FECollectionSchema),
});

const FEFrontConfigSchema = object({
	avatarApiUrl: string(),
	externalEmbedHost: string(),
	ajaxUrl: string(),
	keywords: string(),
	revisionNumber: string(),
	isProd: boolean(),
	switches: SwitchesSchema,
	section: string(),
	keywordIds: string(),
	locationapiurl: string(),
	sharedAdTargeting: SharedAdTargetingSchema,
	buildNumber: string(),
	abTests: ServerSideTestsSchema,
	serverSideABTests: record(string(), string()),
	pbIndexSites: array(record(string(), unknown())), // TODO: Check if this is correct
	ampIframeUrl: string(),
	beaconUrl: string(),
	host: string(),
	brazeApiKey: optional(string()),
	calloutsUrl: string(),
	requiresMembershipAccess: boolean(),
	onwardWebSocket: string(),
	a9PublisherId: string(),
	contentType: string(),
	facebookIaAdUnitRoot: string(),
	ophanEmbedJsUrl: string(),
	idUrl: string(),
	dcrSentryDsn: string(),
	isFront: literal(true),
	idWebAppUrl: string(),
	discussionApiUrl: string(),
	sentryPublicApiKey: string(),
	omnitureAccount: string(),
	dfpAccountId: string(),
	pageId: string(),
	forecastsapiurl: string(),
	assetsPath: string(),
	pillar: string(),
	commercialBundleUrl: string(),
	discussionApiClientHeader: string(),
	membershipUrl: string(),
	dfpHost: string(),
	cardStyle: string(),
	googletagUrl: string(),
	sentryHost: string(),
	shouldHideAdverts: boolean(),
	mmaUrl: string(),
	membershipAccess: string(),
	isPreview: boolean(),
	googletagJsUrl: string(),
	supportUrl: string(),
	edition: string(),
	ipsosTag: string(),
	ophanJsUrl: string(),
	isPaidContent: optional(boolean()),
	mobileAppsAdUnitRoot: string(),
	plistaPublicApiKey: string(),
	frontendAssetsFullURL: string(),
	googleSearchId: string(),
	allowUserGeneratedContent: boolean(),
	dfpAdUnitRoot: string(),
	idApiUrl: string(),
	omnitureAmpAccount: string(),
	adUnit: string(),
	hasPageSkin: boolean(),
	webTitle: string(),
	stripePublicToken: string(),
	googleRecaptchaSiteKey: string(),
	discussionD2Uid: string(),
	googleSearchUrl: string(),
	optimizeEpicUrl: string(),
	stage: StageTypeSchema,
	idOAuthUrl: string(),
	isSensitive: boolean(),
	isDev: boolean(),
	thirdPartyAppsAccount: optional(string()),

	avatarImagesUrl: string(),
	fbAppId: string(),
});

export type FEFrontConfig = output<typeof FEFrontConfigSchema>;

export const FEFrontSchema = object({
	pressedPage: FEPressedPageSchema,
	nav: FENavTypeSchema,
	editionId: EditionIdSchema,
	editionLongForm: string(),
	guardianBaseURL: string(),
	pageId: string(),
	webTitle: string(),
	webURL: string(),
	config: FEFrontConfigSchema,
	commercialProperties: record(string(), unknown()),
	pageFooter: FooterTypeSchema,
	isAdFreeUser: boolean(),
	isNetworkFront: boolean(),
	mostViewed: array(FETrailTypeSchema),
	deeplyRead: optional(array(FETrailTypeSchema)),
	contributionsServiceUrl: string(),
	canonicalUrl: optional(string()),
});

export type FEFront = output<typeof FEFrontSchema>;
