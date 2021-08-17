import { articles, AMPArticles } from '../../lib/articles.js';
import { disableCMP } from '../../lib/disableCMP.js';
import { setUrlFragment } from '../../lib/setUrlFragment.js';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

describe('E2E Page rendering', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	describe('for WEB', function () {
		it('It should load an article and make the expected ajax calls', function () {
			const url = setUrlFragment(
				'https://www.theguardian.com/commentisfree/2019/oct/16/impostor-syndrome-class-unfairness',
				{
					'ab-CuratedContainerTest2': 'control',
				},
			);
			cy.visit(`/Article?url=${url}`);
			const roughLoadPositionOfMostView = 1400;
			cy.scrollTo(0, roughLoadPositionOfMostView, { duration: 500 });
			cy.contains('Lifestyle');

			cy.intercept('GET', '**/most-read-geo**', (req) => {
				req.reply((res) => {
					expect(res.body).to.have.property('heading');
					expect(res.statusCode).to.be.equal(200);
				});
			});
			cy.contains('Most viewed');

			cy.scrollTo('bottom', { duration: 500 });

			cy.intercept('POST', '/sharecount/**', (req) => {
				req.reply((res) => {
					expect(res.statusCode).to.be.equal(200);
					expect(res.body).to.have.property('path');
					expect(res.body).to.have.property('refreshStatus');
					expect(res.body)
						.to.have.property('share_count')
						.that.is.a('number');
				});
			});

			cy.intercept('GET', '/embed/card/**', (req) => {
				req.reply((res) => {
					expect(res.statusCode).to.be.equal(200);
				});
			});
			cy.contains('Read more');

			// We scroll again here because not all the content at the bottom of the page loads
			// when you first touch bottom, you sometimes need to scroll once more to trigger
			// lazy loading Most Popular
			cy.scrollTo('bottom', { duration: 500 });

			cy.intercept('GET', '/most-read/**', (req) => {
				req.reply((res) => {
					expect(res.body).to.have.property('tabs');
					expect(res.statusCode).to.be.equal(200);
				});
			});
			cy.contains('Most commented');
		});
	});

	describe('AB Tests - Can modify page', function () {
		it('should set the correct AB Test Variant', function () {
			// The A/B test has an audience of 0.001 and test offset of 0
			// Therefore the test will run from MVTIds 0 - 100
			// As there are two variants and therefore each variant falls into odd or even numbers
			// The 'control' will be even numbers, and the 'variant' will be odd
			// We test 99 here for the MVT cookie (set by Fastly usually) as expecting it to return
			// the 'variant' of the A/B test
			// See https://ab-tests.netlify.app/ for help caluclating buckets
			cy.setCookie('GU_mvt_id_local', '99', {
				log: true,
			});

			cy.visit(
				'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
			);

			cy.scrollTo('bottom', { duration: 300 });
			cy.get('[data-cy-ab-user-in-variant=ab-test-variant]').should(
				'be.visible',
			);

			cy.get('[data-cy-ab-runnable-test=variant]').should('be.visible');

			cy.get('[data-cy-ab-user-in-variant=ab-test-not-in-test]').should(
				'not.exist',
			);
		});

		it('should not edit the page if not in an AB test', function () {
			// See explanation above
			// The test runs from 0-100 MVT IDs, so 500 should force user not to be in the test
			cy.setCookie('GU_mvt_id_local', '500', {
				log: true,
			});

			cy.visit(
				'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
			);

			cy.scrollTo('bottom', { duration: 300 });

			cy.get('[data-cy-ab-user-in-variant=ab-test-not-in-test]').should(
				'be.visible',
			);

			cy.get('[data-cy-ab-runnable-test=not-runnable]').should(
				'be.visible',
			);
		});
	});

	describe('for AMP', function () {
		it(`It should load designType articles under the pillar`, function () {
			AMPArticles.map((article, index) => {
				const { url, pillar, designType } = article;
				cy.log(`designType: ${designType}, pillar: ${pillar}`);
				// Prevent the Privacy consent banner from obscuring snapshots
				cy.setCookie('GU_TK', 'true');

				cy.visit(`/AMPArticle?url=${url}`);
				cy.contains('Opinion');
			});
		});
	});
});
