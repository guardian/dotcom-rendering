// ----- Imports ----- //

import { Result, Ok, Err } from "../types/Result";
import { Contributor } from 'types/Capi';


// ----- Functions ----- //

const isFeature = (tags: Array<{ id: string }>): boolean =>
    tags.some(tag => tag.id === 'tone/features');

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
function parseCapi(capiResponse: string): Result<string, any> {
    try {
        return new Ok(JSON.parse(capiResponse));
    } catch (_) {
        return new Err('Could not parse the CAPI response');
    }
}

const isSingleContributor = (contributors: Contributor[]): boolean =>
    contributors.length === 1;


// ----- Exports ----- //

export {
    isFeature,
    parseCapi,
    isSingleContributor,
};
