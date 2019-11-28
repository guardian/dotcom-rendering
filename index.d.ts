// ------------------------  //
// CAPIType and its subtypes //
// ------------------------- //

interface ArticleProps {
    CAPI: CAPIType;
    NAV: NavType;
}

// Pillars are used for styling
// RealPillars have Pillar palette colours
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article
type RealPillars = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';
type FakePillars = 'labs';
type Pillar = RealPillars | FakePillars;

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

interface AdTargeting {
    adUnit: string;
    customParams: { [key: string]: any };
}

interface SectionNielsenAPI {
    name: string;
    apiID: string;
}

interface EditionCommercialProperties {
    adTargeting: AdTargetParam[];
    branding?: Branding;
}

type CommercialProperties = { [E in Edition]: EditionCommercialProperties };

interface Branding {
    sponsorName: string;
    logo: {
        src: string;
        link: string;
        label: string;
        dimensions: { width: number; height: number };
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
    byline?: string;
    twitterHandle?: string;
    email?: string;
}

interface Block {
    id: string;
    elements: CAPIElement[];
    createdOn?: number;
    createdOnDisplay?: string;
    lastUpdatedDisplay?: string;
    title?: string;
    firstPublished?: number;
    firstPublishedDisplay?: string;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    newest?: string;
    newer?: string;
    oldest?: string;
    older?: string;
}

interface FooterLink {
    text: string;
    url: string;
    dataLinkName: string;
    extraClasses?: string;
}
interface FooterType {
    footerLinks: FooterLink[][];
}

type ContentType =
    | 'article'
    | 'network'
    | 'section'
    | 'imageContent'
    | 'interactive'
    | 'gallery'
    | 'video'
    | 'audio'
    | 'liveBlog'
    | 'tag'
    | 'index'
    | 'crossword'
    | 'survey'
    | 'signup'
    | 'userid';

// WARNING: run `gen-schema` task if changing this to update the associated JSON
// schema definition.
interface CAPIType {
    headline: string;
    standfirst: string;
    webTitle: string;
    mainMediaElements: CAPIElement[];
    main: string;
    keyEvents: Block[];
    blocks: Block[];
    pagination?: Pagination;
    author: AuthorType;

    /**
     * @TJS-format date-time
     */
    webPublicationDate: string;

    webPublicationDateDisplay: string;
    editionLongForm: string;
    editionId: Edition;
    pageId: string;
    tags: TagType[];
    pillar: Pillar;
    isImmersive: boolean;
    sectionLabel: string;
    sectionUrl: string;
    sectionName?: string;
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
    shouldHideAds: boolean;
    isAdFreeUser: boolean;
    openGraphData: { [key: string]: string };
    twitterData: { [key: string]: string };
    webURL: string;
    linkedData: object[];
    config: ConfigType;
    designType: DesignType;
    showBottomSocialButtons: boolean;

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

    nav: any; // as not extracting directly into NavType here for now (nav stuff is getting moved out)

