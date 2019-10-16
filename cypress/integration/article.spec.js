import { getPolyfill } from '../lib/polyfill';
import { visitOptions } from '../lib/config';
import { articles } from '../lib/articles.js';

describe('Page rendering', function() {
    beforeEach(getPolyfill);

    it('should load a basic article', function() {
        articles.map(article => {
            cy.visit(
                `http://localhost:3030/Article?url=${article.url}#noads`,
                visitOptions,
            );
            cy.percySnapshot();
        });
    });
});
