// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { withKnobs, boolean, radios } from '@storybook/addon-knobs';

import Headline from './headline';
import { Item } from 'item';
import { Pillar, Design, Display } from 'format';
import { None } from 'types/option';
import { selectPillar } from 'storybookHelpers';


// ----- Setup ----- //

const item: Item = {
    pillar: Pillar.News,
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

const starRating: Record<number, number> = [0, 1, 2, 3, 4, 5];


// ----- Stories ----- //

const Default = (): ReactElement =>
    <Headline item={{
        ...item,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
    }} />

const Analysis = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Analysis,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.News),
    }} />

const Feature = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Feature,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.News),
    }} />

const Review = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Review,
        starRating: radios('Rating', starRating, 3),
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
    }} />


// ----- Exports ----- //

export default {
    component: Headline,
    title: 'Headline',
    decorators: [ withKnobs ],
}

export {
    Default,
    Analysis,
    Feature,
    Review,
}
