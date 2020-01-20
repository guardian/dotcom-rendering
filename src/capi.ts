// ----- Imports ----- //

import { Result, Ok, Err } from 'types/result';
import { Content} from 'mapiThriftModels/Content';
import { Tag } from 'mapiThriftModels/Tag';
import { BlockElement} from 'mapiThriftModels/BlockElement';
import { ElementType } from 'mapiThriftModels/ElementType';

import { Option, fromNullable, None, Some } from 'types/option';


// ----- Parsing ----- //

const enum ErrorStatus {
    NotFound,
    Unknown,
}

type Error = {
    status: ErrorStatus;
    message: string;
}

interface ErrorResponse {
    response: {
        message: string;
    };
}

interface ErrorMessage {
    message: string;
}

// Sometimes CAPI returns an error message at the top level of the returned JSON,
// sometimes it returns that message nested inside a `response` object.
type CapiError = ErrorResponse | ErrorMessage;

const isErrorResponse = (error: CapiError): error is ErrorResponse => 'response' in error;
const isErrorMessage = (error: CapiError): error is ErrorMessage => 'message' in error;

function extractErrorMessage(capiError: CapiError): Option<string> {
    if (isErrorResponse(capiError)) {
        return new Some(capiError.response.message);
    } else if (isErrorMessage(capiError)) {
        return new Some(capiError.message);
    }

    return new None();
}

function parseCapiError(capiResponse: string): string {
    try {
        const capiError: CapiError = JSON.parse(capiResponse);

        return extractErrorMessage(capiError)
            .map(msg => `It came with this message: ${msg}`)
            .withDefault('There was no message to explain why.');
    } catch (e) {
        return `I wasn\'t able to parse the error message because: ${e}`;
    }
}

function parseContent(capiResponse: string): Result<string, Content> {
    try {
        const content = JSON.parse(capiResponse).response.content;

        if (content === undefined) {
            return new Err('I couldn\'t parse the CAPI response because the content field was missing.');
        }
        
        return new Ok(content);
    } catch (e) {
        return new Err(`I couldn't parse the CAPI response because: ${e}`);
    }
}

function getContent(status: number, path: string, responseBody: string): Result<Error, Content> {

    switch (status) {
        case 200:
            return parseContent(responseBody).mapError(message => ({
                status: ErrorStatus.Unknown,
                message,
            }));
    
        case 404:
            return new Err({
                status: ErrorStatus.NotFound,
                message: `CAPI says that it doesn't recognise this resource: ${path}`,
            });
        default:
            return new Err({
                status: ErrorStatus.Unknown,
                message: `When I tried to talk to CAPI I received a ${status}. ${parseCapiError(responseBody)}`,
            });
    }

}


// ----- Lookups ----- //

interface Series {
    webTitle?: string;
    webUrl?: string;
}

interface Contributor {
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    bylineLargeImageUrl?: string;
}

const tagsOfType = (type_: string) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === type_);

const isImmersive = (content: Content): boolean =>
    content.fields.displayHint === 'immersive';

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

const isReview = (content: Content): boolean =>
    'starRating' in content.fields;

const isAnalysis = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/analysis');

const isSingleContributor = (contributors: Contributor[]): boolean =>
    contributors.length === 1;

const articleSeries = (content: Content): Tag =>
    tagsOfType('series')(content.tags)[0];

const articleContributors = (content: Content): Tag[] =>
    tagsOfType('contributor')(content.tags);

const isImage = (elem: BlockElement): boolean =>
    elem.type === 'image';

const articleMainImage = (content: Content): Option<BlockElement> =>
    fromNullable(content.blocks.main.elements.filter(isImage)[0]);

const includesTweets = (content: Content): boolean => content.blocks.body
    .flatMap(block => block.elements.some(element => element.type === ElementType.TWEET))
    .some(Boolean)


// ----- Functions ----- //

// TODO: request less data from capi
const capiEndpoint = (articleId: string, key: string): string => {

    const params = new URLSearchParams({
      format: 'json',
      'api-key': key,
      'show-atoms': 'all',
      'show-fields': 'all',
      'show-tags': 'all',
      'show-blocks': 'all',
    })
  
    return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
  
}


// ----- Exports ----- //

export {
    Series,
    Contributor,
    ErrorStatus as CapiError,
    getContent,
    isImmersive,
    isFeature,
    isReview,
    isAnalysis,
    isSingleContributor,
    articleSeries,
    articleContributors,
    articleMainImage,
    capiEndpoint,
    includesTweets,
};
