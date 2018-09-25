type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' ;


// shared type declarations
interface LinkType {
    title: string,
    longTitle: string,
    url: string,
    children?: Array<LinkType>,
    mobileOnly?: boolean,
    pillar?: Pillar,
    more?:boolean,
}

interface PillarType extends LinkType {
    pillar: Pillar,
    more: false
}

interface MoreType extends LinkType {
    more: true
}

interface NavType {
    pillars: Array<PillarType>,
    otherLinks: MoreType,
    brandExtensions: Array<LinkType>,
    subNavSections?: {
        parent?: LinkType,
        links: Array<LinkType>,
    },
}
interface CAPIType {
    headline: string,
    standfirst: string,
    main: string,
    body: string,
    author: string,
    webPublicationDate: Date,
    sectionName: string,
    pageId: string,
    ageWarning?: string 
}

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering 
 * this data could eventually be defined in dotcom-rendering
 */
interface ConfigType {
    ajaxUrl: string
}

// 3rd party type declarations
declare module "emotion-server" {
    export const extractCritical: any;
}
declare module "dompurify" {
    const createDOMPurify: any;
    export default createDOMPurify;
}
declare module "compose-function" {
    const compose: any;
    export default compose;
}
