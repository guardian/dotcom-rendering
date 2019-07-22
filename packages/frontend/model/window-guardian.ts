export interface WindowGuardianConfig {
    page: {
        sentryHost: string;
        sentryPublicApiKey: string;
    };
}

const makeWindowGuardianConfig = (
    dcrDocumentData: DCRDocumentData,
): WindowGuardianConfig => {
    return {
        page: {
            sentryPublicApiKey: dcrDocumentData.config.sentryPublicApiKey,
            sentryHost: dcrDocumentData.config.sentryHost,
        },
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

    // Attributes 'polyfilled' and 'onPolyfilled' are positionned at window.guardian used by the client side's boot process.
    polyfilled: boolean;
    onPolyfilled: () => void;

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
        onPolyfilled: () => null,
        adBlockers: {
            active: undefined,
            onDetect: [],
        },
    };
};
