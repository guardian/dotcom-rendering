// @flow

export type LinkType = {
    title: string,
    longTitle: string,
    url: string,
    children?: Array<LinkType>,
    mobileOnly?: boolean,
    isPillar?: boolean,
};

export type NavType = {
    pillars: Array<LinkType>,
    otherLinks: Array<LinkType>,
    brandExtensions: Array<LinkType>,
    subNavSections: {
        parent: LinkType,
        links: Array<LinkType>,
    },
};
