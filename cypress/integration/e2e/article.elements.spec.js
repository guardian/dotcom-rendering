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
            // https://api.nextgen.guardianapps.co.uk/embed/atom/interactive/interactives%2F2020%2F03%2Fcovid-19-uk%2Fdefault#amp=1
            cy.server();
            // Listen for share count call
            cy.route({
                method: 'GET',
                url: '**/interactives/**/covid-19-uk/**',
            }).as('getCoronaEmbed');

            cy.visit(
                'AMPArticle?url=https://www.theguardian.com/world/2020/apr/24/new-mother-dies-of-coronavirus-six-days-after-giving-birth',
            );

            getAmpIframeBody().contains('Data from Public Health England');
        });
    });
});
