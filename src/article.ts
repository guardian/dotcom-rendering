// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content } from 'mapiThriftModels/Content';
import { IBlockElement } from 'mapiThriftModels/BlockElement';
import { ITag } from 'mapiThriftModels/Tag';
import { isFeature, isAnalysis, isImmersive, isReview, articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable, Some } from 'types/option';
import { Err, Ok, Result } from 'types/result';
import { IBlock } from 'mapiThriftModels';


// ----- Types ----- //

const enum Layout {
    Standard,
    Immersive,
    Feature,
    Review,
    Analysis,
    Opinion,
    Liveblog,
    Gallery,
    Interactive,
    Picture,
    Video,
    Audio,
}

interface ArticleFields {
    pillar: Pillar;
    headline: string;
    standfirst: DocumentFragment;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    publishDate: string;
    mainImage: Option<Image>;
    contributors: ITag[];
    series: ITag;
    commentable: boolean;
    tags: ITag[];
}

type Liveblog = ArticleFields & {
    layout: Layout.Liveblog;
    blocks: LiveBlock[];
}

type Review = ArticleFieldsWithBody & {
    layout: Layout.Review;
    starRating: number;
}

type Standard = ArticleFieldsWithBody & {
    layout: Exclude<Layout, Layout.Liveblog | Layout.Review>;
}

type Article
    = Liveblog
    | Review
    | Standard;

const enum ElementKind {
    Text,
    Image,
    Pullquote,
    Interactive,
    RichLink,
    Tweet,
}

type Image = {
    kind: ElementKind.Image;
    alt: string;
    caption: string;
    displayCredit: boolean;
    credit: string;
    file: string;
    width: number;
    height: number;
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
} | {
    kind: ElementKind.RichLink;
    url: string;
    linkText: string;
} | {
    kind: ElementKind.Tweet;
    content: NodeList;
};

type LiveBlock = {
    id: string;
    isKeyEvent: boolean;
    title: string;
    firstPublished: Date;
    lastModified: Date;
    body: Result<string, BodyElement>[];
}

type DocParser = (html: string) => DocumentFragment;

type ArticleFieldsWithBody = ArticleFields & {
    body: Result<string, BodyElement>[];
};


// ----- Functions ----- //

