// ----- Imports ----- //

import { IContent as Content} from 'mapiThriftModels/Content';
import { ITag as Tag } from 'mapiThriftModels/Tag';
import { IBlockElement} from 'mapiThriftModels/BlockElement';
import { ElementType } from 'mapiThriftModels/ElementType';
import { Option, fromNullable } from 'types/option';
import { TagType, ContentType, ICapiDateTime as CapiDateTime } from 'mapiThriftModels';
import { fromString as dateFromString } from 'date';


// ----- Lookups ----- //

interface Series {
    webTitle?: string;
    webUrl?: string;
}

const tagsOfType = (tagType: TagType) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === tagType);

const isImmersive = (content: Content): boolean =>
    content?.fields?.displayHint === 'immersive';

const isInteractive = (content: Content): boolean =>
    content.type === ContentType.INTERACTIVE;

const isPhotoEssay = (content: Content): boolean =>
    content?.fields?.displayHint === 'photoEssay';

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

const isReview = (content: Content): boolean =>
    [0,1,2,3,4,5].includes(content?.fields?.starRating ?? -1)

const isAnalysis = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/analysis');

const articleSeries = (content: Content): Option<Tag> =>
    fromNullable(tagsOfType(TagType.SERIES)(content.tags)[0]);

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
    // If you need a new field here, MAPI probably also needs updating
    const fields = [
        'headline',
        'standfirst',
        'bylineHtml',
        'firstPublicationDate',
        'shouldHideAdverts',
        'shouldHideReaderRevenue',
        'displayHint'
    ];

    const params = new URLSearchParams({
      format: 'thrift',
      'api-key': key,
      'show-atoms': 'all',
      'show-fields': fields.join(','),
      'show-tags': 'all',
      'show-blocks': 'all',
      'show-elements': 'all',
    })
  
    return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
}

const capiDateTimeToDate = (date: CapiDateTime): Option<Date> =>
    // Thrift definitions define some dates as CapiDateTime but CAPI returns strings
    dateFromString(date.iso8601);

const maybeCapiDate = (date: CapiDateTime | undefined): Option<Date> =>
    fromNullable(date).andThen(capiDateTimeToDate);


// ----- Exports ----- //

export {
    Series,
    isPhotoEssay,
    isImmersive,
    isInteractive,
    isFeature,
    isReview,
    isAnalysis,
    articleSeries,
    articleContributors,
    articleMainImage,
    capiEndpoint,
    includesTweets,
    maybeCapiDate,
};
