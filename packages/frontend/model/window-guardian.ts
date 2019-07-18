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

const makeWindowGuardianConfig = (data: CAPIType): WindowGuardianConfig => {
    return {
        googleAnalytics: null,
        images: null,
        libs: null,
        modules: null,
        nav: null,
        ophan: null,
        page: {
            sentryHost: 'app.getsentry.com/35463',
            sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        },
        stylesheets: null,
        switches: null,
        tests: null,
    } as WindowGuardianConfig;
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
    data: CAPIType,
    cssIDs: string[],
): WindowGuardian => {
    const config = makeWindowGuardianConfig(data);
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
