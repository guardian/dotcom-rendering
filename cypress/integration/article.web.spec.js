import { getPolyfill } from '../lib/polyfill';
import { fixTime } from '../lib/time';
import { visitOptions } from '../lib/config';
import { articles } from '../lib/articles.js';

describe('Page rendering', function() {
    beforeEach(getPolyfill);
    beforeEach(fixTime);

    it('should load WEB articles', function() {
        articles.map((article, index) => {
            cy.visit(`Article?url=${article.url}`, visitOptions);
            cy.percySnapshot(
                `WEB-${article.pillar}-${article.designType}-${index}`,
            );
        });
    });
});
