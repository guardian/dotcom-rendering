interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    html: string;
}

interface RichLinkBlockElement {
    _type: 'model.dotcomrendering.pageElements.RichLinkBlockElement';
    url: string;
    text: string;
    prefix: string;
    sponsorship: string;
}

interface ImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.ImageBlockElement';
    media: { allImages: Image[] };
    data: { alt: string; credit: string; caption?: string };
    imageSources: ImageSource[];
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
    weighting: string;
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

type CAPIElement =
    | TextBlockElement
    | ImageBlockElement
    | InstagramBlockElement
    | TweetBlockElement
    | RichLinkBlockElement
    | CommentBlockElement
    | SoundcloudBlockElement;
