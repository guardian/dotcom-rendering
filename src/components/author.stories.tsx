// ----- Imports ----- //

import React, { FC } from 'react';
import { text, withKnobs, select } from '@storybook/addon-knobs';

import Author from './author';
import { Item, Design, Display } from 'item';
import { Pillar } from 'pillar';
import { Option, None, Some } from 'types/option';
import { parse } from 'client/parser';


// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const item: Item = {
    pillar: Pillar.news,
    design: Design.Article,
    display: Display.Standard,
    body: [],
    headline: 'Reclaimed lakes and giant airports: how Mexico City might have looked',
    standfirst: new None(),
    byline: '',
    bylineHtml: new None(),
    publishDate: new None(),
    mainImage: new None(),
    contributors: [],
    series: {
        id: '',
        type: 0,
        webTitle: '',
        webUrl: '',
        apiUrl: '',
        references: [],
    },
    commentable: false,
    tags: [],
    shouldHideReaderRevenue: false,
};

const profileLink = (): string =>
    text('Profile Link', 'https://theguardian.com');

const byline = (): string =>
    text('Byline', 'Jane Smith');

const mockBylineHtml = (): Option<DocumentFragment> =>
    parseByline(`<a href="${profileLink()}">${byline()}</a>`).either(
        _ => new None(),
        frag => new Some(frag),
    );

const pillarOptions = {
    News: Pillar.news,
    Opinion: Pillar.opinion,
    Sport: Pillar.sport,
    Culture: Pillar.arts,
    Lifestyle: Pillar.lifestyle,
};


// ----- Stories ----- //

const Default: FC = () =>
    <Author item={{
        ...item,
        bylineHtml: mockBylineHtml(),
        pillar: select('Pillar', pillarOptions, Pillar.opinion),
    }} />


// ----- Exports ----- //

export default {
    component: Author,
    title: 'Author',
    decorators: [ withKnobs ],
}

export {
    Default,
}
