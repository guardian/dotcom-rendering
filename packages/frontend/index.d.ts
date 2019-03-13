interface ArticleProps {
    CAPI: CAPIType;
    NAV: NavType;
    config: ConfigType;
}

type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';

type Edition = 'UK' | 'US' | 'INT' | 'AU';

type SharePlatform =
    | 'facebook'
    | 'twitter'
    | 'email'
    | 'whatsApp'
    | 'pinterest'
    | 'linkedIn'
    | 'messenger';

// shared type declarations
interface SimpleLinkType {
    url: string;
    title: string;
}


interface AdTargetParam {
    name: string;
    value: string | string[];
}

interface EditionCommercialProperties {
    adTargeting: AdTargetParam[];
    branding?: Branding;
}

type CommercialProperties = {
    [E in Edition]: EditionCommercialProperties
}

interface Branding {
    type: 'paid-content';
    sponsorName: string;
    logo: {
        src: string;
        width: number;
        height: number;
        link: string;
    };
    aboutThisLink: string;
}

interface LinkType extends SimpleLinkType {
    longTitle: string;
    children?: LinkType[];
    mobileOnly?: boolean;
    pillar?: Pillar;
    more?: boolean;
}

interface PillarType extends LinkType {
    pillar: Pillar;
    more: false;
}

interface MoreType extends LinkType {
    more: true;
}

interface ReaderRevenueCategories {
    contribute: string;
    subscribe: string;
    support: string;
}

type ReaderRevenueCategory = 'contribute' | 'subscribe' | 'support';
interface ReaderRevenuePositions {
    header: ReaderRevenueCategories;
    footer: ReaderRevenueCategories;
    sideMenu: ReaderRevenueCategories;
    ampHeader: ReaderRevenueCategories;
    ampFooter: ReaderRevenueCategories;
}

type ReaderRevenuePosition =
    | 'header'
    | 'footer'
    | 'sideMenu'
    | 'ampHeader'
    | 'ampFooter';

interface NavType {
    pillars: PillarType[];
    otherLinks: MoreType;
    brandExtensions: LinkType[];
    currentNavLink: string;
    subNavSections?: {
        parent?: LinkType;
        links: LinkType[];
    };
    readerRevenueLinks: ReaderRevenuePositions;
}

interface AuthorType {
    byline: string;
    twitterHandle?: string;
    email?: string;
}

interface CAPIType {
    headline: string;
    standfirst: string;
    mainMediaElements: CAPIElement[];
    main: string;
    body: string;
    elements: CAPIElement[];
    author: AuthorType;
    webPublicationDate: Date;
    webPublicationDateDisplay: string;
    editionLongForm: string;
    editionId: Edition;
    pageId: string;
    ageWarning?: string;
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    };
    tags: TagType[];
    pillar: Pillar;
    isImmersive: boolean;
    sectionLabel: string;
    sectionUrl: string;
    sectionName: string;
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
    shouldHideAds: boolean;
    webURL: string;

    // AMP specific (for now)
    guardianBaseURL: string;
    contentType: string;
    hasRelated: boolean;
    hasStoryPackage: boolean;
    beaconURL: string;
    isCommentable: boolean;
    commercialProperties: CommercialProperties;
    starRating?: number;
    trailText: string;
}

interface TagType {
    id: string;
    type: string;
    title: string;
    twitterHandle?: string;
    paidContentType?: string;
}

/**
 * the config model will contain useful app/site
 * level data. Although currently derived from the config model
 * constructed in frontend and passed to dotcom-rendering
 * this data could eventually be defined in dotcom-rendering
 */
interface ConfigType {
    ajaxUrl: string;
    sentryPublicApiKey: string;
    sentryHost: string;
    subscribeWithGoogleApiUrl: string;
    isDev: boolean;
    switches: { [key: string]: boolean };
    dfpAccountId: string;
}

// 3rd party type declarations
declare module 'emotion-server' {
    export const extractCritical: any;
}
declare module 'dompurify' {
    const createDOMPurify: any;
    export default createDOMPurify;
}
declare module 'compose-function' {
    const compose: any;
    export default compose;
}
declare module 'minify-css-string' {
    const minifyCSSString: any;
    export default minifyCSSString;
}

/* AMP types */
// tslint:disable-next-line no-namespace
declare namespace JSX {
    interface IntrinsicElements {
        'amp-sidebar': any;
        'amp-accordion': any;
        'amp-img': any;
        'amp-twitter': any;
        'amp-list': any;
        'amp-instagram': any;
        'amp-soundcloud': any;
        'amp-iframe': any;
        'amp-analytics': any;
        'amp-pixel': any;
        'amp-ad': any;
        template: any;
    }
}
