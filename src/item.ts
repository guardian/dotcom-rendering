// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { IContent as Content } from 'mapiThriftModels/Content';
import { IBlockElement as BlockElement } from 'mapiThriftModels/BlockElement';
import { ITag as Tag } from 'mapiThriftModels/Tag';
import { articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable, None, Some } from 'types/option';
import { Err, Ok, Result } from 'types/result';
import {
    IBlock as Block,
    ICapiDateTime as CapiDateTime,
    ElementType,
    IElement as Element,
    AssetType,
    IAsset as Asset,
} from 'mapiThriftModels';
import {logger} from "logger";


// ----- Item Type ----- //

const enum Design {
    Article,
    Media,
    Review,
    Analysis,
    Comment,
    Feature,
    Live,
    SpecialReport, // Not used?
    Recipe,
    MatchReport,
    Interview,
    GuardianView,
    GuardianLabs, // Not used?
    Quiz,
    AdvertisementFeature,
}

const enum Display {
    Standard,
    Immersive,
    Showcase,
}

const enum ElementKind {
    Text,
    Image,
    Pullquote,
    Interactive,
    RichLink,
    Tweet,
}

interface Format {
    pillar: Pillar;
    design: Design;
    display: Display;
}

interface Fields extends Format {
    headline: string;
    standfirst: Option<DocumentFragment>;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    publishDate: Option<Date>;
    mainImage: Option<Image>;
    contributors: Tag[];
    series: Tag;
    commentable: boolean;
    tags: Tag[];
}

