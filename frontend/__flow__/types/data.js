// @flow

declare type LinkType = {
    title: string,
    longTitle: string,
    url: string,
    children?: Array<LinkType>,
    mobileOnly?: boolean,
    isPillar?: boolean,
};

declare type NavType = {
    pillars: Array<LinkType>,
    otherLinks: Array<LinkType>,
    brandExtensions: Array<LinkType>,
    subNavSections?: {
        parent: LinkType,
        links: Array<LinkType>,
    },
};

declare type CAPIType = {
    headline: string,
    standfirst: string,
    main: string,
    body: string,
};
