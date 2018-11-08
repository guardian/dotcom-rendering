


interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    html: string;
}

interface ImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.ImageBlockElement';
    media: {allImages: Image[]};
    data: {alt: string, credit: string, caption?: string}
}

interface Image{
    index: number;
    fields: {
        height: string,
        width: string,
        isMaster?:string,
    };
    mediaType: string,
    mimeType: string,
    url: string
}

type CAPIElement = TextBlockElement | ImageBlockElement
