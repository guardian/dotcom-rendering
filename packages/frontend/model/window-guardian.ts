// This interface is currently a work in progress.
// Not all attributes will remain and better types will be given as we go along
export interface WindowGuardianConfig {
    googleAnalytics: any;
    images: any;
    libs: any;
    modules: any;
    nav: any;
    ophan: any;
    page: any;
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
    page: null,
    stylesheets: null,
    switches: null,
    tests: null,
};

export interface WindowGuardian {
    app: {
        data: any;
        cssIDs: string[];
    };
    polyfilled: boolean;
    onPolyfilled: () => void;
    config: WindowGuardianConfig;
}

export const makeWindowGuardian = (
    config: WindowGuardianConfig,
    data: any,
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
