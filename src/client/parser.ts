// ----- Imports ----- //

import { Result, err, ok } from 'types/result';


// ----- Functions ----- //

const parse = (domParser: DOMParser) => (s: string): Result<string, DocumentFragment> => {

    try {
        const frag = new DocumentFragment();
        const docNodes = domParser.parseFromString(s, 'text/html').body.childNodes;

        Array.from(docNodes).forEach(node => frag.appendChild(node));
        return ok(frag);
    } catch (e) {
        return err(`I wasn't able to parse the string into a DocumentFragment because: ${e}`);
    }

}


// ----- Exports ----- //

export {
    parse,
}
