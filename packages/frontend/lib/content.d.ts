interface Switches {
    [key: string]: boolean;
}

type Weighting =
    | 'inline'
    | 'thumbnail'
    | 'supporting'
    | 'showcase'
    | 'halfwidth'
    | 'immersive';

interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    html: string;
}

interface SubheadingBlockElement {
    _type: 'model.dotcomrendering.pageElements.SubheadingBlockElement';
    html: string;
}

interface RichLinkBlockElement {
    _type: 'model.dotcomrendering.pageElements.RichLinkBlockElement';
    url: string;
    text: string;
    prefix: string;
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
    role: string;
}
interface YoutubeBlockElement {
    _type: 'model.dotcomrendering.pageElements.YoutubeBlockElement';
    id: string;
    assetId: string;
    channelId?: string;
    mediaTitle: string;
}

// Note, this is a Video Embed rather than the above Media Atom
interface VideoYoutube {
    _type: 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement';
    url: string;
    height: number;
    width: number;
    caption: string;
}

interface VideoVimeo {
    _type: 'model.dotcomrendering.pageElements.VideoVimeoBlockElement';
    url: string;
    height: number;
    width: number;
    caption: string;
}

interface VideoFacebook {
    _type: 'model.dotcomrendering.pageElements.VideoFacebookBlockElement';
    url: string;
    height: number;
    width: number;
    caption: string;
}

interface VideoGuardian {
    _type: 'model.dotcomrendering.pageElements.GuVideoBlockElement';
    assets: VideoAssets[];
    caption: string;
}

interface VideoAssets {
    url: string;
    mimeType: string;
}
interface InstagramBlockElement {
    _type: 'model.dotcomrendering.pageElements.InstagramBlockElement';
    html: string;
    url: string;
    hasCaption: boolean;
}

interface TweetBlockElement {
    _type: 'model.dotcomrendering.pageElements.TweetBlockElement';
    html: string;
    url: string;
    id: string;
    hasMedia: boolean;
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

interface ImageSource {
    weighting: Weighting;
    srcSet: SrcSet[];
}

interface SrcSet {
    src: string;
    width: number;
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

interface SoundcloudBlockElement {
    _type: 'model.dotcomrendering.pageElements.SoundcloudBlockElement';
    html: string;
    id: string;
    isTrack: boolean;
    isMandatory: boolean;
}

interface EmbedBlockElement {
    _type: 'model.dotcomrendering.pageElements.EmbedBlockElement';
    safe?: boolean;
    alt?: string;
    html: string;
    isMandatory: boolean;
}

interface DisclaimerBlockElement {
    _type: 'model.dotcomrendering.pageElements.DisclaimerBlockElement';
    html: string;
}

interface PullquoteBlockElement {
    _type: 'model.dotcomrendering.pageElements.PullquoteBlockElement';
    html: string;
    role: string;
}

interface QABlockElement {
    _type: 'model.dotcomrendering.pageElements.QABlockElement';
    id: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface GuideBlockElement {
    _type: 'model.dotcomrendering.pageElements.GuideBlockElement';
    id: string;
    label: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface ProfileBlockElement {
    _type: 'model.dotcomrendering.pageElements.ProfileBlockElement';
    id: string;
    label: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

interface TimelineEvent {
    title: string;
    date: string;
    body?: string;
    toDate?: string;
}

interface TimelineBlockElement {
    _type: 'model.dotcomrendering.pageElements.TimelineBlockElement';
    id: string;
    title: string;
    description?: string;
    events: TimelineEvent[];
}

interface InteractiveMarkupBlockElement {
    _type: 'model.dotcomrendering.pageElements.InteractiveMarkupBlockElement';
    id?: string;
    html?: string;
    css?: string;
    js?: string;
}

interface InteractiveUrlElement {
    _type: 'model.dotcomrendering.pageElements.InteractiveUrlBlockElement';
    url: string;
}

interface MapBlockElement {
    _type: 'model.dotcomrendering.pageElements.MapBlockElement';
    url: string;
    originalUrl: string;
    source: string;
    caption: string;
    title: string;
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

interface VideoBlockElement {
    _type: 'model.dotcomrendering.pageElements.VideoBlockElement';
}

type CAPIElement =
    | TextBlockElement
    | SubheadingBlockElement
    | ImageBlockElement
    | YoutubeBlockElement
    | VideoYoutube
    | VideoVimeo
    | VideoFacebook
    | VideoGuardian
    | InstagramBlockElement
    | TweetBlockElement
    | RichLinkBlockElement
    | CommentBlockElement
    | SoundcloudBlockElement
    | EmbedBlockElement
    | DisclaimerBlockElement
    | PullquoteBlockElement
    | QABlockElement
    | GuideBlockElement
    | ProfileBlockElement
    | TimelineBlockElement
    | InteractiveMarkupBlockElement
    | InteractiveUrlElement
    | MapBlockElement
    | AudioAtomElement
    | AudioBlockElement
    | VideoBlockElement;
