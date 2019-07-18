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

const makeWindowGuardianConfig = (): WindowGuardianConfig => {
    return {
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
    data: any,
    cssIDs: string[],
): WindowGuardian => {
    const config = makeWindowGuardianConfig();
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
