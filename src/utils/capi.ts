// ----- Imports ----- //

import { Result, Ok, Err } from "../types/Result";
import { Contributor, Capi } from 'types/Capi';
import { Content, Tag, BlockElement } from 'types/capi-thrift-models';
import { Option, fromNullable } from 'types/Option';
import { isImage } from 'components/blocks/image';


// ----- Functions ----- //

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
function parseCapi(capiResponse: string): Result<string, Capi> {
    try {
        return new Ok(JSON.parse(capiResponse));
    } catch (_) {
        return new Err('Could not parse the CAPI response');
    }
}

const isSingleContributor = (contributors: Contributor[]): boolean =>
    contributors.length === 1;

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

const articleSeries = (content: Content): Tag =>
    content.tags.filter((tag: Tag) => tag.type === 'series')[0];

const articleContributors = (content: Content): Tag[] =>
    content.tags.filter((tag: Tag) => tag.type === 'contributor');

const articleMainImage = (content: Content): Option<BlockElement> =>
    fromNullable(content.blocks.main.elements.filter(isImage)[0]);


// ----- Exports ----- //

export {
    isFeature,
    parseCapi,
    isSingleContributor,
    capiEndpoint,
    articleSeries,
    articleContributors,
    articleMainImage,
};
