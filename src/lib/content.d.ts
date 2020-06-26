// -------------------------------------
// Elements
// -------------------------------------
interface InteractiveAtomBlockElementBase {
    url: string;
    id?: string;
    html?: string;
    css?: string;
    js?: string;
}

interface AudioAtomElement {
    _type: 'model.dotcomrendering.pageElements.AudioAtomBlockElement';
    id: string;
    kicker: string;
    trackUrl: string;
    duration: number;
    coverUrl: string;
}

interface AudioBlockElement {
    _type: 'model.dotcomrendering.pageElements.AudioBlockElement';
}

interface BlockquoteBlockElement {
    _type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement';
    html: string;
}

interface CaptionBlockElement {
    _type: 'model.dotcomrendering.pageElements.CaptionBlockElement';
    display: Display;
    designType: DesignType;
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
    isOverlayed?: boolean;
}
interface ChartAtomBlockElement extends InteractiveAtomBlockElementBase {
    _type: 'model.dotcomrendering.pageElements.ChartAtomBlockElement';
}

interface CodeBlockElement {
    _type: 'model.dotcomrendering.pageElements.CodeBlockElement';
    isMandatory: boolean;
}

interface CommentBlockElement {
    _type: 'model.dotcomrendering.pageElements.CommentBlockElement';
    body: string;
    avatarURL: string;
    profileURL: string;
    profileName: string;
    permalink: string;
    dateTime: string;
}

interface ContentAtomBlockElement {
    _type: 'model.dotcomrendering.pageElements.ContentAtomBlockElement';
    atomId: string;
}

interface DisclaimerBlockElement {
    _type: 'model.dotcomrendering.pageElements.DisclaimerBlockElement';
    html: string;
}

interface DividerBlockElement {
    _type: 'model.dotcomrendering.pageElements.DividerBlockElement';
}

interface DocumentBlockElement {
    _type: 'model.dotcomrendering.pageElements.DocumentBlockElement';
    isMandatory: boolean;
}

interface EmbedBlockElement {
    _type: 'model.dotcomrendering.pageElements.EmbedBlockElement';
    safe?: boolean;
    alt?: string;
    html: string;
    isMandatory: boolean;
}

interface ExplainerAtomBlockElement {
    _type: 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement';
    id: string;
    title: string;
    body: string;
}

interface GenericAtomBlockElement extends InteractiveAtomBlockElementBase {
    _type: 'model.dotcomrendering.pageElements.GenericAtomBlockElement';
}

interface GuideAtomBlockElement {
    _type: 'model.dotcomrendering.pageElements.GuideAtomBlockElement';
    id: string;
    label: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface GuVideoBlockElement {
    _type: 'model.dotcomrendering.pageElements.GuVideoBlockElement';
    assets: VideoAssets[];
    caption: string;
}

interface HighlightBlockElement {
    _type: 'model.dotcomrendering.pageElements.HighlightBlockElement';
    html: string;
}

interface ImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.ImageBlockElement';
    media: { allImages: Image[] };
    data: {
        alt?: string;
        credit?: string;
        caption?: string;
        copyright?: string;
    };
    imageSources: ImageSource[];
    displayCredit?: boolean;
    role: RoleType;
    title?: string;
}

interface InstagramBlockElement {
    _type: 'model.dotcomrendering.pageElements.InstagramBlockElement';
    html: string;
    url: string;
    hasCaption: boolean;
}

interface InteractiveAtomBlockElement extends InteractiveAtomBlockElementBase {
    _type: 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement';
}

interface MapBlockElement {
    _type: 'model.dotcomrendering.pageElements.MapBlockElement';
    url: string;
    originalUrl: string;
    source: string;
    caption: string;
    title: string;
}

interface MultiImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.MultiImageBlockElement';
    images: ImageBlockElement[];
    caption?: string;
}

