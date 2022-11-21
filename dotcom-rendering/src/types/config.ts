import type { EditionId } from '../web/lib/edition';

export interface CommercialConfigType {
	isPaidContent?: boolean;
	pageId: string;
	webPublicationDate?: number;
	headline?: string;
	author?: string;
	keywords?: string;
	section?: string;
	edition?: string;
	series?: string;
	toneIds?: string;
	contentType: string;
	ampIframeUrl: string;
}

/** This type is not support by JSON-schema, it evaluates as `object` */
export type ServerSideTests = {
	[k: string]: 'variant' | 'control';
};

export type ServerSideTestNames = `${string}Control` | `${string}Variant`;

export interface Switches {
	[key: string]: boolean | undefined;
}

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
export interface ConfigType extends CommercialConfigType {
	dcrCouldRender?: boolean;
	ajaxUrl: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	dcrSentryDsn: string;
	switches: Switches;
	abTests: ServerSideTests;
	dfpAccountId: string;
	commercialBundleUrl: string;
	revisionNumber: string;
	shortUrlId: string;
	isDev?: boolean;
	googletagUrl: string;
	stage: StageType;
	frontendAssetsFullURL: string;
	adUnit: string;
	isSensitive: boolean;
	videoDuration?: number;
	edition: EditionId;
	section: string;

	sharedAdTargeting: { [key: string]: any };
	isPaidContent?: boolean;
	keywordIds: string;
	showRelatedContent: boolean;
	shouldHideReaderRevenue?: boolean;
	idApiUrl: string;
	discussionApiUrl: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	isPhotoEssay?: boolean;
	references?: { [key: string]: string }[];
	host?: string;
	idUrl?: string;
	mmaUrl?: string;
	brazeApiKey?: string;
	ipsosTag?: string;
	isLiveBlog?: boolean;
	isLive?: boolean;
	isPreview?: boolean;
}
