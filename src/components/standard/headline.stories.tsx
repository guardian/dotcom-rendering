// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { withKnobs, text } from "@storybook/addon-knobs";

import Headline from 'components/standard/headline';
import { Pillar } from 'pillar';
import { Layout, Article } from 'article';
import { None } from 'types/option';


// ----- Setup ----- //

const article: Article = {
    pillar: Pillar.news,
    layout: Layout.Standard,
    body: [],
    headline: '',
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
};

const copyKnob = 'Headline Copy';
const copy = 'Reclaimed lakes and giant airports: how Mexico City might have looked';


// ----- Exports ----- //

export default { title: 'Headline', decorators: [ withKnobs ] };

export const Standard = (): ReactNode =>
    <Headline article={{
        ...article,
        headline: text(copyKnob, copy),
    }} />

export const Feature = (): ReactNode =>
    <Headline article={{
        ...article,
        layout: Layout.Feature,
        headline: text(copyKnob, copy),
    }} />

export const SportFeature = (): ReactNode =>
    <Headline article={{
        ...article,
        pillar: Pillar.sport,
        layout: Layout.Feature,
        headline: text(copyKnob, copy),
    }} />

export const Analysis = (): ReactNode =>
    <Headline article={{
        ...article,
        layout: Layout.Analysis,
        headline: text(copyKnob, copy),
    }} />

export const CultureAnalysis = (): ReactNode =>
    <Headline article={{
        ...article,
        pillar: Pillar.arts,
        layout: Layout.Analysis,
        headline: text(copyKnob, copy),
    }} />
