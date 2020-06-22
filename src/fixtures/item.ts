// ----- Imports ----- //

import { Pillar, Design, Display } from '@guardian/types/Format';

import { Item, Review } from 'item';
import { None, Some } from 'types/option';
import { MainMediaKind } from 'headerMedia';

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
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
};

const analysis: Item = {
    design: Design.Analysis,
    ...fields,
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
};

const feature: Item = {
    design: Design.Feature,
    ...fields,
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
};

const review: Review = {
    design: Design.Review,
    starRating: 4,
    ...fields,
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
};

const advertisementFeature: Item = {
    design: Design.AdvertisementFeature,
    ...fields,
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
};

const comment: Item = {
    design: Design.Comment,
    ...fields,
    mainMedia: { kind: MainMediaKind.Image, image: new None() }
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
