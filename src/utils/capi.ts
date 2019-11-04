// ----- Imports ----- //

import { Result, Ok, Err } from "../types/Result";
import { Contributor, Capi } from 'types/Capi';


// ----- Functions ----- //

const isFeature = (tags: Array<{ id: string }>): boolean =>
    tags.some(tag => tag.id === 'tone/features');

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

// ----- Exports ----- //

export {
    isFeature,
    parseCapi,
    isSingleContributor,
    capiEndpoint
};
