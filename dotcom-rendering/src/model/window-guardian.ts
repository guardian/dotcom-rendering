import type { ConfigType, ServerSideTests, Switches } from '../types/config';
import type { EditionId } from '../types/edition';

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
		brazeApiKey?: string;
		isPaidContent: boolean;
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

/**
 * This function constructs the data object that gets written to the global
 * window.guardian property
 */
export const makeWindowGuardian = ({
	editionId,
	stage,
	frontendAssetsFullURL,
	revisionNumber,
	sentryPublicApiKey,
	sentryHost,
	keywordIds,
	dfpAccountId,
	adUnit,
	ajaxUrl,
	googletagUrl,
	switches,
	abTests,
	brazeApiKey,
	isPaidContent,
	contentType,
	shouldHideReaderRevenue,
	unknownConfig = {},
	GAData,
}: {
	editionId: EditionId;
	stage: StageType;
	frontendAssetsFullURL: string;
	revisionNumber: string;
	sentryPublicApiKey: string;
	sentryHost: string;
	keywordIds: string;
	dfpAccountId: string;
	adUnit: string;
	ajaxUrl: string;
	googletagUrl: string;
	switches: Switches;
	abTests: ServerSideTests;
	brazeApiKey?: string;
	isPaidContent: boolean;
	contentType?: string;
	shouldHideReaderRevenue?: boolean;
	/**
	 * In the case of articles we don't know the exact values that need to exist
	 * on the window.guardian.config.page property so rather than filter them we
	 * allow the entire object to be passed through here and we then extend it
	 * using Object.assigns
	 *
	 * This is obviously rubbish but has to be weighed against the risk of the
	 * commercial code failing because it depended on a property we removed
	 */
	unknownConfig?: ConfigType | object;
	GAData?: GADataType;
}): {
	/**
	 * The 'config' attribute is derived from the data passed to DCR and contains
	 * all the properties that we (and other code running on the site) want to
	 * find at window.guardian.config
	 */
	config: WindowGuardianConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
	GAData?: GADataType;
} => {
	return {
		config: {
			// This indicates to the client side code that we are running a dotcom-rendering rendered page.
			isDotcomRendering: true,
			isDev: process.env.NODE_ENV !== 'production',
			stage: stage,
			frontendAssetsFullURL: frontendAssetsFullURL,
			page: Object.assign(unknownConfig, {
				dcrCouldRender: true,
				contentType: contentType ?? '',
				edition: editionId,
				revisionNumber: revisionNumber,
				dcrSentryDsn:
					'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
				sentryPublicApiKey: sentryPublicApiKey,
				sentryHost: sentryHost,
				keywordIds: keywordIds,
				dfpAccountId: dfpAccountId,
				adUnit: adUnit,
				showRelatedContent: true,
				ajaxUrl: ajaxUrl,
				shouldHideReaderRevenue: !!shouldHideReaderRevenue,
				brazeApiKey,
				isPaidContent,
			}),
			libs: {
				googletag: googletagUrl,
			},
			switches: switches,
			tests: abTests,
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
		GAData,
	};
};
