// ----- Imports ----- //

import { Pillar, Design, Display } from '@guardian/types/Format';

import { Item, Review } from 'item';
import { None, Some } from 'types/option';
import { Image } from 'image';


// ----- Fixture ----- //

const fields = {
    pillar: Pillar.News,
    display: Display.Standard,
    body: [],
    headline: 'Reclaimed lakes and giant airports: how Mexico City might have looked',
    standfirst: new None<DocumentFragment>(),
    byline: '',
    bylineHtml: new None<DocumentFragment>(),
    publishDate: new None<Date>(),
    mainImage: new None<Image>(),
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

const article: Item = {
    design: Design.Article,
    ...fields,
};

const analysis: Item = {
    design: Design.Analysis,
    ...fields,
};

const feature: Item = {
    design: Design.Feature,
    ...fields,
};

const review: Review = {
    design: Design.Review,
    starRating: 4,
    ...fields,
};

const advertisementFeature: Item = {
    design: Design.AdvertisementFeature,
    ...fields,
};

const comment: Item = {
    design: Design.Comment,
    ...fields,
};


// ----- Exports ----- //

export {
    article,
    analysis,
    feature,
    review,
    advertisementFeature,
    comment,
};
