// @flow

interface LinkType  {
    title: string,
    longTitle: string,
    url: string,
    children?: Array<LinkType>,
    mobileOnly?: boolean,
    isPillar?: boolean,
}

interface NavType  {
    pillars: Array<LinkType>,
    otherLinks: Array<LinkType>,
    brandExtensions: Array<LinkType>,
    subNavSections?: {
        parent: LinkType,
        links: Array<LinkType>,
    },
}

interface CAPIType  {
    headline: string,
    standfirst: string,
    main: string,
    body: string,
    author: string,
    webPublicationDate: Date,
    sectionName: string,
}