type Image = {
    kind: ElementKind.Image;
    alt: string;
    caption: DocumentFragment;
    captionString: string;
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

type Body =
    Result<string, BodyElement>[];

type LiveBlock = {
    id: string;
    isKeyEvent: boolean;
    title: string;
    firstPublished: Option<Date>;
    lastModified: Option<Date>;
    body: Body;
}

interface Liveblog extends Fields {
    design: Design.Live;
    blocks: LiveBlock[];
}

interface Review extends Fields {
    design: Design.Review;
    body: Body;
    starRating: number;
}

interface Comment extends Fields {
    design: Design.Comment;
    body: Body;
}

// Catch-all for other Designs for now. As coverage of Designs increases,
// this will likely be split out into each Design type.
interface Standard extends Fields {
    design: Exclude<Design, Design.Live | Design.Review | Design.Comment>;
    body: Body;
}

type Item
    = Liveblog
    | Review
    | Comment
    | Standard
    ;


// ----- Convenience Types ----- //

type DocParser = (html: string) => DocumentFragment;

type ItemFields =
    Omit<Fields, 'design'>;

type ItemFieldsWithBody =
    ItemFields & { body: Body };


// ----- Functions ----- //

const tweetContent = (tweetId: string, doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet with id: ${tweetId}`);
}

const parseImage = (docParser: DocParser) => (element: BlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
    const { alt = "", caption = "", displayCredit = false, credit = "" } = element.imageTypeData ?? {};
    const fullCaption = displayCredit ? `${caption} ${credit}` : caption;
    const parsedCaption = docParser(fullCaption);

    return fromNullable(masterAsset).andThen(asset => {
        if (!asset?.file || !asset?.typeData?.width || !asset?.typeData?.height) {
            return new None();
        }

        return new Some({
            kind: ElementKind.Image,
            alt,
            caption: parsedCaption,
            credit,
            file: asset.file,
            width: asset.typeData.width,
            height: asset.typeData.height,
            captionString: caption
        });
    });
}

const parseElement =
    (docParser: DocParser) => (element: BlockElement): Result<string, BodyElement> => {
    switch (element.type) {
        case ElementType.TEXT:
            const html = element?.textTypeData?.html;
            if (!html) {
                return new Err('No html field on textTypeData')
            }
            return new Ok({ kind: ElementKind.Text, doc: docParser(html) });

        case ElementType.IMAGE:
            return parseImage(docParser)(element)
                .fmap<Result<string, Image>>(image => new Ok(image))
                .withDefault(new Err('I couldn\'t find a master asset'));

        case ElementType.PULLQUOTE:
            const { html: quote, attribution } = element.pullquoteTypeData ?? {};
            if (!quote) {
                return new Err('No quote field on pullquoteTypeData')
            }
            return new Ok({
                kind: ElementKind.Pullquote,
                quote,
                attribution: fromNullable(attribution),
            });

        case ElementType.INTERACTIVE:
            const { iframeUrl } = element.interactiveTypeData ?? {};
            if (!iframeUrl) {
                return new Err('No iframeUrl field on interactiveTypeData')
            }
            return new Ok({ kind: ElementKind.Interactive, url: iframeUrl });

        case ElementType.RICH_LINK:
            const { url, linkText } = element.richLinkTypeData ?? {};
            if (!url) {
                return new Err('No "url" field on richLinkTypeData');
            } else if (!linkText) {
                return new Err('No "linkText" field on richLinkTypeData');
            }
            return new Ok({ kind: ElementKind.RichLink, url, linkText });

        case ElementType.TWEET:
            const { id, html: h } = element.tweetTypeData ?? {};
            if (!id) {
                return new Err('No "id" field on tweetTypeData')
            } else if (!h) {
                return new Err('No "html" field on tweetTypeData')
            }
            return tweetContent(id, docParser(h))
                .fmap(content => ({ kind: ElementKind.Tweet, content }));

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

type Elements = BlockElement[] | undefined;

const parseElements =
    (docParser: DocParser) => (elements: Elements): Result<string, BodyElement>[] => {
        if (!elements) {
            return [new Err('No body elements available')];
        }
        return elements.map(parseElement(docParser));
    }

const capiDateTimeToDate = (date: CapiDateTime | undefined): Option<Date> => {
    // Thrift definitions define some dates as CapiDateTime but CAPI returns strings
    try {
        if (date) {
            return new Some(new Date(date.iso8601));
        }

        return new None();
    } catch(e) {
        logger.error("Unable to convert date from CAPI", e);
        return new None();
    }
}

const parseBlock = (docParser: DocParser) => (block: Block): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block?.attributes?.keyEvent ?? false,
        title: block?.title ?? "",
        firstPublished: capiDateTimeToDate(block?.firstPublishedDate),
        lastModified: capiDateTimeToDate(block?.lastModifiedDate),
        body: parseElements(docParser)(block.elements),
    })

const parseBlocks = (docParser: DocParser) => (blocks: Block[]): LiveBlock[] =>
    blocks.map(parseBlock(docParser));

// The main image for the page is meant to be shown as showcase.
function isShowcaseImage(content: Content): boolean {
    const mainMedia = content.blocks?.main?.elements[0];

    return mainMedia?.imageTypeData?.role === 'showcase';
}

// The main media for the page is an embed.
const isMainEmbed = (elem: Element): boolean =>
    elem.relation === 'main' && elem.type === ElementType.EMBED;

// The first embed asset is meant to be shown as showcase.
const hasShowcaseAsset = (assets: Asset[]): boolean  =>
    assets.find(asset => asset.type === AssetType.EMBED)?.typeData?.role === 'showcase';

// There is an embed element that is both the main media for the page,
// and is meant to be displayed as showcase.
const isShowcaseEmbed = (content: Content): boolean =>
    content.elements?.some(elem => isMainEmbed(elem) && hasShowcaseAsset(elem.assets)) ?? false;

function getDisplay(content: Content): Display {

    if (content.fields?.displayHint === 'immersive') {
        return Display.Immersive;
    // This is meant to replicate the current logic in frontend:
    // https://github.com/guardian/frontend/blob/88cfa609c73545085c3e5f3921631ec344a3eb83/common/app/model/meta.scala#L586
    } else if (isShowcaseImage(content) || isShowcaseEmbed(content)) {
        return Display.Showcase;
    }

    return Display.Standard;

}

const itemFields = (docParser: DocParser, content: Content): ItemFields =>
    ({
        pillar: pillarFromString(content?.pillarId),
        display: getDisplay(content),
        headline: content?.fields?.headline ?? "",
        standfirst: fromNullable(content?.fields?.standfirst).fmap(docParser),
        byline: content?.fields?.byline ?? "",
        bylineHtml: fromNullable(content?.fields?.bylineHtml).fmap(docParser),
        publishDate: capiDateTimeToDate(content.webPublicationDate),
        mainImage: articleMainImage(content).andThen(parseImage(docParser)),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content?.fields?.commentable ?? false,
        tags: content.tags,
    })

const itemFieldsWithBody = (docParser: DocParser, content: Content): ItemFieldsWithBody => {
    const body = content?.blocks?.body ?? [];
    const elements = body[0]?.elements;
    return ({
        ...itemFields(docParser, content),
        body: elements !== undefined ? parseElements(docParser)(elements): [],
    });
}

const hasSomeTag = (tagIds: string[]) => (tags: Tag[]): boolean =>
    tags.some(tag => tagIds.includes(tag.id));

const hasTag = (tagId: string) => (tags: Tag[]): boolean =>
    tags.some(tag => tag.id === tagId);

const isMedia =
    hasSomeTag(['type/audio', 'type/video', 'type/gallery']);

const isReview =
    hasSomeTag(['tone/reviews', 'tone/livereview', 'tone/albumreview']);

const isAnalysis =
    hasTag('tone/analysis');

const isComment =
    hasSomeTag(['tone/comment', 'tone/letters']);

const isFeature =
    hasTag('tone/features');

const isLive =
    hasTag('tone/minutebyminute');

const isRecipe =
    hasTag('tone/recipes');

const isMatchReport =
    hasTag('tone/matchreports');

const isInterview =
    hasTag('tone/interview');

const isGuardianView =
    hasTag('tone/editorials');

const isQuiz =
    hasTag('tone/quizzes');

const isAdvertisementFeature =
    hasTag('tone/advertisement-features');

const fromCapi = (docParser: DocParser) => (content: Content): Item => {
    const { tags, fields } = content;

    // These checks aim for parity with the CAPI Scala client:
    // https://github.com/guardian/content-api-scala-client/blob/9e249bcef47cc048da483b3453c10dd7d2e9565d/client/src/main/scala/com.gu.contentapi.client/utils/CapiModelEnrichment.scala
    if (isMedia(tags)) {
        return {
            design: Design.Media,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (fields?.starRating !== undefined && isReview(tags)) {
        return {
            design: Design.Review,
            starRating: fields?.starRating,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isAnalysis(tags)) {
        return {
            design: Design.Analysis,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isComment(tags)) {
        return {
            design: Design.Comment,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isFeature(tags)) {
        return {
            design: Design.Feature,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isLive(tags)) {
        const body = content?.blocks?.body ?? [];

        return {
            design: Design.Live,
            blocks: parseBlocks(docParser)(body),
            ...itemFields(docParser, content),
        };
    } else if (isRecipe(tags)) {
        return {
            design: Design.Recipe,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isMatchReport(tags)) {
        return {
            design: Design.MatchReport,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isInterview(tags)) {
        return {
            design: Design.Interview,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isGuardianView(tags)) {
        return {
            design: Design.GuardianView,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isQuiz(tags)) {
        return {
            design: Design.Quiz,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isAdvertisementFeature(tags)) {
        return {
            design: Design.AdvertisementFeature,
            ...itemFieldsWithBody(docParser, content),
        };
    }

    return {
        design: Design.Article,
        ...itemFieldsWithBody(docParser, content),
    };
}


// ----- Exports ----- //

export {
    Design,
    Display,
    Item,
    Comment,
    Liveblog,
    Review,
    Standard,
    LiveBlock,
    ElementKind,
    BodyElement,
    Image,
    fromCapi,
};