    pageFooter: FooterType;
}

interface TagType {
    id: string;
    type: string;
    title: string;
    twitterHandle?: string;
    paidContentType?: string;
    bylineImageUrl?: string;
}

interface BadgeType {
    linkTo: string;
    svgSrc: () => JSX.Element;
}

// Defines a prefix to be used with a headline (e.g. 'Live /')
interface KickerType {
    text: string;
    pillar?: Pillar;
    showPulsingDot?: boolean;
    showSlash?: boolean;
}

type ImagePositionType = 'left' | 'top' | 'right';

type CardImageType = {
    element: ImageBlockElement;
    position?: ImagePositionType;
    size?: ImageSizeType;
};

type SmallHeadlineSize = 'xxxsmall' | 'xxsmall' | 'xsmall';

type AvatarType = {
    src: string;
    alt: string;
};

interface CardType {
    linkTo: string;
    pillar: Pillar;
    headline: SmallHeadlineType;
    webPublicationDate?: string;
    trailImage?: CardImageType;
    standfirst?: string;
    avatar?: AvatarType;
}

type ImageSizeType = 'small' | 'medium' | 'large' | 'jumbo';
type CardPercentageType = '25%' | '33%' | '50%' | '67%' | '75%' | '100%';

type HeadlineLink = {
    to: string; // the href for the anchor tag
    visitedColour?: string; // a custom colour for the :visited state
    preventFocus?: boolean; // if true, stop the link from being tabbable and focusable
};

interface SmallHeadlineType {
    headlineString: string; // The text shown
    pillar: Pillar; // Used to colour the headline (dark) and the kicker (main)
    underlined?: boolean; // Some headlines have an underlined style
    showUnderline?: boolean; // Some headlines have text-decoration underlined when hovered
    kicker?: KickerType;
    showQuotes?: boolean; // When true the QuoteIcon is shown
    size?: SmallHeadlineSize;
    coloured?: boolean; // When coloured, the headline takes the dark pillar colour
    link?: HeadlineLink; // An optional link object configures if/how the component renders an anchor tag
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
    dcrSentryDsn: string;
    switches: { [key: string]: boolean };
    abTests: { [key: string]: string };
    dfpAccountId: string;
    commercialBundleUrl: string;
    revisionNumber: string;
    isDev?: boolean;
    googletagUrl: string;
    stage: string;
    frontendAssetsFullURL: string;
    hbImpl: string;
    adUnit: string;
    isSensitive: string;
    videoDuration: number;
    edition: string;
    section: string;
    sharedAdTargeting: { [key: string]: any };
}

interface GADataType {
    pillar: Pillar;
    webTitle: string;
    section: string;
    contentType: string;
    commissioningDesks: string;
    contentId: string;
    authorIds: string;
    keywordIds: string;
    toneIds: string;
    seriesId: string;
    isHosted: string;
    edition: Edition;
    beaconUrl: string;
}

// https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/DesignType.scala
type DesignType =
    | 'Article'
    | 'Immersive'
    | 'Media'
    | 'Review'
    | 'Analysis'
    | 'Comment'
    | 'Feature'
    | 'Live'
    | 'SpecialReport'
    | 'Recipe'
    | 'MatchReport'
    | 'Interview'
    | 'GuardianView'
    | 'GuardianLabs'
    | 'Quiz'
    | 'AdvertisementFeature';

// This is an object that allows you Type defaults of the designTypes.
// The return type looks like: { Feature: any, Live: any, ...}
// and can be used to add TypeSafety when needing to override a style in a designType
type DesignTypesObj = { [key in DesignType]: any };

// ----------------- //
// General DataTypes //
// ----------------- //

interface DCRDocumentData {
    page: string;
    site: string;
    CAPI: CAPIType;
    NAV: NavType;
    GA: GADataType;
    linkedData: object;
}

interface Props {
    data: DCRDocumentData; // Do not fall to the tempation to rename 'data' into something else
}

type JSXElements = JSX.Element | JSX.Element[];

interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
    ageWarning: string;
    image?: string;
    pillar: Pillar;
}

// ------------------------------
// 3rd party type declarations //
// ------------------------------
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

// ------------------------------------- //
// AMP types                             //
// ------------------------------------- //

// tslint:disable-next-line no-namespace
declare namespace JSX {
    interface IntrinsicElements {
        'amp-sidebar': any;
        'amp-accordion': any;
        'amp-img': any;
        'amp-twitter': any;
        'amp-list': any;
        'amp-vimeo': any;
        'amp-facebook': any;
        'amp-video': any;
        'amp-instagram': any;
        'amp-soundcloud': any;
        'amp-iframe': any;
        'amp-analytics': any;
        'amp-pixel': any;
        'amp-ad': any;
        'amp-youtube': any;
        'amp-geo': any;
        'amp-consent': any;
        'amp-live-list': any;
        'amp-audio': any;
    }
}

// SVG handling
declare module '*.svg' {
    const content: any;
    export default content;
}
