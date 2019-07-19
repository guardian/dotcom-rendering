// This interface is currently a work in progress.
// Not all attributes will remain and better types will be given as we go along
export interface WindowGuardianConfig {
    googleAnalytics: any;
    images: any;
    libs: any;
    modules: any;
    nav: any;
    ophan: any;
    page: {
        sentryHost: string;
        sentryPublicApiKey: string;
    };
    stylesheets: any;
    switches: any;
    tests: any;
}

// Temporary
// Currently exported, but will be replaced by a function call.
export const windowGuardianConfig = {
    googleAnalytics: null,
    images: null,
    libs: null,
    modules: null,
    nav: null,
    ophan: null,
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
    },
    stylesheets: null,
    switches: null,
    tests: null,
} as WindowGuardianConfig;

export interface WindowGuardian {
    app: {
        // The 'app' attribute of WindowGuardian doesn't exists in the regular frontend
        // I don't know why it was introduced in dotcom-rendering
        // I would recommend not to invest in it and to use the config attribute instead
        // Therefore I will be phasing it out.
        // -- Pascal
        data: DCRDocumentData;
        cssIDs: string[];
    };
    config: WindowGuardianConfig;
    polyfilled: boolean;
    onPolyfilled: () => void;
}

export const makeWindowGuardian = (
    config: WindowGuardianConfig,
    data: DCRDocumentData,
    cssIDs: string[],
): WindowGuardian => {
    return {
        config,
        app: {
            data,
            cssIDs,
        },
        polyfilled: false,
        onPolyfilled: () => null,
    };
};
