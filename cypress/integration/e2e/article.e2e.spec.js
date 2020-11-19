import { getPolyfill } from '../../lib/polyfill';
import { fetchPolyfill } from '../../lib/config';
import { articles, AMPArticles } from '../../lib/articles.js';
import { setupApiRoutes } from '../../lib/apiRoutes.js';
import { setUrlFragment } from '../../lib/setUrlFragment.js';

describe('E2E Page rendering', function () {
    before(getPolyfill);
    beforeEach(setupApiRoutes);

    describe('for WEB', function () {
        // eslint-disable-next-line mocha/no-setup-in-describe
        articles.map((article, index) => {
            it(`It should load the designType under the pillar (${article.url})`, function () {
                const { url: articleUrl, designType, pillar } = article;
                const url = setUrlFragment(articleUrl, {
                    'ab-CuratedContainerTest': 'control',
                });
                cy.log(`designType: ${designType}, pillar: ${pillar}`);
                cy.visit(`Article?url=${url}`, fetchPolyfill);
                const roughLoadPositionOfMostView = 1400;
                cy.scrollTo(0, roughLoadPositionOfMostView, { duration: 500 });
                cy.contains('Lifestyle');

                if (!article.hideMostViewed) {
                    cy.wait('@getMostReadGeo', { timeout: 8000 }).then(
                        (xhr) => {
                            expect(xhr.response.body).to.have.property(
                                'heading',
                            );
                            expect(xhr.status).to.be.equal(200);

                            cy.contains('Most viewed');
                        },
                    );
                }

                cy.scrollTo('bottom', { duration: 500 });
                cy.wait('@getShareCount').then((xhr) => {
                    expect(xhr.status).to.be.equal(200);
                    expect(xhr.response.body).to.have.property('path');
                    expect(xhr.response.body).to.have.property('refreshStatus');
                    expect(xhr.response.body)
                        .to.have.property('share_count')
                        .that.is.a('number');
                });

                if (article.hasRichLinks) {
                    cy.wait('@getRichLinks').then((xhr) => {
                        expect(xhr.status).to.be.equal(200);
                        cy.contains('Read more');
                    });
                }

                // We scroll again here because not all the content at the bottom of the page loads
                // when you first touch bottom, you sometimes need to scroll once more to trigger
                // lazy loading Most Popular
                cy.scrollTo('bottom', { duration: 500 });

                cy.wait('@getMostRead', { timeout: 8000 }).then((xhr) => {
                    expect(xhr.response.body).to.have.property('tabs');
                    expect(xhr.status).to.be.equal(200);

                    cy.contains('Most commented');
                });
            });
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
                'not.be.visible',
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

                cy.visit(`AMPArticle?url=${url}`, fetchPolyfill);
                cy.contains('Opinion');
            });
        });
    });
    
});
