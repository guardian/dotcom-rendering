// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { withKnobs, text } from "@storybook/addon-knobs";

import Headline from 'components/standard/headline';
import { Pillar } from 'pillar';
import { Design, Item, Display } from 'item';
import { None } from 'types/option';


// ----- Setup ----- //

const item: Item = {
    pillar: Pillar.news,
    design: Design.Article,
    display: Display.Standard,
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
    <Headline item={{
        ...item,
        headline: text(copyKnob, copy),
    }} />

export const Feature = (): ReactNode =>
    <Headline item={{
        ...item,
        design: Design.Feature,
        headline: text(copyKnob, copy),
    }} />

export const SportFeature = (): ReactNode =>
    <Headline item={{
        ...item,
        pillar: Pillar.sport,
        design: Design.Feature,
        headline: text(copyKnob, copy),
    }} />

export const Analysis = (): ReactNode =>
    <Headline item={{
        ...item,
        design: Design.Analysis,
        headline: text(copyKnob, copy),
    }} />

export const CultureAnalysis = (): ReactNode =>
    <Headline item={{
        ...item,
        pillar: Pillar.arts,
        design: Design.Analysis,
        headline: text(copyKnob, copy),
    }} />
