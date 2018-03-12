// @flow

import compose from 'compose-function';
import { string as curly } from 'curlyquotes';

import minify from './minify';
import bigBullets from './big-bullets';

export default ({ contentFields, config }) => ({
    // here we create our own object of CAPI content on the 'content' key
    content: {
        headline: compose(minify, curly)(config.page.headline),
        standfirst: compose(minify, bigBullets)(
            contentFields.fields.standfirst,
        ),
        main: minify(contentFields.fields.main),
        body: minify(
            contentFields.fields.blocks.body
                .map(block => block.bodyHtml)
                .filter(Boolean)
                .join(''),
        ),
    },
});
