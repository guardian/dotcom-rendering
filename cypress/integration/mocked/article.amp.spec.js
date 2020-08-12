import { getPolyfill } from '../../lib/polyfill';
import { fixTime } from '../../lib/time';
import { fetchPolyfill } from '../../lib/config';
import { AMPArticles } from '../../lib/articles.js';
import { mockApi } from '../../lib/mocks';

describe('For AMP', function () {
    before(getPolyfill);
    beforeEach(fixTime);
    beforeEach(mockApi);

    it(`It should load ${designType} articles under the ${pillar} pillar`, function () {
        AMPArticles.map((article) => {
            const { url } = article;
            cy.visit(`AMPArticle?url=${url}`, fetchPolyfill);
        });
    });
});
