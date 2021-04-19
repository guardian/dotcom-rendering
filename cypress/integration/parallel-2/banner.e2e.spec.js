import { disableCMP } from '../../lib/disableCMP.js';

const optOutOfArticleCountConsent = () => {
	cy.setCookie('gu_article_count_opt_out', 'true');
};

describe('The banner', function () {
	it('makes a request to the support-dotcom-components service', function () {
		disableCMP();
		optOutOfArticleCountConsent();
		const articleUrl =
			'https://www.theguardian.com/politics/2019/nov/20/jeremy-corbyn-boris-johnson-tv-debate-watched-by-67-million-people';
		const rrBannerUrl = 'https://contributions.guardianapis.com/banner';

		cy.intercept(rrBannerUrl, (req) => {
			expect(req.body).to.have.property('targeting');
			expect(req.body).to.have.property('tracking');

			req.reply({});
		}).as('rrBannerRequest');

		cy.visit(`/Article?url=${articleUrl}`);
		cy.wait('@rrBannerRequest');
	});

	it('requests the puzzles banner on puzzles pages', function () {
		disableCMP();
		optOutOfArticleCountConsent();
		const articleUrl =
			'https://www.theguardian.com/crosswords/crossword-blog/2021/mar/29/crossword-blog-is-it-ok-to-when-solving-puzzles';
		const rrBannerUrl = 'https://contributions.guardianapis.com/puzzles';

		cy.intercept(rrBannerUrl, (req) => {
			expect(req.body).to.have.property('targeting');
			expect(req.body).to.have.property('tracking');

			req.reply({});
		}).as('puzzlesBannerRequest');

		cy.visit(`/Article?url=${articleUrl}`);
		cy.wait('@puzzlesBannerRequest');
	});
});
