interface ArticleProps {
    CAPI: CAPIType;
    NAV: NavType;
    config: ConfigType;
}

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

interface ReaderRevenueLinks {
    header: {
        subscribe: string;
        support: string;
    },
    footer: {
        subscribe: string;
        contribute: string;
    },
    sideMenu: {
        subscribe: string;
        contribute: string;
    },
}

interface NavType {
    pillars: Array<PillarType>,
    otherLinks: MoreType,
    brandExtensions: Array<LinkType>,
    currentNavLink: string,
    subNavSections?: {
        parent?: LinkType,
        links: Array<LinkType>,
    },
    readerRevenueLinks: ReaderRevenueLinks
}

interface AuthorType {
    byline: string,
    twitterHandle?: string,
    email?: string
}

interface CAPIType {
    headline: string,
    standfirst: string,
    main: string,
    body: string,
    elements: Array<CAPIElement>,
    author: AuthorType,
    webPublicationDate: Date,
    webPublicationDateDisplay: string,
    editionLongForm: string,
    editionId: string,
    pageId: string,
    ageWarning?: string,
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    },
    tags: Array<TagType>,
    pillar: Pillar,
    isImmersive: boolean,
    isArticle: boolean,
    sectionLabel?: string,
    sectionUrl?: string,
    sectionName: string,
    subMetaSectionLinks: SimpleLinkType[],
    subMetaKeywordLinks: SimpleLinkType[],
}
interface TagType {
  id: string,
  type: string,
  title: string,
  twitterHandle?: string
}

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
interface ConfigType {
    ajaxUrl: string;
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
declare module "minify-css-string" {
    const minifyCSSString: any;
    export default minifyCSSString;
}
