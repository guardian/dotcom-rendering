import { getPolyfill } from '../../lib/polyfill';
import { fixTime } from '../../lib/time';
import { fetchPolyfill } from '../../lib/config';
import { AMPArticles } from '../../lib/articles.js';
import { mockApi } from '../../lib/mocks';

describe('For AMP', function() {
    beforeEach(getPolyfill);
    beforeEach(fixTime);
    beforeEach(mockApi);

    AMPArticles.map((article, index) => {
        const { url, pillar, designType } = article;
        it(`It should load ${designType} articles under the ${pillar} pillar`, function() {
            cy.visit(`AMPArticle?url=${url}`, fetchPolyfill);
        });
    });
});
