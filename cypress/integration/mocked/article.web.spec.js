import { getPolyfill } from '../../lib/polyfill';
import { fixTime } from '../../lib/time';
import { fetchPolyfill } from '../../lib/config';
import { articles } from '../../lib/articles.js';
import { mockApi } from '../../lib/mocks';

describe('For WEB', function () {
    before(getPolyfill);
    beforeEach(fixTime, mockApi);
    it(`It should load designType articles under the  pillar`, function () {
        articles.map((article) => {
            const { url, designType, pillar } = article;
            cy.log(`designType: ${designType}, pillar: ${pillar}`);
            // Prevent the Privacy consent banner from obscuring snapshots
            cy.setCookie('GU_TK', 'true');
            // Make the request, forcing the location to UK (for edition)
            cy.visit(`/Article?url=${url}?_edition=UK`, fetchPolyfill);
        });
    });
});
