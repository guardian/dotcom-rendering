import { getPolyfill } from '../../lib/polyfill';
import { visitOptions } from '../../lib/config';
import { articles } from '../../lib/articles.js';

describe('E2E Page rendering', function() {
    beforeEach(getPolyfill);

    articles.map((article, index) => {
        const { url, pillar, designType } = article;
        it(`It should load ${designType} articles under the ${pillar} pillar`, function() {
            cy.visit(`Article?url=${url}`, visitOptions);
            cy.contains('Sign in');
        });
    });
});
