import type { EditionId } from '../lib/edition';
import type { ServerSideTests, Switches } from './config';
import type { Newsletter, NewsletterDetailData } from './content';
import type { FooterType } from './footer';

// currently same as config for all newsletters page - but might deviate
type FENewsletterDetailConfigType = {
	ajaxUrl: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	dcrSentryDsn: string; // used in dotcom-rendering/src/client/sentryLoader/sentry.ts
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
	// isSensitive: boolean;
	// videoDuration?: number;
	edition: EditionId;
	// section: string;
	// sharedAdTargeting: SharedAdTargeting;
	idApiUrl: string;
	discussionApiUrl: string;
	// discussionD2Uid: string;
	// discussionApiClientHeader: string;
	// isPhotoEssay?: boolean;
	// references?: { [key: string]: string }[];
	host?: string;
	idUrl?: string;
	mmaUrl?: string;
	brazeApiKey?: string;
	ipsosTag?: string; // only relevant for AMP
	// isLiveBlog?: boolean;
	// isLive?: boolean;
	// isPreview?: boolean;
	googleRecaptchaSiteKey?: string;
};
export interface FENewsletterDetailPageType {
	id: string;
	newsletter: NewsletterDetailData;
	backfillRecommendedNewsletters: Newsletter[];
	editionId: EditionId;
	subscribeUrl: string;
	contributionsServiceUrl: string;
	beaconURL: string;
	webTitle: string;
	description: string;
	config: FENewsletterDetailConfigType;
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

export type DCRNewsletterDetailPageType = FENewsletterDetailPageType;
