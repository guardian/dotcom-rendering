// ----- Imports ----- //

import { select, withKnobs, boolean } from '@storybook/addon-knobs';
import React, { ReactElement } from 'react';

import Standfirst from './standfirst';
import { Item, Design, Display } from 'item';
import { Pillar } from 'pillar';
import { Option, None } from 'types/option';
import { parse } from 'client/parser';


// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Option<DocumentFragment> =
    parseStandfirst('<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>')
        .toOption();

const item: Item = {
    pillar: Pillar.news,
    design: Design.Article,
    display: Display.Standard,
    body: [],
    headline: 'Reclaimed lakes and giant airports: how Mexico City might have looked',
    standfirst,
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

const pillarOptions = {
    News: Pillar.news,
    Opinion: Pillar.opinion,
    Sport: Pillar.sport,
    Culture: Pillar.arts,
    Lifestyle: Pillar.lifestyle,
};


// ----- Stories ----- //

const Default = (): ReactElement =>
    <Standfirst item={{
        ...item,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.news),
    }} />

const Review = (): ReactElement =>
    <Standfirst item={{
        ...item,
        design: Design.Review,
        starRating: 4,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.arts),
    }} />

const Feature = (): ReactElement =>
    <Standfirst item={{
        ...item,
        design: Design.Feature,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.sport),
    }} />

const Comment = (): ReactElement =>
    <Standfirst item={{
        ...item,
        design: Design.Comment,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.opinion),
    }} />


// ----- Exports ----- //

export default {
    component: Standfirst,
    title: 'Standfirst',
    decorators: [ withKnobs ],
}

export {
    Default,
    Review,
    Feature,
    Comment,
}
