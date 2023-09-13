// # RenderingRequest

/**
 * All requests to the DCR server are captured in this type.
 */
type RenderingRequest = RenderingRequestFields & (Page | Data);

/**
 * Fields that are common to all requests to DCR. For example, a request id.
 */
type RenderingRequestFields = {
    id: string;
}

const renderArticle = (article: Article): string => {
    switch (article.design) {
        case 'Liveblog':
            return `liveblog with ${article.blocks.length} blocks`;
        case 'Standard':
            return `standard with ${article.body.length} elements`;
        case 'Review':
            return `review with ${article.starRating} stars`;
    }
}

const render = (request: RenderingRequest): string => {
    console.log(`Rendering: ${request.id}`);

    switch (request.kind) {
        case 'WebArticle':
            return `Render web article with headline ${request.headline}, and nav ${request.nav}, and content ${renderArticle(request)}`;
        case 'AppsArticle':
        case 'EditionsArticle':
        case 'AMPArticle':
            return `Render article with title ${request.title}, and headline ${request.headline}, and content ${renderArticle(request)}`;
        case 'StandardFront':
        case 'TagFront':
            return `Render front with title: ${request.title}`;
        case 'EditorialNewsletters':
            return `Render ${request.newsletters.length} newsletters`;
        case 'RichLink':
            return `Render rich link for ${request.articleId}, on ${request.parentArticle}`;
        case 'Blocks':
            return `Render ${request.numBlocks} on ${request.articleId}`;
    }
}

// ## Page

/**
 * Pages are rendering requests that result in an HTML document being returned.
 */
type Page = PageFields & (Article | Front | EditorialNewsletters)

type PageFields = {
    title: string;
}

// ### Article

type Article =
    ArticleFields &
    (WebArticle | AppsArticle | EditionsArticle | AMPArticle) &
    (StandardArticle | LiveblogArticle | ReviewArticle);

/**
 * Features that only an article rendered on dotcom will have. For example,
 * information about the nav, which doesn't exist on apps.
 */
type WebArticle = {
    kind: 'WebArticle';
    nav: string[];
}

/**
 * Features that only an article rendered on apps will have. For example,
 * information about notifications, which only exist on apps.
 */
type AppsArticle = {
    kind: 'AppsArticle';
    followTopic: string;
}

type EditionsArticle = {
    kind: 'EditionsArticle';
}

type AMPArticle = {
    kind: 'AMPArticle';
}

type StandardArticle = {
    design: 'Standard';
    body: string[];
}

type LiveBlock = {
    body: string[];
}

type LiveblogArticle = {
    design: 'Liveblog';
    blocks: LiveBlock[];
}

type ReviewArticle = {
    design: 'Review';
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

type Front = FrontFields & (StandardFront | TagFront);

type StandardFront = {
    kind: 'StandardFront';
}

type TagFront = {
    kind: 'TagFront';
}

/**
 * Fields that all fronts have, regardless of platform or design.
 */
type FrontFields = {
    
}

// ### EditorialNewsletters

type EditorialNewsletters = {
    kind: 'EditorialNewsletters';
    newsletters: string[];
}

// ## Data

/**
 * Data requests are typically client-side requests for data to augment a page.
 * For example, rich links and liveblog blocks.
 */
type Data = DataFields & (Blocks | RichLink);

type Blocks = {
    kind: 'Blocks';
    numBlocks: number;
    articleId: string;
}

type RichLink = {
    kind: 'RichLink';
    articleId: string;
    parentArticle: string;
}

type DataFields = {

}
