// ----- Imports ----- //

import ReactDOM from 'react-dom';
import { createElement as h } from 'react';
import { Format, Design, Display, Pillar } from '@guardian/types/Format';

import setup from 'client/setup';
import { fromSerialisable } from 'liveBlock';
import { parse } from 'client/parser';
import LiveblogBody from 'components/liveblog/body';
import { withDefault } from 'types/option';
import { pipe3 } from 'lib';
import { toOption } from 'types/result';


// ----- Setup ----- //

const domParser = new DOMParser();

const format: Format = {
    design: Design.Live,
    display: Display.Standard,
    pillar: Pillar.News,
}


// ----- Functions ----- //

const docParser = (html: string): DocumentFragment =>
    pipe3(
        html,
        parse(domParser),
        toOption,
        withDefault(new DocumentFragment()),
    );

const deserialise = fromSerialisable(docParser);


// ----- Run ----- //

// Set up interactives, Twitter embeds etc.
setup();

// Load the initial group of blocks.
fetch(`${window.location}/live-blocks`)
    .then(res => res.json())
    .then(({ newBlocks }) => {
        const blocks = deserialise(newBlocks);

        ReactDOM.hydrate(
            h(LiveblogBody, { format, blocks, totalBodyBlocks: 20 }),
            document.getElementById('blocks'),
        );
    })
    .catch(err => console.warn(`I couldn't load any live blocks because: ${err}`));