const tweetContent = (tweetId: string, doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet with id: ${tweetId}`);
}

const parseImage = (element: IBlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
    const { alt = "", caption = "", displayCredit = false, credit = "" } = element.imageTypeData || {};

    return new Some({
        kind: ElementKind.Image,
        alt,
        caption,
        displayCredit,
        credit,
        file: masterAsset?.file ?? "",
        width: masterAsset?.typeData?.width ?? 0,
        height: masterAsset?.typeData?.height ?? 0,
    })
}

const parseElement =
    (docParser: DocParser) => (element: IBlockElement): Result<string, BodyElement> => {
    switch (element.type.toString()) {
        case 'text':
            const html = element?.textTypeData?.html;
            if (!html) {
                return new Err('No html field on textTypeData')
            }
            return new Ok({ kind: ElementKind.Text, doc: docParser(html) });

        case 'image':
            return parseImage(element)
                .map<Result<string, Image>>(image => new Ok(image))
                .withDefault(new Err('I couldn\'t find a master asset'));

        case 'pullquote':
            const { html: quote, attribution } = element.pullquoteTypeData || {};
            if (!quote) {
                return new Err('No quote field on pullquoteTypeData')
            }
            return new Ok({
                kind: ElementKind.Pullquote,
                quote,
                attribution: fromNullable(attribution),
            });

        case 'interactive':
            const { iframeUrl } = element.interactiveTypeData || {};
            if (!iframeUrl) {
                return new Err('No iframeUrl field on interactiveTypeData')
            }
            return new Ok({ kind: ElementKind.Interactive, url: iframeUrl });

        case 'rich-link':
            const { url, linkText } = element.richLinkTypeData || {};
            if (!url || !linkText) {
                return new Err('No url/linkText field on richLinkTypeData')
            }
            return new Ok({ kind: ElementKind.RichLink, url, linkText });

        case 'tweet':
            const { id, html: h } = element.tweetTypeData || {};
            if (!id || !h) {
                return new Err('No id/html field on tweetTypeData')
            }
            return tweetContent(id, docParser(h))
                .map(content => ({ kind: ElementKind.Tweet, content }));

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

type Elements = IBlockElement[] | undefined;

const parseElements =
    (docParser: DocParser) => (elements: Elements): Result<string, BodyElement>[] => {
        if (!elements) {
            return [new Err('No body elements available')];
        }
        return elements.map(parseElement(docParser));
    }

const parseBlock = (docParser: DocParser) => (block: IBlock): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block?.attributes?.keyEvent ?? false,
        title: block?.title ?? "",
        firstPublished: new Date(block?.firstPublishedDate?.iso8601 ?? 0),
        lastModified: new Date(block?.lastModifiedDate?.iso8601 ?? 0),
        body: parseElements(docParser)(block.elements),
    })

const parseBlocks = (docParser: DocParser) => (blocks: IBlock[]): LiveBlock[] =>
    blocks.map(parseBlock(docParser));

const articleFields = (docParser: DocParser, content: Content): ArticleFields =>
    ({
        pillar: pillarFromString(content?.pillarId),
        headline: content?.fields?.headline ?? "",
        standfirst: docParser(content?.fields?.standfirst ?? ""),
        byline: content?.fields?.byline ?? "",
        bylineHtml: fromNullable(content?.fields?.bylineHtml).map(docParser),
        // eslint-disable-next-line
        // @ts-ignore
        // CAPI is sending us a string, even though the thrift definition is CapiDateTime
        publishDate: content?.webPublicationDate,
        mainImage: articleMainImage(content).andThen(parseImage),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content?.fields?.commentable ?? false,
        tags: content.tags,
    })

const articleFieldsWithBody = (docParser: DocParser, content: Content): ArticleFieldsWithBody => {
    const body = content?.blocks?.body ?? [];
    const elements = body[0]?.elements;
    return ({
        ...articleFields(docParser, content),
        body: parseElements(docParser)(elements),
    });
}

const fromCapi = (docParser: DocParser) => (content: Content): Article => {
    switch (content.type.toString()) {
        case 'article':

            if (pillarFromString(content.pillarId) === Pillar.opinion) {
                return { layout: Layout.Opinion, ...articleFieldsWithBody(docParser, content) };

            } else if (isImmersive(content)) {
                return { layout: Layout.Immersive, ...articleFieldsWithBody(docParser, content) };

            } else if (isFeature(content)) {
                return { layout: Layout.Feature, ...articleFieldsWithBody(docParser, content) };

            } else if (isReview(content)) {
                return {
                    layout: Layout.Review,
                    starRating: content?.fields?.starRating ?? 0,
                    ...articleFieldsWithBody(docParser, content),
                };

            } else if (isAnalysis(content)) {
                return { layout: Layout.Analysis, ...articleFieldsWithBody(docParser, content) };
            }

            return { layout: Layout.Standard, ...articleFieldsWithBody(docParser, content) };

        case 'liveblog':
            const body = content?.blocks?.body ?? [];
            return {
                layout: Layout.Liveblog,
                blocks: parseBlocks(docParser)(body),
                ...articleFields(docParser, content),
            };

        case 'gallery':
            return { layout: Layout.Gallery, ...articleFieldsWithBody(docParser, content) };

        case 'interactive':
            return { layout: Layout.Interactive, ...articleFieldsWithBody(docParser, content) };

        case 'picture':
            return { layout: Layout.Picture, ...articleFieldsWithBody(docParser, content) };

        case 'video':
            return { layout: Layout.Video, ...articleFieldsWithBody(docParser, content) };

        case 'audio':
            return { layout: Layout.Audio, ...articleFieldsWithBody(docParser, content) };

        default:
            return { layout: Layout.Standard, ...articleFieldsWithBody(docParser, content) };
    }
}


// ----- Exports ----- //

export {
    Article,
    Liveblog,
    Review,
    Standard,
    LiveBlock,
    Layout,
    ElementKind,
    BodyElement,
    Image,
    fromCapi,
};
