// ----- Imports ----- //

import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { Atoms } from '@guardian/content-api-models/v1/atoms';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import {
    Option,
    fromNullable,
    map,
    withDefault,
} from 'types/option';
import { Result, Err, Ok } from 'types/result';
import { Context, DocParser } from 'types/parserContext';
import { Image as ImageData, parseImage } from 'image';
import { isElement, pipe2 } from 'lib';
import JsonSerialisable from 'types/jsonSerialisable';
import { parseAtom } from 'atoms';
import { formatDate } from 'date';

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
    LiveEvent,
    Video,
    InteractiveAtom,
    ExplainerAtom
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

interface InteractiveAtom {
    kind: ElementKind.InteractiveAtom;
    js: Option<string>;
    css: string;
    html: string;
}

interface ExplainerAtom {
    kind: ElementKind.ExplainerAtom;
    html: string;
    title: string;
    id: string;
}

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
    alt: Option<string>;
} | {
    kind: ElementKind.LiveEvent;
    linkText: string;
    url: string;
    image?: string;
    price?: string;
    start?: string;
} | Video | InteractiveAtom | ExplainerAtom;

type Elements = BlockElement[] | undefined;

type Body =
    Result<string, BodyElement>[];


// ----- Functions ----- //

const serialiseNodes = (nodes: NodeList): string =>
    Array.from(nodes).map(node => {
        if (isElement(node)) {
            return node.outerHTML;
        }

        return node.textContent ?? '';
    }).join('');

const serialiseFragment = (doc: DocumentFragment): string =>
    serialiseNodes(doc.childNodes);

function toSerialisable(elem: BodyElement): JsonSerialisable {
    switch (elem.kind) {
        case ElementKind.Text:
            return { ...elem, doc: serialiseFragment(elem.doc) };
        case ElementKind.Image:
            return { ...elem, caption: map(serialiseFragment)(elem.caption) };
        case ElementKind.Tweet:
            return { ...elem, content: serialiseNodes(elem.content) };
        case ElementKind.InteractiveAtom:
        case ElementKind.ExplainerAtom:
            return { ...elem };
        default:
            return elem;
    }
}

// Disabled because the point of this function is to convert the `any`
// provided by JSON.parse to a stricter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromSerialisable = (docParser: DocParser) => (elem: any): BodyElement => {
    switch (elem.kind) {
        case ElementKind.Text:
            return { ...elem, doc: docParser(elem.doc) };
        case ElementKind.Image:
            return { ...elem, caption: map(docParser)(elem.caption) };
        case ElementKind.Tweet:
            return { ...elem, content: docParser(elem.content) };
        default:
            return elem;
    }
}

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

const parse = (context: Context, atoms?: Atoms) =>
    (element: BlockElement): Result<string, BodyElement> => {
    switch (element.type) {

        case ElementType.TEXT: {
            const html = element?.textTypeData?.html;

            if (!html) {
                return new Err('No html field on textTypeData');
            }

            return new Ok({ kind: ElementKind.Text, doc: context.docParser(html) });
        }

        case ElementType.IMAGE:
            return pipe2(
                parseImage(context)(element),
                map<ImageData, Result<string, Image>>(image => new Ok({
                    kind: ElementKind.Image,
                    ...image
                })),
                withDefault<Result<string, Image>>(new Err('I couldn\'t find a master asset')),
            );

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

            return tweetContent(id, context.docParser(h))
                .fmap(content => ({ kind: ElementKind.Tweet, content }));
        }

        case ElementType.EMBED: {
            const { html: embedHtml, alt } = element.embedTypeData ?? {};

            if (!embedHtml) {
                return new Err('No html field on embedTypeData')
            }

            return new Ok({ kind: ElementKind.Embed, html: embedHtml, alt: fromNullable(alt) });
        }

        case ElementType.MEMBERSHIP: {
            const {
                linkText,
                originalUrl: url,
                price,
                start,
                image
            } = element.membershipTypeData ?? {};

            if (!linkText || !url) {
                return new Err('No linkText or originalUrl field on membershipTypeData');
            }

            const formattedDate = start?.iso8601 && !isNaN(new Date(start?.iso8601).valueOf())
                ? formatDate(new Date(start?.iso8601)) : undefined;

            return new Ok({
                kind: ElementKind.LiveEvent,
                linkText,
                url,
                price,
                start: formattedDate,
                image
            });
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

            return parseIframe(context.docParser)(audioHtml, ElementKind.Audio);
        }

        case ElementType.VIDEO: {
            const { html: videoHtml } = element.videoTypeData ?? {};

            if (!videoHtml) {
                return new Err('No html field on videoTypeData')
            }

            return parseIframe(context.docParser)(videoHtml, ElementKind.Video);
        }

        case ElementType.CONTENTATOM: {
            if (!atoms) {
                return new Err('No atom data returned by capi')
            }

            return parseAtom(element, atoms);
        }

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

const parseElements = (context: Context, atoms?: Atoms) =>
    (elements: Elements): Result<string, BodyElement>[] => {
        if (!elements) {
            return [new Err('No body elements available')];
        }
        return elements.map(parse(context, atoms));
    }


// ----- Exports ----- //

export {
    ElementKind,
    BodyElement,
    Audio,
    Video,
    Body,
    parseElements,
    toSerialisable,
    fromSerialisable,
};
