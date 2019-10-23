import { getPolyfill } from '../../lib/polyfill';
import { fixTime } from '../../lib/time';
import { visitOptions } from '../../lib/config';
import { articles } from '../../lib/articles.js';
import { mockApi } from '../../lib/mocks';

describe('For WEB', function() {
    beforeEach(getPolyfill);
    beforeEach(fixTime);
    beforeEach(mockApi);

    articles.map((article, index) => {
        const { url, pillar, designType } = article;
        it(`It should load ${designType} articles under the ${pillar} pillar`, function() {
            cy.visit(`Article?url=${url}`, visitOptions);
            cy.percySnapshot(`WEB-${pillar}-${designType}-${index}`);
        });
    });
});
