// ----- Imports ----- //

import { Result, Err, Ok } from 'types/result';


// ----- Functions ----- //

const parse = (domParser: DOMParser) => (s: string): Result<string, DocumentFragment> => {

    try {
        const frag = new DocumentFragment();
        const docNodes = domParser.parseFromString(s, 'text/html').body.childNodes;

        Array.from(docNodes).forEach(node => frag.appendChild(node));
        return new Ok(frag);
    } catch (e) {
        return new Err(`I wasn't able to parse the string into a DocumentFragment because: ${e}`);
    }

}


// ----- Exports ----- //

export {
    parse,
}
