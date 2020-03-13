// ----- Imports ----- //

import setup from 'client/setup';
import { fromCapiLiveBlog } from 'item';
import ReactDOM from 'react-dom';
import LiveblogBody from 'components/liveblog/body';
import { createElement as h } from 'react';
import { Content } from 'mapiThriftModels';
import { parse } from './parser';

// ----- Run ----- //

declare global {
    interface Window {
        __INITIAL__DATA__: Content & {
            imageSalt: string;
        };
    }
}

setup();

const browserParser = (string: string): DocumentFragment =>
    parse(new DOMParser())(string)
        .toOption()
        .fmap(frag => frag)
        .withDefault(new DocumentFragment())

const {
    pillar,
    blocks,
    totalBodyBlocks
} = fromCapiLiveBlog(browserParser)(window.__INITIAL__DATA__);
const { imageSalt } = window.__INITIAL__DATA__;
ReactDOM.hydrate(h(LiveblogBody, { pillar, blocks, imageSalt, totalBodyBlocks }), document.querySelector('#blocks'))