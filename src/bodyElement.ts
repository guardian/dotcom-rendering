// ----- Imports ----- //

import { IBlockElement as BlockElement } from 'mapiThriftModels/BlockElement';
import { ElementType } from 'mapiThriftModels/ElementType';
import { Option, fromNullable } from 'types/option';
import { Result, Err, Ok } from 'types/result';
import DocParser from 'types/docParser';
import { Image as ImageData, parseImage } from 'image';


// ----- Types ----- //

const enum ElementKind {
    Text,
    Image,
    Pullquote,
    Interactive,
    RichLink,
    Tweet,
    Instagram,
    Audio,
    Embed,
    Video,
}

type Image = ImageData & {
    kind: ElementKind.Image;
}

type Audio = {
    kind: ElementKind.Audio;
    src: string;
    height: string;
    width: string;
}

type Video = {
    kind: ElementKind.Video;
    src: string;
    height: string;
    width: string;
}

type MediaKind = ElementKind.Audio | ElementKind.Video;

type BodyElement = {
    kind: ElementKind.Text;
    doc: DocumentFragment;
} | Image | {
    kind: ElementKind.Pullquote;
    quote: string;
    attribution: Option<string>;
} | {
    kind: ElementKind.Interactive;
    url: string;
    alt?: string;
} | {
    kind: ElementKind.RichLink;
    url: string;
    linkText: string;
} | {
    kind: ElementKind.Tweet;
    content: NodeList;
} | {
    kind: ElementKind.Instagram;
    html: string;
} | Audio | {
    kind: ElementKind.Embed;
    html: string;
} | Video;

type Elements = BlockElement[] | undefined;

type Body =
    Result<string, BodyElement>[];


// ----- Functions ----- //

const tweetContent = (tweetId: string, doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet with id: ${tweetId}`);
}

const parseIframe = (docParser: DocParser) =>
    (html: string, kind: MediaKind): Result<string, Audio | Video> => {
        const iframe = docParser(html).querySelector('iframe');
        const src = iframe?.getAttribute('src');

        if (!iframe || !src) {
            return new Err('No iframe within html');
        }

        return new Ok({
            kind,
            src,
            width: iframe.getAttribute('width') ?? "380",
            height: iframe.getAttribute('height') ?? "300",
        });
}

const parse =
    (docParser: DocParser) => (element: BlockElement): Result<string, BodyElement> => {
    switch (element.type) {

        case ElementType.TEXT: {
            const html = element?.textTypeData?.html;

            if (!html) {
                return new Err('No html field on textTypeData');
            }

            return new Ok({ kind: ElementKind.Text, doc: docParser(html) });
        }

        case ElementType.IMAGE:
            return parseImage(docParser)(element)
                .fmap<Result<string, Image>>(image => new Ok({
                    kind: ElementKind.Image,
                    ...image
                }))
                .withDefault(new Err('I couldn\'t find a master asset'));

        case ElementType.PULLQUOTE: {
            const { html: quote, attribution } = element.pullquoteTypeData ?? {};

            if (!quote) {
                return new Err('No quote field on pullquoteTypeData');
            }

            return new Ok({
                kind: ElementKind.Pullquote,
                quote,
                attribution: fromNullable(attribution),
            });
        }

        case ElementType.INTERACTIVE: {
            const { iframeUrl, alt } = element.interactiveTypeData ?? {};

            if (!iframeUrl) {
                return new Err('No iframeUrl field on interactiveTypeData');
            }

            return new Ok({ kind: ElementKind.Interactive, url: iframeUrl, alt });
        }

        case ElementType.RICH_LINK: {
            const { url, linkText } = element.richLinkTypeData ?? {};

            if (!url) {
                return new Err('No "url" field on richLinkTypeData');
            } else if (!linkText) {
                return new Err('No "linkText" field on richLinkTypeData');
            }

            return new Ok({ kind: ElementKind.RichLink, url, linkText });
        }

        case ElementType.TWEET: {
            const { id, html: h } = element.tweetTypeData ?? {};

            if (!id) {
                return new Err('No "id" field on tweetTypeData')
            } else if (!h) {
                return new Err('No "html" field on tweetTypeData')
            }

            return tweetContent(id, docParser(h))
                .fmap(content => ({ kind: ElementKind.Tweet, content }));
        }

        case ElementType.EMBED: {
            const { html: embedHtml } = element.embedTypeData ?? {};

            if (!embedHtml) {
                return new Err('No html field on embedTypeData')
            }

            return new Ok({ kind: ElementKind.Embed, html: embedHtml });
        }

        case ElementType.INSTAGRAM: {
            const { html: instagramHtml } = element.instagramTypeData ?? {};

            if (!instagramHtml) {
                return new Err('No html field on instagramTypeData')
            }

            return new Ok({ kind: ElementKind.Instagram, html: instagramHtml });
        }

        case ElementType.AUDIO: {
            const { html: audioHtml } = element.audioTypeData ?? {};

            if (!audioHtml) {
                return new Err('No html field on audioTypeData')
            }

            return parseIframe(docParser)(audioHtml, ElementKind.Audio);
        }

        case ElementType.VIDEO: {
            const { html: videoHtml } = element.videoTypeData ?? {};

            if (!videoHtml) {
                return new Err('No html field on videoTypeData')
            }

            return parseIframe(docParser)(videoHtml, ElementKind.Video);
        }

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

const parseElements =
    (docParser: DocParser) => (elements: Elements): Result<string, BodyElement>[] => {
        if (!elements) {
            return [new Err('No body elements available')];
        }
        return elements.map(parse(docParser));
    }


// ----- Exports ----- //

export {
    ElementKind,
    BodyElement,
    Audio,
    Video,
    Body,
    parseElements,
};
