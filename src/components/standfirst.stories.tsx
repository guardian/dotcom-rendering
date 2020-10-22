// ----- Imports ----- //

import { withKnobs, boolean } from '@storybook/addon-knobs';
import React, { ReactElement } from 'react';
import { Pillar, Display } from '@guardian/types/Format';

import Standfirst from './standfirst';
import { Option } from '@guardian/types/option';
import { article, review, feature, comment } from 'fixtures/item';
import { parse } from 'client/parser';
import { selectPillar } from 'storybookHelpers';
import { pipe2 } from 'lib';
import { toOption } from '@guardian/types/result';


// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Option<DocumentFragment> =
    pipe2(
        '<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
        parseStandfirst,
        toOption,
    );


// ----- Stories ----- //

const Default = (): ReactElement =>
    <Standfirst item={{
        ...article,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        theme: selectPillar(Pillar.News),
    }} />

const Review = (): ReactElement =>
    <Standfirst item={{
        ...review,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        theme: selectPillar(Pillar.Culture),
    }} />

const Feature = (): ReactElement =>
    <Standfirst item={{
        ...feature,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        theme: selectPillar(Pillar.Sport),
    }} />

const Comment = (): ReactElement =>
    <Standfirst item={{
        ...comment,
        standfirst,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        theme: selectPillar(Pillar.Opinion),
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
