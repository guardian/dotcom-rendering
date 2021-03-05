import { fixTime } from '../../lib/time';
import { AMPArticles } from '../../lib/articles.js';
import { mockApi } from '../../lib/mocks';

describe('For AMP', function () {
	beforeEach(fixTime, mockApi);

	it(`It should load designType articles under the pillar`, function () {
		AMPArticles.map((article) => {
			const { url, designType, pillar } = article;
			cy.log(`designType: ${designType}, pillar: ${pillar}`);
			cy.visit(`/AMPArticle?url=${url}`);
		});
	});
});
