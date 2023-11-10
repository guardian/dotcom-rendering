import { ArticleDesign } from '@guardian/libs';

// # RenderingRequest

/**
 * All requests to the DCR server are captured in this type. At the moment
 * this can be broken down into two categories of request:
 * 
 * - {@linkcode Page}: requests for HTML documents.
 * - {@linkcode Data}: client-side requests for data to augment a page.
 */
type RenderingRequest = RenderingRequestFields & (Page | Data);

/**
 * Fields that are common to all requests to DCR. For example, a request id.
 */
type RenderingRequestFields = {
    id: string;
}

// ## Page

/**
 * Pages are rendering requests that result in an HTML document being returned.
 * At the moment there are three categories of pages we render:
 * 
 * - {@linkcode Article}
 * - {@linkcode Front}
 * - {@linkcode EditorialNewsletters}
 * 
 * There may be more in future, which can be added to this type.
 */
type Page = PageFields & (Article | Front | EditorialNewsletters)

/**
 * Fields that are common to all HTML pages in DCR. For example, a title.
 */
type PageFields = {
    title: string;
}

// ### Article

/**
 * Article fields vary based on two factors (discriminants):
 * 
 * - Platform, represented in the `kind` field, and broken into four types:
 * {@linkcode WebArticle}, {@linkcode AppsArticle},
 * {@linkcode EditionsArticle}, {@linkcode AMPArticle}.
 * - Design, represented in the `design` field of type {@linkcode ArticleDesign}
 * , and broken into several types including: {@linkcode StandardArticle},
 * {@linkcode LiveblogArticle} and {@linkcode ReviewArticle}.
 * 
 * For example, web articles have a `nav`, review articles have a `starRating`
 * and so on.
 */
type Article =
    ArticleFields &
    (WebArticle | AppsArticle | EditionsArticle | AMPArticle) &
    (StandardArticle | LiveblogArticle | ReviewArticle);

/**
 * Fields that only an article rendered on dotcom will have. For example,
 * information about the nav, which doesn't exist on apps.
 */
type WebArticle = {
    kind: 'WebArticle';
    nav: string[];
}

/**
 * Fields that only an article rendered on apps will have. For example,
 * information about notifications, which only exist on apps.
 */
type AppsArticle = {
    kind: 'AppsArticle';
    followTopic: string;
}

/**
 * Fields that only an article rendered on Editions will have.
 */
type EditionsArticle = {
    kind: 'EditionsArticle';
}

/**
 * Fields that only an article rendered on AMP will have.
 */
type AMPArticle = {
    kind: 'AMPArticle';
}

/**
 * Fields that only an {@linkcode ArticleDesign.Standard} article will have.
 * For example, a single body block, which liveblogs and deadblogs don't tend
 * to have.
 */
type StandardArticle = {
    design: ArticleDesign.Standard;
    body: string[];
}

/**
 * Fields that only an {@linkcode ArticleDesign.LiveBlog} article will have.
 * For example, multiple blocks, which most other article designs don't have.
 */
type LiveblogArticle = {
    design: ArticleDesign.LiveBlog;
    blocks: LiveBlock[];
}

type LiveBlock = {
    body: string[];
}

/**
 * Fields that only an {@linkcode ArticleDesign.Review} article will have.
 * For example, a star rating.
 */
type ReviewArticle = {
    design: ArticleDesign.Review;
    starRating: 0 | 1 | 2 | 3 | 4 | 5;
    body: string[];
}

/**
 * Fields that all articles have, regardless of platform or design. For example,
 * a headline.
 */
type ArticleFields = {
    headline: string;
}

// ### Front

/**
 * Fronts are a kind of page, but have a different structure to articles. At
 * the moment they're broken into two categories:
 * 
 * - {@linkcode StandardFront}
 * - {@linkcode TagFront}
 */
type Front = FrontFields & (StandardFront | TagFront);

