type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' ;

type SharePlatform = 'facebook' | 'twitter' | 'email' | 'googlePlus' | 'whatsApp' | 'pinterest' | 'linkedIn' | 'messenger';

// shared type declarations
interface SimpleLinkType {
    url: string;
    title: string;
}

interface LinkType extends SimpleLinkType {
    longTitle: string,
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

interface TagType {
    id: string,
    type: string,
    title: string,
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
    pageId: string,
    ageWarning?: string,
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    },
    pillar: Pillar,
    tags?: TagType[],
    isImmersive: boolean,
    isArticle: boolean,
    sectionLabel?: string,
    sectionUrl?: string,
    sectionName: string,
    subMetaSectionLinks: SimpleLinkType[],
    subMetaKeywordLinks: SimpleLinkType[],
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
