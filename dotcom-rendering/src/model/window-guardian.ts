import { extract as extractGA } from '../model/extract-ga';
import type { ConfigType, ServerSideTests, Switches } from '../types/config';
import type { EditionId } from '../types/edition';
import type { DCRFrontType } from '../types/front';
import type { CAPIArticleType } from '../types/frontend';

export interface WindowGuardianConfig {
	isDotcomRendering: boolean;
	isDev: boolean;
	stage: StageType;
	frontendAssetsFullURL: string;
	page: {
		dcrCouldRender: boolean;
		contentType: string;
		edition: EditionId;
		revisionNumber: string;
		dcrSentryDsn: string;
		sentryHost: string;
		sentryPublicApiKey: string;
		keywordIds: string;
		dfpAccountId: string;
		adUnit: string;
		showRelatedContent: boolean;
		ajaxUrl: string;
		shouldHideReaderRevenue: boolean;
		googleRecaptchaSiteKey?: string;
	} & ConfigType;
	libs: {
		googletag: string;
	};
	switches: Switches;
	tests: ServerSideTests;
	ophan: {
		pageViewId: string;
		browserId: string;
	};
}

interface WindowGuardianFrontConfig {
	isDotcomRendering: boolean;
	isDev: boolean;
	stage: StageType;
	frontendAssetsFullURL: string;
	page: {
		dcrCouldRender: boolean;
		contentType: string;
		edition: EditionId;
		revisionNumber: string;
		dcrSentryDsn: string;
		sentryHost: string;
		sentryPublicApiKey: string;
		keywordIds: string;
		dfpAccountId: string;
		adUnit: string;
		showRelatedContent: boolean;
		ajaxUrl: string;
		shouldHideReaderRevenue: boolean;
		googleRecaptchaSiteKey?: string;
	};
	libs: {
		googletag: string;
	};
	switches: Switches;
	tests: ServerSideTests;
	ophan: {
		pageViewId: string;
		browserId: string;
	};
}

export const makeWindowGuardian = (
	CAPIArticle: CAPIArticleType,
): {
	// The 'config' attribute is derived from CAPIArticle and contains
	// all the data that, for legacy reasons, for instance compatibility
	// with the frontend commercial stack, or other scripts, we want to find
	// at window.guardian.config
	config: WindowGuardianConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
	GAData: GADataType;
} => {
	const { config, editionId } = CAPIArticle;
	return {
		config: {
			// This indicates to the client side code that we are running a dotcom-rendering rendered page.
			isDotcomRendering: true,
			isDev: process.env.NODE_ENV !== 'production',
			stage: config.stage,
			frontendAssetsFullURL: config.frontendAssetsFullURL,
			page: Object.assign(config, {
				dcrCouldRender: true,
				contentType: CAPIArticle.contentType,
				edition: editionId,
				revisionNumber: config.revisionNumber,
				dcrSentryDsn:
					'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
				sentryPublicApiKey: config.sentryPublicApiKey,
				sentryHost: config.sentryHost,
				keywordIds: config.keywordIds,
				dfpAccountId: config.dfpAccountId,
				adUnit: config.adUnit,
				showRelatedContent: true,
				ajaxUrl: config.ajaxUrl,
				shouldHideReaderRevenue:
					config.shouldHideReaderRevenue ?? false,
			}),
			libs: {
				googletag: config.googletagUrl,
			},
			switches: config.switches,
			tests: config.abTests,
			ophan: {
				pageViewId: '',
				browserId: '',
			},
		},
		polyfilled: false,
		adBlockers: {
			active: undefined,
			onDetect: [],
		},
		modules: {
			sentry: {
				reportError: () => null,
			},
		},
		GAData: extractGA(CAPIArticle),
	};
};

export const makeFrontWindowGuardian = (
	front: DCRFrontType,
): {
	// The 'config' attribute is derived from CAPIArticle and contains
	// all the data that, for legacy reasons, for instance compatibility
	// with the frontend commercial stack, or other scripts, we want to find
	// at window.guardian.config
	config: WindowGuardianFrontConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
} => {
	const { config, editionId } = front;
	return {
		config: {
			// This indicates to the client side code that we are running a dotcom-rendering rendered page.
			isDotcomRendering: true,
			isDev: process.env.NODE_ENV !== 'production',
			stage: config.stage,
			frontendAssetsFullURL: config.frontendAssetsFullURL,
			page: {
				dcrCouldRender: true,
				contentType: 'TODO: Do we need this?',
				edition: editionId,
				revisionNumber: config.revisionNumber,
				dcrSentryDsn:
					'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
				sentryPublicApiKey: config.sentryPublicApiKey,
				sentryHost: config.sentryHost,
				keywordIds: config.keywordIds,
				dfpAccountId: config.dfpAccountId,
				adUnit: config.adUnit,
				showRelatedContent: true,
				ajaxUrl: config.ajaxUrl,
				shouldHideReaderRevenue: false, // TODO Pass this in
			},
			libs: {
				googletag: config.googletagUrl,
			},
			switches: config.switches,
			tests: config.abTests,
			ophan: {
				pageViewId: '',
				browserId: '',
			},
		},
		polyfilled: false,
		adBlockers: {
			active: undefined,
			onDetect: [],
		},
		modules: {
			sentry: {
				reportError: () => null,
			},
		},
	};
};
