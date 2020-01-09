// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { withKnobs, text } from "@storybook/addon-knobs";

import Headline from 'components/standard/headline';
import { Pillar } from 'pillar';
import { Layout } from 'article';


// ----- Setup ----- //

const article = {
    pillar: Pillar.news,
    layout: Layout.Standard,
};

const copyKnob = 'Headline Copy';
const copy = 'Reclaimed lakes and giant airports: how Mexico City might have looked';


// ----- Exports ----- //

export default { title: 'Headline', decorators: [ withKnobs ] };

export const Standard = (): ReactNode =>
    <Headline headline={text(copyKnob, copy)} article={article} />

export const Feature = (): ReactNode =>
    <Headline headline={text(copyKnob, copy)} article={{ ...article, layout: Layout.Feature }} />

export const SportFeature = (): ReactNode =>
    <Headline
        headline={text(copyKnob, copy)}
        article={{ pillar: Pillar.sport, layout: Layout.Feature }}
    />

export const Analysis = (): ReactNode =>
    <Headline headline={text(copyKnob, copy)} article={{ ...article, layout: Layout.Analysis }} />

export const ArtsAnalysis = (): ReactNode =>
    <Headline
        headline={text(copyKnob, copy)}
        article={{ pillar: Pillar.arts, layout: Layout.Analysis }}
    />