/**
 * Fields that only a standard front will have.
 */
type StandardFront = {
    kind: 'StandardFront';
}

/**
 * Fields that only a tag front will have.
 */
type TagFront = {
    kind: 'TagFront';
}

/**
 * Fields that all fronts have.
 */
type FrontFields = {}

// ### EditorialNewsletters

/**
 * Editorial newsletters pages are different from fronts and articles, and
 * therefore contain different data. There's only one version of them, and
 * they only exist on web at the moment, so they're not broken up into
 * sub-types.
 * 
 * Other pages we want to render in the future, that are neither articles nor
 * fronts, can be added in the same way.
 */
type EditorialNewsletters = {
    kind: 'EditorialNewsletters';
    newsletters: string[];
}

// ## Data

/**
 * Data requests are typically client-side requests for data to augment a page.
 * For example:
 * 
 * - {@linkcode Blocks}: client-side request for new blocks to insert on a
 * liveblog.
 * - {@linkcode RichLink}: client-side request for data used to augment rich
 * links that appear in articles.
 */
type Data = DataFields & (Blocks | RichLink);

/**
 * Fields that only a blocks request will have. For example, a count of new
 * blocks.
 */
type Blocks = {
    kind: 'Blocks';
    numBlocks: number;
}

/**
 * Fields that only a rich link request will have. For example, a link to the
 * article the rich link is pointing to.
 */
type RichLink = {
    kind: 'RichLink';
    articleUrl: string;
}

/**
 * Fields that are common to all data requests.
 */
type DataFields = {}

// ## Usage

/**
 * Renders different kinds of articles. In this function, although
 * {@linkcode Article} is a kind of {@linkcode RenderingRequest}, it's a subset
 * that only includes article data. Therefore it's not possible to access fields
 * that belong to other kinds of rendering request, like fronts for example.
 * 
 * @param article A subset of {@linkcode RenderingRequest} that only includes
 * articles, via the {@linkcode Article} type.
 */
const renderArticle = (article: Article): string => {
    switch (article.design) {
        case ArticleDesign.LiveBlog:
            // Blocks only exist on liveblogs.
            return `liveblog with ${article.blocks.length} blocks`;
        case ArticleDesign.Standard:
            // The body exists on several articles, including standard design.
            return `standard with ${article.body.length} elements`;
        case ArticleDesign.Review:
            // Star ratings only exist on reviews.
            return `review with ${article.starRating} stars`;
    }
}

/**
 * Example of a way to render different kinds of requests. The kind of request
 * can be narrowed via the `kind` field. In reality much of this would probably
 * be handled by express routing. The top level `RenderingRequest` type is
 * likely mostly useful for functionality we want across all kinds of requests,
 * such as logging and error handling.
 */
const render = (request: RenderingRequest): string => {
    // This field exists for all requests.
    console.log(`Rendering: ${request.id}`);

    switch (request.kind) {
        case 'WebArticle':
            // The nav only exists for web articles.
            return `
                Render web article with headline ${request.headline}, and nav
                ${request.nav}, and content ${renderArticle(request)}
            `;
        case 'AppsArticle':
        case 'EditionsArticle':
        case 'AMPArticle':
            // These fields exist for all articles.
            return `
                Render article with title ${request.title}, and headline
                ${request.headline}, and content ${renderArticle(request)}
            `;
        case 'StandardFront':
        case 'TagFront':
            // Fronts are a kind of page, and all pages have titles.
            return `Render front with title: ${request.title}`;
        case 'EditorialNewsletters':
            // Only editorial newsletters pages have a list of newsletters.
            return `Render ${request.newsletters.length} newsletters`;
        case 'RichLink':
            // Only rich link requests have another article URL to link to.
            return `Render rich link for ${request.articleUrl}`;
        case 'Blocks':
            // Only blocks requests have a number of blocks to insert.
            return `Render ${request.numBlocks} blocks`;
    }
}

export {
    render,
}
