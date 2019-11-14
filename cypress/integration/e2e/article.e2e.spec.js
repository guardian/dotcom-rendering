import { getPolyfill } from '../../lib/polyfill';
import { fetchPolyfill } from '../../lib/config';
import { articles, AMPArticles } from '../../lib/articles.js';
import { setupApiRoutes } from '../../lib/apiRoutes.js';

describe('E2E Page rendering', function() {
    beforeEach(getPolyfill);
    beforeEach(setupApiRoutes);

    describe('for WEB', function() {
        articles.map((article, index) => {
            const { url, pillar, designType } = article;

            it(`It should load ${designType} articles under the ${pillar} pillar`, function() {
                cy.visit(`Article?url=${url}`, fetchPolyfill);
                cy.contains('Sign in');

                cy.wait('@getMostRead').then(xhr => {
                    expect(xhr.response.body.length).to.be.at.least(1);
                    expect(xhr.status).to.be.equal(200);

                    cy.contains('Most popular');
                });

                cy.wait('@getMostReadGeo').then(xhr => {
                    expect(xhr.response.body).to.have.property('heading');
                    expect(xhr.status).to.be.equal(200);

                    cy.contains('most viewed');
                });

                cy.wait('@getShareCount').then(xhr => {
                    expect(xhr.status).to.be.equal(200);
                    expect(xhr.response.body).to.have.property('path');
                    expect(xhr.response.body).to.have.property('refreshStatus');
                    expect(xhr.response.body)
                        .to.have.property('share_count')
                        .that.is.a('number');
                });

                if (article.hasRichLinks) {
                    cy.wait('@getRichLinks').then(xhr => {
                        expect(xhr.status).to.be.equal(200);
                        cy.contains('Read more');
                    });
                }
            });
        });
    });

    describe('for AMP', function() {
        AMPArticles.map((article, index) => {
            const { url, pillar, designType } = article;

            it(`It should load ${designType} articles under the ${pillar} pillar`, function() {
                // Prevent the Privacy consent banner from obscuring snapshots
                cy.setCookie('GU_TK', 'true');

                cy.visit(`AMPArticle?url=${url}`, fetchPolyfill);
                cy.contains('Opinion');
            });
        });
    });
});
