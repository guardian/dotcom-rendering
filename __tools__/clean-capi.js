// @flow

import { string as curly } from 'curlyquotes';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { minify } from 'html-minifier';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

const bigBullets = s => s.replace(/•/g, '<span class="bullet">&bull;</span>');

const headline = s => curly(s);
const standfirst = s => bigBullets(s);

const parse = s =>
    minify(DOMPurify.sanitize(s), {
        collapseWhitespace: true,
        removeEmptyElements: true,
        minifyCSS: true,
        minifyJS: true,
    });

export default ({ contentFields, config }) => ({
    // here we create our own object of CAPI content on the 'content' key
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
