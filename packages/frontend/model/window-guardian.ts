export interface WindowGuardianConfig {
    isDotcomRendering: boolean;
    page: {
        contentType: string;
        edition: Edition;
        revisionNumber: string;
        sentryHost: string;
        sentryPublicApiKey: string;
        keywordIds: [];
        dfpAccountId: string;
        adUnit: string;
    };
    libs: {
        googletag: string;
    };
    switches: { [key: string]: boolean };
    tests?: { [key: string]: string };
    modules: {
        raven?: {
            reportError: (
                err: Error,
                tags: { [key: string]: string },
                shouldThrow: boolean,
            ) => void;
        };
    };
}

const makeWindowGuardianConfig = (
    dcrDocumentData: DCRDocumentData,
): WindowGuardianConfig => {
    return {
        // This indicates to the client side code that we are running a dotcom-rendering rendered page.
        isDotcomRendering: true,
        page: {
            contentType: dcrDocumentData.CAPI.contentType,
            edition: dcrDocumentData.CAPI.editionId,
            revisionNumber: dcrDocumentData.config.revisionNumber,
            sentryPublicApiKey: dcrDocumentData.config.sentryPublicApiKey,
            sentryHost: dcrDocumentData.config.sentryHost,
            keywordIds: [],
            dfpAccountId: dcrDocumentData.config.dfpAccountId,
            // adUnit is currently present for consistency,
            // ... but the value is not used on the master branch.
            // TODO (Pascal): read the value from frontend.
            adUnit: '/59666047/theguardian.com/film/article/ng',
        },
        libs: {
            googletag: dcrDocumentData.config.googletagUrl,
        },
        switches: dcrDocumentData.CAPI.config.switches,
        tests: dcrDocumentData.CAPI.config.abTests || {},
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
    };
};