interface ProfileAtomBlockElement {
    _type: 'model.dotcomrendering.pageElements.ProfileAtomBlockElement';
    id: string;
    label: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface PullquoteBlockElement {
    _type: 'model.dotcomrendering.pageElements.PullquoteBlockElement';
    html: string;
    role: string;
    attribution?: string;
}

interface QABlockElement {
    _type: 'model.dotcomrendering.pageElements.QABlockElement';
    id: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface RichLinkBlockElement {
    _type: 'model.dotcomrendering.pageElements.RichLinkBlockElement';
    url: string;
    text: string;
    prefix: string;
    role?: Weighting;
    richLinkIndex?: number;
}

interface SoundcloudBlockElement {
    _type: 'model.dotcomrendering.pageElements.SoundcloudBlockElement';
    html: string;
    id: string;
    isTrack: boolean;
    isMandatory: boolean;
}

interface SubheadingBlockElement {
    _type: 'model.dotcomrendering.pageElements.SubheadingBlockElement';
    html: string;
}

interface TableBlockElement {
    _type: 'model.dotcomrendering.pageElements.TableBlockElement';
    isMandatory: boolean;
    html: string;
}

interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    dropCap?: boolean;
    html: string;
}

interface TimelineBlockElement {
    _type: 'model.dotcomrendering.pageElements.TimelineBlockElement';
    id: string;
    title: string;
    description?: string;
    events: TimelineEvent[];
}

interface TweetBlockElement {
    _type: 'model.dotcomrendering.pageElements.TweetBlockElement';
    html: string;
    url: string;
    id: string;
    hasMedia: boolean;
}

interface VideoBlockElement {
    _type: 'model.dotcomrendering.pageElements.VideoBlockElement';
}

interface VideoFacebookBlockElement {
    _type: 'model.dotcomrendering.pageElements.VideoFacebookBlockElement';
    url: string;
    height: number;
    width: number;
    caption: string;
}

interface VideoVimeoBlockElement {
    _type: 'model.dotcomrendering.pageElements.VideoVimeoBlockElement';
    url: string;
    height: number;
    width: number;
    caption?: string;
    credit?: string;
    title?: string;
}

interface VideoYoutubeBlockElement {
    _type: 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement';
    url: string;
    height: number;
    width: number;
    caption?: string;
    credit?: string;
    title?: string;
}

interface YoutubeBlockElement {
    _type: 'model.dotcomrendering.pageElements.YoutubeBlockElement';
    assetId: string;
    mediaTitle: string;
    id?: string;
    channelId?: string;
    duration?: number;
    posterSrc?: string;
    height?: string;
    width?: string;
}

interface CalloutBlockElement {
    _type: 'model.dotcomrendering.pageElements.CalloutBlockElement';
    id: string;
    activeFrom: number;
    displayOnSensitive: boolean;
    formId: number;
    title: string;
    description: string;
    tagName: string;
    formFields: CampaignFieldType[];
}

type CAPIElement =
    | AudioAtomElement
    | AudioBlockElement
    | BlockquoteBlockElement
    | CaptionBlockElement
    | ChartAtomBlockElement
    | CodeBlockElement
    | CommentBlockElement
    | ContentAtomBlockElement
    | DisclaimerBlockElement
    | DividerBlockElement
    | DocumentBlockElement
    | EmbedBlockElement
    | ExplainerAtomBlockElement
    | GenericAtomBlockElement
    | GuideAtomBlockElement
    | GuVideoBlockElement
    | HighlightBlockElement
    | ImageBlockElement
    | InstagramBlockElement
    | InteractiveAtomBlockElement
    | MapBlockElement
    | MultiImageBlockElement
    | ProfileAtomBlockElement
    | PullquoteBlockElement
    | QABlockElement
    | RichLinkBlockElement
    | SoundcloudBlockElement
    | SubheadingBlockElement
    | TableBlockElement
    | TextBlockElement
    | TimelineBlockElement
    | TweetBlockElement
    | VideoBlockElement
    | VideoFacebookBlockElement
    | VideoVimeoBlockElement
    | VideoYoutubeBlockElement
    | YoutubeBlockElement;

// -------------------------------------
// Misc
// -------------------------------------

type Weighting =
    | 'inline'
    | 'thumbnail'
    | 'supporting'
    | 'showcase'
    | 'halfwidth'
    | 'immersive';

// aka weighting. RoleType affects how an image is placed. It is called weighting
// in Composer but role in CAPI. We respect CAPI so we maintain this nomenclature
// in DCR
type RoleType =
    | 'immersive'
    | 'supporting'
    | 'showcase'
    | 'inline'
    | 'thumbnail'
    | 'halfWidth';

interface ImageSource {
    weighting: Weighting;
    srcSet: SrcSetItem[];
}

interface SrcSetItem {
    src: string;
    width: number;
}

interface Image {
    index: number;
    fields: {
        height: string;
        width: string;
        isMaster?: string;
    };
    mediaType: string;
    mimeType: string;
    url: string;
}

interface VideoAssets {
    url: string;
    mimeType: string;
}

interface TimelineEvent {
    title: string;
    date: string;
    body?: string;
    toDate?: string;
}

interface Switches {
    [key: string]: boolean;
}

// -------------------------------------
// Callout Campaign
// -------------------------------------

type CampaignFieldType =
    | CampaignFieldText
    | CampaignFieldTextArea
    | CampaignFieldFile
    | CampaignFieldRadio
    | CampaignFieldCheckbox
    | CampaignFieldSelect;

interface CampaignField {
    id: number;
    name: string;
    description?: string;
    required: boolean;
    textSize?: number;
    hideLabel: boolean;
    label: string;
}

interface CampaignFieldText extends CampaignField {
    type: 'textarea';
}

interface CampaignFieldTextArea extends CampaignField {
    type: 'text';
}

interface CampaignFieldFile extends CampaignField {
    type: 'file';
}

interface CampaignFieldRadio extends CampaignField {
    type: 'radio';
    options: {
        label: string;
        value: string;
    }[];
}

interface CampaignFieldCheckbox extends CampaignField {
    type: 'checkbox';
    options: {
        label: string;
        value: string;
    }[];
}

interface CampaignFieldSelect extends CampaignField {
    type: 'select';
    options: {
        label: string;
        value: string;
    }[];
}
