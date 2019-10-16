import { getPolyfill } from '../lib/polyfill';
import { visitOptions } from '../lib/config';
import { articles, AMPArticles } from '../lib/articles.js';

describe('Page rendering', function() {
    beforeEach(getPolyfill);

    it('should load WEB articles', function() {
        articles.map((article, index) => {
            cy.visit(
                `http://localhost:3030/Article?url=${article.url}`,
                visitOptions,
            );
            cy.percySnapshot(
                `WEB-${article.pillar}-${article.designType}-${index}`,
            );
        });
    });

    it('should load AMP articles', function() {
        AMPArticles.map((article, index) => {
            cy.visit(
                `http://localhost:3030/AMPArticle?url=${article.url}`,
                visitOptions,
            );
            cy.percySnapshot(
                `AMP-${article.pillar}-${article.designType}-${index}`,
            );
        });
    });
});
