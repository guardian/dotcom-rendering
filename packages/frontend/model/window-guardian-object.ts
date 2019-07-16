// This interface is currently a work in progress.
// Not all attributes will remain and better types will be given as we go along
interface WindowGuardianObjectConfig {
    googleAnalytics: any;
    images: any;
    libs: any;
    modules: any;
    nav: any;
    ophan: any;
    page: any;
    stylesheets: any;
    switches: any;
    tests: {
        renderer: string;
    };
}

export interface WindowGuardianObject {
    app: {
        data: {
            page: string;
            site: string;
        };
        cssIDs: string[];
    };
    config: WindowGuardianObjectConfig;
}

const config = {
    googleAnalytics: null,
    images: null,
    libs: null,
    modules: null,
    nav: null,
    ophan: null,
    page: null,
    stylesheets: null,
    switches: null,
    tests: {
        renderer: 'new',
    },
};

export const makeWindowGuardianObject = (
    pageSite: {
        page: string;
        site: string;
    },
    cssIDs: string[],
): WindowGuardianObject => {
    return {
        config,
        app: {
            cssIDs,
            data: pageSite,
        },
    };
};
