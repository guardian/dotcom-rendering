// ----- Imports ----- //

import setup from 'client/setup';
import { fromCapiLiveBlog, getFormat } from 'item';
import ReactDOM from 'react-dom';
import LiveblogBody from 'components/liveblog/body';
import { createElement as h } from 'react';
import { Content } from 'mapiThriftModels';
import { parse } from './parser';


// ----- Run ----- //

declare global {
    interface Window {
        __INITIAL__DATA__: Content;
    }
}

setup();

const browserParser = (html: string): DocumentFragment =>
    parse(new DOMParser())(html)
        .toOption()
        .withDefault(new DocumentFragment())


try {
    const hydrationProps = JSON.parse(document.getElementById('hydrationProps')?.textContent ?? "");

    if (hydrationProps) {
        const item = fromCapiLiveBlog({
            docParser: browserParser,
            salt: 'mockSalt',
        })(hydrationProps);
        const { blocks, totalBodyBlocks } = item;

        ReactDOM.hydrate(
            h(LiveblogBody, { format: getFormat(item), blocks, totalBodyBlocks }),
            document.querySelector('#blocks'),
        );
    }
} catch (e) {
    console.error(`Unable to hydrate LiveblogBody: ${e}`)
}