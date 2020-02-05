// ----- Imports ----- //

import { Result, Ok, Err } from 'types/result';
import { IContent as Content} from 'mapiThriftModels/Content';
import { ITag as Tag } from 'mapiThriftModels/Tag';
import { IBlockElement} from 'mapiThriftModels/BlockElement';
import { ElementType } from 'mapiThriftModels/ElementType';
import { Option, fromNullable } from 'types/option';
import { TagType } from 'mapiThriftModels';

// ----- Parsing ----- //

const enum ErrorStatus {
    NotFound,
    Unknown,
}

type Error = {
    status: ErrorStatus;
    message: string;
}

function getContent(status: number, path: string, content: Content): Result<Error, Content> {
    switch (status) {
        case 200:
            return new Ok(content);
    
        case 404:
            return new Err({
                status: ErrorStatus.NotFound,
                message: `CAPI says that it doesn't recognise this resource: ${path}`,
            });
        default:
            return new Err({
                status: ErrorStatus.Unknown,
                message: `When I tried to talk to CAPI I received a ${status}.`,
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
    id: string;
}

const tagsOfType = (tagType: TagType) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === tagType);

const isImmersive = (content: Content): boolean =>
    content?.fields?.displayHint === 'immersive';

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

const isReview = (content: Content): boolean =>
    [0,1,2,3,4,5].includes(content?.fields?.starRating ?? -1)

const isAnalysis = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/analysis');

const isSingleContributor = (contributors: Contributor[]): boolean =>
    contributors.length === 1;

const articleSeries = (content: Content): Tag =>
    tagsOfType(TagType.SERIES)(content.tags)[0];

const articleContributors = (content: Content): Tag[] =>
    tagsOfType(TagType.CONTRIBUTOR)(content.tags);

const isImage = (elem: IBlockElement): boolean =>
    elem.type === ElementType.IMAGE;

const articleMainImage = (content: Content): Option<IBlockElement> =>
    fromNullable(content?.blocks?.main?.elements.filter(isImage)[0]);

const includesTweets = (content: Content): boolean => {
    const body = content?.blocks?.body;

    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.TWEET))
        .some(Boolean)
}


// ----- Functions ----- //

const capiEndpoint = (articleId: string, key: string): string => {

    const params = new URLSearchParams({
      format: 'thrift',
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
