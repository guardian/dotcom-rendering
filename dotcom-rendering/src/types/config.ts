import {
	array,
	boolean,
	custom,
	type GenericSchema,
	type InferOutput,
	intersect,
	literal,
	number,
	object,
	optional,
	record,
	string,
	undefined,
	union,
} from 'valibot';
import { SharedAdTargetingSchema } from '../lib/ad-targeting';
import { EditionIdSchema } from '../lib/edition';

const StageTypeSchema = union([
	literal('DEV'),
	literal('CODE'),
	literal('PROD'),
]);

export type StageType = InferOutput<typeof StageTypeSchema>;

const CommercialConfigTypeSchema = object({
	isPaidContent: optional(boolean()),
	pageId: string(),
	webPublicationDate: optional(number()),
	headline: optional(string()),
	author: optional(string()),
	keywords: optional(string()),
	section: optional(string()),
	edition: optional(string()),
	series: optional(string()),
	toneIds: optional(string()),
	contentType: string(),
	ampIframeUrl: string(),
	hasLiveBlogTopAd: optional(boolean()),
	hasSurveyAd: optional(boolean()),
});

/**
 * Narrowest representation of the server-side tests
 * object shape, which is [defined in `frontend`](https://github.com/guardian/frontend/blob/23743723030a041e4f4f59fa265ee2be0bb51825/common/app/experiments/ExperimentsDefinition.scala#L24-L26).
 */
export type ServerSideTests = {
	[key: `${string}Variant`]: 'variant';
	[key: `${string}Control`]: 'control';
};

const VariantKeySchema = custom<`${string}Variant`>(
	(input) => typeof input === 'string' && /.*Variant$/.test(input),
);
const VariantTestsSchema = record(VariantKeySchema, literal('variant'));
const ControlKeySchema = custom<`${string}Control`>(
	(input) => typeof input === 'string' && /.*Control$/.test(input),
);
const ControlTestsSchema = record(ControlKeySchema, literal('control'));

const ServerSideTestsSchema = intersect([
	VariantTestsSchema,
	ControlTestsSchema,
]) as GenericSchema<ServerSideTests>;

export type ServerSideTestNames = keyof ServerSideTests;

const SwitchesSchema = record(string(), union([boolean(), undefined()]));

export type Switches = InferOutput<typeof SwitchesSchema>;

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
export const ConfigTypeSchema = object({
	...CommercialConfigTypeSchema.entries,
	dcrCouldRender: optional(boolean()),
	ajaxUrl: string(),
	sentryPublicApiKey: string(),
	sentryHost: string(),
	dcrSentryDsn: string(),
	switches: SwitchesSchema,
	abTests: ServerSideTestsSchema,
	serverSideABTests: record(string(), string()),
	dfpAccountId: string(),
	commercialBundleUrl: string(),
	revisionNumber: string(),
	shortUrlId: string(),
	isDev: optional(boolean()),
	googletagUrl: string(),
	stage: StageTypeSchema,
	frontendAssetsFullURL: string(),
	adUnit: string(),
	isSensitive: boolean(),
	videoDuration: optional(number()),
	edition: EditionIdSchema,
	section: string(),
	source: optional(string()),

	sharedAdTargeting: SharedAdTargetingSchema,
	isPaidContent: optional(boolean()),
	keywordIds: string(),
	showRelatedContent: boolean(),
	shouldHideReaderRevenue: optional(boolean()),
	idApiUrl: string(),
	discussionApiUrl: string(),
	discussionD2Uid: string(),
	discussionApiClientHeader: string(),
	isPhotoEssay: optional(boolean()),
	references: optional(array(record(string(), string()))),
	host: optional(string()),
	idUrl: optional(string()),
	mmaUrl: optional(string()),
	brazeApiKey: optional(string()),
	ipsosTag: optional(string()),
	isLiveBlog: optional(boolean()),
	isLive: optional(boolean()),
	isPreview: optional(boolean()),
	googleRecaptchaSiteKey: optional(string()),
	googleRecaptchaSiteKeyVisible: optional(string()),
});

export type ConfigType = InferOutput<typeof ConfigTypeSchema>;
