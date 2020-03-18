// ----- Imports ----- //


import setup from 'client/setup';
import { fromCapiLiveBlog } from 'item';
import ReactDOM from 'react-dom';
import LiveblogBody from 'components/liveblog/body';
import { createElement as h } from 'react';
import { Content } from 'mapiThriftModels';
import { parse } from './parser';
import { ImageMappings } from 'components/shared/page';

// ----- Run ----- //

declare global {
    interface Window {
        __INITIAL__DATA__: Content & {
            imageMappings: ImageMappings;
        };
    }
}

setup();

const browserParser = (html: string): DocumentFragment =>
    parse(new DOMParser())(html)
        .toOption()
        .withDefault(new DocumentFragment())

const {
    pillar,
    blocks,
    totalBodyBlocks
} = fromCapiLiveBlog(browserParser)(window.__INITIAL__DATA__);

const { imageMappings } = window.__INITIAL__DATA__;

ReactDOM.hydrate(h(LiveblogBody, { pillar, blocks, imageMappings, totalBodyBlocks }), document.querySelector('#blocks'))