import type { EditionId } from '../lib/edition';
import type { ConfigType, ServerSideTests, Switches } from '../types/config';
import type { GADataType } from './extract-ga';

export interface Guardian {
	polyfilled: boolean;
	/**
	 * The 'config' attribute is derived from CAPIArticle and contains
	 * all the data that, for legacy reasons, for instance compatibility
	 * with the frontend commercial stack, or other scripts, we want to find
	 * at window.guardian.config
	 */
	config: {
		isDotcomRendering: boolean;
		isDev: boolean;
		stage: StageType;
		frontendAssetsFullURL: string;
		page: {
			idApiUrl?: string;
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
			isPaidContent?: boolean;
			isDev?: boolean;
			hasInlineMerchandise?: boolean;
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
	};
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
	GAData?: GADataType;
	adBlockers: unknown;
}

/**
 * This function constructs the `Guardian` data object
 *
 * In `htmlPageTemplate.ts`, it is written to
 * the global `window.guardian` property
 */
export const createGuardian = ({
	stage,
	frontendAssetsFullURL,
	revisionNumber,
	sentryPublicApiKey,
	sentryHost,
	keywordIds,
	dfpAccountId,
	adUnit,
	ajaxUrl,
	shouldHideReaderRevenue,
	isPaidContent,
	googletagUrl,
	switches,
	abTests,
	editionId,
	contentType,
	brazeApiKey,
	GAData,
	hasInlineMerchandise,
	googleRecaptchaSiteKey,
	unknownConfig = {},
}: {
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
	editionId: EditionId;
	shouldHideReaderRevenue?: boolean;
	isPaidContent?: boolean;
	contentType?: string;
	brazeApiKey?: string;
	GAData?: GADataType;
	hasInlineMerchandise?: boolean;
	googleRecaptchaSiteKey?: string;
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
}): Guardian => {
	return {
		config: {
			// This indicates to the client side code that we are running a dotcom-rendering rendered page.
			isDotcomRendering: true,
			isDev: process.env.NODE_ENV !== 'production',
			stage,
			frontendAssetsFullURL,
			page: Object.assign(unknownConfig, {
				dcrCouldRender: true,
				contentType: contentType ?? '',
				edition: editionId,
				revisionNumber,
				dcrSentryDsn:
					'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
				sentryPublicApiKey,
				sentryHost,
				keywordIds,
				dfpAccountId,
				adUnit,
				showRelatedContent: true,
				ajaxUrl,
				shouldHideReaderRevenue: !!shouldHideReaderRevenue,
				isPaidContent: !!isPaidContent,
				brazeApiKey,
				hasInlineMerchandise,
				googleRecaptchaSiteKey,
			}),
			libs: {
				googletag: googletagUrl,
			},
			switches,
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
