type stage = 'DEV' | 'CODE' | 'PROD';

export interface WindowGuardianConfig {
    isDotcomRendering: boolean;
    stage: stage;
    frontendAssetsFullURL: string;
    page: {
        dcrCouldRender: boolean;
        contentType: string;
        edition: Edition;
        revisionNumber: string;
        dcrSentryDsn: string;
        sentryHost: string;
        sentryPublicApiKey: string;
        keywordIds: string;
        dfpAccountId: string;
        adUnit: string;
        showRelatedContent: boolean;
        ajaxUrl: string;
        hbImpl: object | string;
        shouldHideReaderRevenue: boolean;
    };
    libs: {
        googletag: string;
    };
    switches: { [key: string]: boolean };
    tests?: { [key: string]: string };
    ophan: {
        pageViewId: string;
    };
}

const makeWindowGuardianConfig = (
    dcrDocumentData: DCRDocumentData,
): WindowGuardianConfig => {
    const { config } = dcrDocumentData.CAPI;
    return {
        // This indicates to the client side code that we are running a dotcom-rendering rendered page.
        isDotcomRendering: true,
        stage: config.stage,
        frontendAssetsFullURL: config.frontendAssetsFullURL,
        page: Object.assign(config, {
            dcrCouldRender: true,
            contentType: dcrDocumentData.CAPI.contentType,
            edition: dcrDocumentData.CAPI.editionId,
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
            hbImpl: config.hbImpl,
        }),
        libs: {
            googletag: config.googletagUrl,
        },
        switches: config.switches,
        tests: config.abTests || {},
        ophan: {
            pageViewId: '',
        },
    } as WindowGuardianConfig;
};

const makeDcrConfig = (dcrDocumentData: DCRDocumentData): dcrConfig => {
    return {
        isDev: process.env.NODE_ENV !== 'production',
        GA: dcrDocumentData.GA,
        ajaxUrl: dcrDocumentData.CAPI.config.ajaxUrl,
        shortUrlId: dcrDocumentData.CAPI.config.shortUrlId,
        pageId: dcrDocumentData.CAPI.config.pageId,
        isPaidContent: !!dcrDocumentData.CAPI.config.isPaidContent,
        showRelatedContent: dcrDocumentData.CAPI.config.showRelatedContent,
        keywordIds: dcrDocumentData.CAPI.config.keywordIds,
        ampIframeUrl: dcrDocumentData.CAPI.config.ampIframeUrl,
        // commercialBundleUrl is only used in SSR
        // commercialBundleUrl: dcrDocumentData.CAPI.config.commercialBundleUrl,

        // switches
        cmpUi: dcrDocumentData.CAPI.config.switches.cmpUi,
        slotBodyEnd: dcrDocumentData.CAPI.config.switches.slotBodyEnd,
        ampPrebid: dcrDocumentData.CAPI.config.switches.ampPrebid,
        permutive: dcrDocumentData.CAPI.config.switches.permutive,

        // used by lib/ad-targeting.ts
        isSensitive: dcrDocumentData.CAPI.config.isSensitive,
        videoDuration: dcrDocumentData.CAPI.config.videoDuration,
        edition: dcrDocumentData.CAPI.config.edition,
        section: dcrDocumentData.CAPI.config.section,
        sharedAdTargeting: dcrDocumentData.CAPI.config.sharedAdTargeting, // currently doesn't have definition
        adUnit: dcrDocumentData.CAPI.config.adUnit,
    };
};
export interface WindowGuardian {
    // At least until October 2019, do not modify this interface without checking with Pascal first.

    // The 'app' attribute contains all the data that we decided to pass
    // from frontend and the dotcom-rendering server side model
    // to the client side.
    app: {
        data: DCRDocumentData;
        cssIDs: string[];
    };

    dcr: dcrType;

    // The 'config' attribute is derived from DCRDocumentData and contains
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
}

export const makeWindowGuardian = (
    dcrDocumentData: DCRDocumentData,
    cssIDs: string[],
): WindowGuardian => {
    return {
        app: {
            cssIDs,
            data: dcrDocumentData,
        },
        dcr: {
            config: makeDcrConfig(dcrDocumentData),
        },
        config: makeWindowGuardianConfig(dcrDocumentData),
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
