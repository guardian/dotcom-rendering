// ----- Imports ----- //

import React, { FC } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';

import { selectPillar } from 'storybookHelpers';
import Byline from './byline';
import { Pillar, Design, Display } from 'format';
import { Option } from 'types/option';
import { parse } from 'client/parser';
import { pipe2 } from 'lib';
import { toOption } from 'types/result';


// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = (): string =>
    text('Profile Link', 'https://theguardian.com');

const byline = (): string =>
    text('Byline', 'Jane Smith');

const job = (): string =>
    text('Job Title', 'Editor of things');

const mockBylineHtml = (): Option<DocumentFragment> =>
    pipe2(
        `<a href="${profileLink()}">${byline()}</a> ${job()}`,
        parseByline,
        toOption,
    );


// ----- Stories ----- //

const Default: FC = () =>
    <Byline
        pillar={selectPillar(Pillar.News)}
        design={Design.Article}
        display={Display.Standard}
        bylineHtml={mockBylineHtml()}
    />

const Comment: FC = () =>
    <Byline
        pillar={selectPillar(Pillar.Opinion)}
        design={Design.Comment}
        display={Display.Standard}
        bylineHtml={mockBylineHtml()}
    />

const Labs: FC = () =>
    <Byline
        pillar={selectPillar(Pillar.News)}
        design={Design.AdvertisementFeature}
        display={Display.Standard}
        bylineHtml={mockBylineHtml()}
    />


// ----- Exports ----- //

export default {
    component: Byline,
    title: 'Byline',
    decorators: [ withKnobs ],
}

export {
    Default,
    Comment,
    Labs
}
