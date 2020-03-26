// ----- Imports ----- //

import React, { FC } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';

import { selectPillar } from 'storybookHelpers';
import Byline from './byline';
import { Design, Display } from 'item';
import { Option } from 'types/option';
import { parse } from 'client/parser';
import { Pillar } from 'pillar';


// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = (): string =>
    text('Profile Link', 'https://theguardian.com');

const byline = (): string =>
    text('Byline', 'Jane Smith');

const mockBylineHtml = (): Option<DocumentFragment> =>
    parseByline(`<a href="${profileLink()}">${byline()}</a>`).toOption();


// ----- Stories ----- //

const Default: FC = () =>
    <Byline
        pillar={selectPillar(Pillar.news)}
        design={Design.Article}
        display={Display.Standard}
        bylineHtml={mockBylineHtml()}
    />

const Comment: FC = () =>
    <Byline
        pillar={selectPillar(Pillar.opinion)}
        design={Design.Comment}
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
}
