import { getPolyfill } from '../lib/polyfill';
import { fixTime } from '../lib/time';
import { visitOptions } from '../lib/config';
import { AMPArticles } from '../lib/articles.js';

describe('Page rendering', function() {
    beforeEach(getPolyfill);
    beforeEach(fixTime);

    it('should load AMP articles', function() {
        AMPArticles.map((article, index) => {
            cy.visit(`AMPArticle?url=${article.url}`, visitOptions);
            cy.percySnapshot(
                `AMP-${article.pillar}-${article.designType}-${index}`,
            );
        });
    });
});
