// @flow

import compose from 'compose-function';
import { string as curly } from 'curlyquotes';

import clean from './clean';
import bigBullets from './big-bullets';

const headline = compose(clean, curly);
const standfirst = compose(clean, bigBullets);
const main = clean;
const body = clean;

export default ({ contentFields, config }) => ({
    // here we create our own object of CAPI content on the 'content' key
    content: {
        headline: headline(config.page.headline),
        standfirst: standfirst(contentFields.fields.standfirst),
        main: main(contentFields.fields.main),
        body: body(
            contentFields.fields.blocks.body
                .map(block => block.bodyHtml)
                .filter(Boolean)
                .join(''),
        ),
    },
});
