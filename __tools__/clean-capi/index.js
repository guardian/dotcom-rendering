// @flow

import { string as curly } from 'curlyquotes';
import createDOMPurify from 'dompurify';

import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);
const { minify } = require('html-minifier');

const bulletsToListItems = s =>
    s.replace(/•/g, '<span class="bullet">&bull;</span>');

const headline = s => curly(s);
const standfirst = s => bulletsToListItems(s);

const parse = s =>
    minify(DOMPurify.sanitize(s), {
        collapseWhitespace: true,
        removeEmptyElements: true,
        minifyCSS: true,
        minifyJS: true,
    });

export default ({ contentFields, config }) => ({
    content: {
        headline: parse(headline(config.page.headline)),
        standfirst: parse(standfirst(contentFields.fields.standfirst)),
        main: parse(contentFields.fields.main),
        body: parse(
            contentFields.fields.blocks.body
                .map(block => block.bodyHtml)
                .filter(Boolean)
                .join(''),
        ),
    },
});
