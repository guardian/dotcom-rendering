// ----- IUmports ----- //

import { withKnobs, text, boolean, date } from '@storybook/addon-knobs';
import React, { ReactNode } from 'react';

import Byline from 'components/standard/byline';
import { Pillar } from 'pillar';
import { Design, Item, Display } from 'item';
import { Option, None, Some } from 'types/option';
import { parse } from 'client/parser';
import { ITag as Contributor } from 'mapiThriftModels';


// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const item: Item = {
    pillar: Pillar.news,
    design: Design.Article,
    display: Display.Standard,
    body: [],
    headline: '',
    standfirst: new None(),
    byline: '',
    bylineHtml: new None(),
    publishDate: new Some(new Date()),
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
    shouldHideReaderRevenue: false,
};

const contributor = (): Contributor => ({
    id: 'mock_id',
    type: 2,
    webTitle: text('Byline', 'Jane Smith'),
    webUrl: 'https://theguardian.com',
    apiUrl: 'https://theguardian.com',
    references: [],
});

const job = (): string =>
    text('Job', 'Editor Of Things');

const profileLink = (): string =>
    text('Profile Link', 'https://theguardian.com');

const byline = (): string =>
    text('Byline', 'Jane Smith');

function publishDate(): Option<Date> {
    const now = new Date(date('Date', new Date()));
    return boolean('Include Date', true) ? new Some(now) : new None();
}

const mockBylineHtml = (): Option<DocumentFragment> =>
    parseByline(`<a href="${profileLink()}">${byline()}</a> ${job()}`).toOption();


// ----- Stories ----- //

export default { title: 'Byline', decorators: [ withKnobs ] };

const News = (): ReactNode =>
    <Byline imageSalt="mock_salt" item={{
        ...item,
        byline: text('Byline', 'Jane Smith'),
        bylineHtml: mockBylineHtml(),
        contributors: boolean('Include Follow', false) ? [contributor()] : [],
        publishDate: publishDate(),
    }} />

const Sport = (): ReactNode =>
    <Byline imageSalt="mock_salt" item={{
        ...item,
        byline: text('Byline', 'Jane Smith'),
        pillar: Pillar.sport,
        bylineHtml: mockBylineHtml(),
        contributors: boolean('Include Follow', false) ? [contributor()] : [],
        publishDate: publishDate(),
    }} />


// ----- Exports ----- //

export {
    News,
    Sport,
}
