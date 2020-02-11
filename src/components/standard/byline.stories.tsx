// ----- IUmports ----- //

import { withKnobs, text, boolean, date } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Byline from 'components/standard/byline';
import { Pillar } from 'pillar';
import { Layout, Article } from 'article';
import { Option, None, Some } from 'types/option';
import { parse } from 'client/parser';


// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const article: Article = {
    pillar: Pillar.news,
    layout: Layout.Standard,
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
};

const contributor = () => ({
    id: 'mock_id',
    type: 2,
    webTitle: text('Byline', 'Jane Smith'),
    webUrl: 'https://theguardian.com',
    apiUrl: 'https://theguardian.com',
    references: [],
});

const job = () =>
    text('Job', 'Editor Of Things');

const profileLink = () =>
    text('Profile Link', 'https://theguardian.com');

const byline = () =>
    text('Byline', 'Jane Smith');

function publishDate(): Option<Date> {
    const now = new Date(date('Date', new Date()));
    return boolean('Include Date', true) ? new Some(now) : new None();
}

const mockBylineHtml = (): Option<DocumentFragment> =>
    parseByline(`<a href="${profileLink()}">${byline()}</a> ${job()}`).either(
        _ => new None(),
        frag => new Some(frag),
    );


// ----- Stories ----- //

export default { title: 'Byline', decorators: [ withKnobs ] };

const News = (): ReactNode =>
    <Byline imageSalt="mock_salt" article={{
        ...article,
        byline: text('Byline', 'Jane Smith'),
        bylineHtml: mockBylineHtml(),
        contributors: boolean('Include Follow', false) ? [contributor()] : [],
        publishDate: publishDate(),
    }} />

const Sport = (): ReactNode =>
    <Byline imageSalt="mock_salt" article={{
        ...article,
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
