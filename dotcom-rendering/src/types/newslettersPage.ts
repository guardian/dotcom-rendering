import type { EditionId } from '../web/lib/edition';
import type { ServerSideTests, Switches } from './config';
import type { Newsletter } from './content';
import type { FooterType } from './footer';
import type { TagType } from './tag';

type FENewslettersConfigType = {
	ajaxUrl: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	dcrSentryDsn: string;
	switches: Switches;
	abTests: ServerSideTests;
	dfpAccountId: string;
	commercialBundleUrl: string;
	revisionNumber: string;
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
};

export interface FENewslettersPageType {
	id: string;
	newsletters: Newsletter[];
	editionId: EditionId;
	subscribeUrl: string;
	contributionsServiceUrl: string;
	beaconURL: string;
	webTitle: string;
	description: string;
	config: FENewslettersConfigType;
	twitterData?: {
		[key: string]: string;
	};
	openGraphData?: {
		[key: string]: string;
	};
	nav: FENavType;
	pageFooter: FooterType;
	canonicalUrl: string;
	isAdFreeUser: boolean;
}

export type DCRNewslettersPageType = FENewslettersPageType & {
	sectionName?: string;
	format?: FEFormat;
	tags?: TagType[];
};
