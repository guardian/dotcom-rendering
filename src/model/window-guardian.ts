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
        keywordIds: [];
        dfpAccountId: string;
        adUnit: string;
        showRelatedContent: boolean;
        ajaxUrl: string;
        hbImpl: string;
    };
    libs: {
        googletag: string;
    };
    switches: { [key: string]: boolean };
    tests?: { [key: string]: string };
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
            keywordIds: [],
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
    } as WindowGuardianConfig;
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
