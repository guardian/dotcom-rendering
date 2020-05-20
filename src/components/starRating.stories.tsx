// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { withKnobs, radios } from '@storybook/addon-knobs';

import StarRating from './starRating';
import { Item } from 'item';
import { Pillar, Design, Display } from 'format';
import { None, Some } from 'types/option';


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
    series: new Some({
        id: '',
        type: 0,
        webTitle: '',
        webUrl: '',
        apiUrl: '',
        references: [],
    }),
    commentable: false,
    tags: [],
    shouldHideReaderRevenue: false,
};

const starRating: Record<number, number> = [0, 1, 2, 3, 4, 5];


// ----- Stories ----- //

const Default = (): ReactElement =>
    <StarRating item={{
        ...item,
        design: Design.Review,
        starRating: radios('Rating', starRating, 3),
    }} />

const NotReview = (): ReactElement =>
    <StarRating item={item} />


// ----- Exports ----- //

export default {
    component: StarRating,
    title: 'Star Rating',
    decorators: [ withKnobs ],
}

export {
    Default,
    NotReview,
}
