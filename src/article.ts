// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content, ElementType, BlockElement, Tag, Block } from 'capiThriftModels';
import { isFeature, isAnalysis, isImmersive, isReview, articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable } from 'types/option';
import { Err, Ok, Result } from 'types/result';


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
    contributors: Tag[];
    series: Tag;
    commentable: boolean;
    tags: Tag[];
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
    | Standard
    ;

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

const parseImage = (element: BlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset.typeData.isMaster);
    const { alt, caption, displayCredit, credit } = element.imageTypeData;

    return fromNullable(masterAsset).map(asset => ({
        kind: ElementKind.Image,
        alt,
        caption,
        displayCredit,
        credit,
        file: asset.file,
        width: asset.typeData.width,
        height: asset.typeData.height,
    }));
}

const parseElement =
    (docParser: DocParser) => (element: BlockElement): Result<string, BodyElement> => {

    switch (element.type) {

        case ElementType.TEXT:
            return new Ok({ kind: ElementKind.Text, doc: docParser(element.textTypeData.html) });

        case ElementType.IMAGE:
            return parseImage(element)
                .map<Result<string, Image>>(image => new Ok(image))
                .withDefault(new Err('I couldn\'t find a master asset'));

        case ElementType.PULLQUOTE:

            const { html: quote, attribution } = element.pullquoteTypeData;
            return new Ok({
                kind: ElementKind.Pullquote,
                quote,
                attribution: fromNullable(attribution),
            });

        case ElementType.INTERACTIVE:
            const { iframeUrl } = element.interactiveTypeData;
            return new Ok({ kind: ElementKind.Interactive, url: iframeUrl });

        case ElementType.RICH_LINK:

            const { url, linkText } = element.richLinkTypeData;
            return new Ok({ kind: ElementKind.RichLink, url, linkText });

        case ElementType.TWEET:
            return tweetContent(element.tweetTypeData.id, docParser(element.tweetTypeData.html))
                .map(content => ({ kind: ElementKind.Tweet, content }));

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

const parseElements =
    (docParser: DocParser) => (elements: BlockElement[]): Result<string, BodyElement>[] =>
    elements.map(parseElement(docParser));

const parseBlock = (docParser: DocParser) => (block: Block): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block.attributes.keyEvent,
        title: block.title,
        firstPublished: block.firstPublishedDate,
        lastModified: block.lastModifiedDate,
        body: parseElements(docParser)(block.elements),
    })

const parseBlocks = (docParser: DocParser) => (blocks: Block[]): LiveBlock[] =>
    blocks.map(parseBlock(docParser));

const articleFields = (docParser: DocParser, content: Content): ArticleFields =>
    ({
        pillar: pillarFromString(content.pillarId),
        headline: content.fields.headline,
        standfirst: docParser(content.fields.standfirst),
        byline: content.fields.byline,
        bylineHtml: fromNullable(content.fields.bylineHtml).map(docParser),
        publishDate: content.webPublicationDate,
        mainImage: articleMainImage(content).andThen(parseImage),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content.fields.commentable,
        tags: content.tags,
    })

const articleFieldsWithBody = (docParser: DocParser, content: Content): ArticleFieldsWithBody =>
    ({
        ...articleFields(docParser, content),
        body: parseElements(docParser)(content.blocks.body[0].elements),
    });

const fromCapi = (docParser: DocParser) => (content: Content): Article => {
    switch (content.type) {
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
                    starRating: content.fields.starRating,
                    ...articleFieldsWithBody(docParser, content),
                };

            } else if (isAnalysis(content)) {
                return { layout: Layout.Analysis, ...articleFieldsWithBody(docParser, content) };
            }

            return { layout: Layout.Standard, ...articleFieldsWithBody(docParser, content) };

        case 'liveblog':
            return {
                layout: Layout.Liveblog,
                blocks: parseBlocks(docParser)(content.blocks.body),
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
