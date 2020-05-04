/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Elements', function() {
    describe('AMP', function() {
        // Based on examples from this blog post about working with iframes in Cypress
        // https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
        const getAmpIframeBody = () => {
            // get the iframe > document > body
            // and retry until the body element is not empty
            return (
                cy
                    .get('amp-iframe[data-cy="atom-embed-url"] > iframe')
                    .its('0.contentDocument.body')
                    .should('not.be.empty')
                    // wraps "body" DOM element to allow
                    // chaining more Cypress commands, like ".find(...)"
                    // https://on.cypress.io/wrap
                    .then(cy.wrap)
            );
        };

        it('should render the corona embed', function() {
            cy.visit(
                'AMPArticle?url=https://www.theguardian.com/world/2020/apr/24/new-mother-dies-of-coronavirus-six-days-after-giving-birth',
            );

            getAmpIframeBody().contains('Data from Public Health England');
        });
    });

    describe('WEB', function() {
        // https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
        const getIframeBody = () => {
            return cy
                .get('div[data-cy="instagram-embed"] > iframe')
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap);
        };

        it('should render the instagram embed', function() {
            cy.visit(
                'Article?url=https://www.theguardian.com/media/2018/aug/29/flat-tummy-instagram-women-appetite-suppressant-lollipops',
            );

            getIframeBody().contains('View More on Instagram');
        });
    });

    describe('WEB', function() {
        // https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
        const getIframeBody = () => {
            return cy
                .get('div[data-cy="embed-block"] > div > iframe')
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap);
        };

        it('should render the embed', function() {
            cy.visit(
                'Article?url=https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
            );

            getIframeBody().contains('radiolab');
        });
    });
});
