type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' ;

type SharePlatform = 'facebook' | 'twitter' | 'email' | 'googlePlus' | 'whatsApp' | 'pinterest' | 'linkedIn' | 'messenger';

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
    author: AuthorType,
    webPublicationDate: Date,
    sectionName: string,
    pageId: string,
    ageWarning?: string,
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    },
    tags: Array<TagType>
}

interface TagPropertiesType {
    id: string,
    url: string,
    tagType: string,
    sectionId: string,
    sectionName: string,
    webTitle: string,
    webUrl: string,
    twitterHandle?: string,
    bio?: string,
    description?: string,
    emailAddress?: string,
    contributorLargeImagePath?: string,
    bylineImageUrl?: string,
    paidContentType?: string
}

interface TagType {
    properties: TagPropertiesType
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
