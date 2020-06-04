// ----- Imports ----- //

import { withKnobs, boolean } from '@storybook/addon-knobs';
import React, { ReactElement } from 'react';
import { Pillar, Display } from '@guardian/types/Format';

import Standfirst from './standfirst';
import { Option } from 'types/option';
import { article, review, feature, comment } from 'fixtures/item';
import { parse } from 'client/parser';
import { selectPillar } from 'storybookHelpers';


// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Option<DocumentFragment> =
    parseStandfirst('<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>')
        .toOption();


// ----- Stories ----- //

const Default = (): ReactElement =>
    <Standfirst item={{
        ...article,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.News),
    }} />

const Review = (): ReactElement =>
    <Standfirst item={{
        ...review,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.Culture),
    }} />

const Feature = (): ReactElement =>
    <Standfirst item={{
        ...feature,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.Sport),
    }} />

const Comment = (): ReactElement =>
    <Standfirst item={{
        ...comment,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: selectPillar(Pillar.Opinion),
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
