interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    html: string;
}

interface ImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.ImageBlockElement';
    media: { allImages: Image[] };
    data: { alt: string; credit: string; caption?: string };
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

type CAPIElement =
    | TextBlockElement
    | ImageBlockElement
    | InstagramBlockElement
    | TweetBlockElement;
