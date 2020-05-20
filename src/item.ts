// ----- Imports ----- //

import { pillarFromString } from 'pillarStyles';
import { IContent as Content } from 'mapiThriftModels/Content';
import { ITag as Tag } from 'mapiThriftModels/Tag';
import { articleMainImage, articleContributors, articleSeries, isPhotoEssay, isImmersive, isInteractive, maybeCapiDate } from 'capi';
import { Option, fromNullable } from 'types/option';
import {
    ElementType,
    IElement as Element,
    AssetType,
    IAsset as Asset,
} from 'mapiThriftModels';
import { Format, Pillar, Design, Display } from 'format';
import { Image as ImageData, parseImage } from 'image';
import { LiveBlock, parseLiveBlocks } from 'liveBlock';
import { Body, parseElements } from 'bodyElement';


// ----- Item Type ----- //

interface Fields extends Format {
    headline: string;
    standfirst: Option<DocumentFragment>;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    publishDate: Option<Date>;
    mainImage: Option<ImageData>;
    contributors: Tag[];
    series: Option<Tag>;
    commentable: boolean;
    tags: Tag[];
    shouldHideReaderRevenue: boolean;
}

interface Liveblog extends Fields {
    design: Design.Live;
    blocks: LiveBlock[];
    totalBodyBlocks: number;
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

interface Interactive extends Fields {
    design: Design.Interactive;
    body: Body;
}

// Catch-all for other Designs for now. As coverage of Designs increases,
// this will likely be split out into each Design type.
interface Standard extends Fields {
    design: Exclude<Design, Design.Live | Design.Review | Design.Comment>;
    body: Body;
    shouldHideReaderRevenue: boolean;
}

type Item
    = Liveblog
    | Review
    | Comment
    | Standard
    | Interactive
    ;


// ----- Convenience Types ----- //

type DocParser = (html: string) => DocumentFragment;

type ItemFields =
    Omit<Fields, 'design'>;

type ItemFieldsWithBody =
    ItemFields & { body: Body };


// ----- Functions ----- //

const getFormat = (item: Item): Format =>
    ({ design: item.design, display: item.display, pillar: item.pillar });

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

    if (isImmersive(content) || isPhotoEssay(content)) {
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
        publishDate: maybeCapiDate(content.webPublicationDate),
        mainImage: articleMainImage(content).andThen(parseImage(docParser)),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content?.fields?.commentable ?? false,
        tags: content.tags,
        shouldHideReaderRevenue: content.fields?.shouldHideReaderRevenue ?? false
    })

const itemFieldsWithBody = (docParser: DocParser, content: Content): ItemFieldsWithBody => {
    const body = content?.blocks?.body ?? [];
    const atoms = content?.atoms;
    const elements = body[0]?.elements;
    return ({
        ...itemFields(docParser, content),
        body: elements !== undefined ? parseElements(docParser, atoms)(elements): [],
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

const fromCapiLiveBlog = (docParser: DocParser) => (content: Content): Liveblog => {
    const body = content?.blocks?.body?.slice(0, 7) ?? [];

    return {
        design: Design.Live,
        blocks: parseLiveBlocks(docParser)(body),
        totalBodyBlocks: content.blocks?.totalBodyBlocks ?? body.length,
        ...itemFields(docParser, content),
    };
}

const fromCapi = (docParser: DocParser) => (content: Content): Item => {
    const { tags, fields } = content;

    // These checks aim for parity with the CAPI Scala client:
    // https://github.com/guardian/content-api-scala-client/blob/9e249bcef47cc048da483b3453c10dd7d2e9565d/client/src/main/scala/com.gu.contentapi.client/utils/CapiModelEnrichment.scala
    if (isInteractive(content)) {
        return {
            design: Design.Interactive,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isMedia(tags)) {
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
        const item = itemFieldsWithBody(docParser, content);
        return {
            design: Design.Comment,
            ...item,
            pillar: item.pillar === Pillar.News ? Pillar.Opinion : item.pillar
        };
    } else if (isFeature(tags)) {
        return {
            design: Design.Feature,
            ...itemFieldsWithBody(docParser, content),
        };
    } else if (isLive(tags)) {
        return fromCapiLiveBlog(docParser)(content);
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
    Item,
    Comment,
    Liveblog,
    Review,
    Standard,
    fromCapi,
    fromCapiLiveBlog,
    getFormat,
};
