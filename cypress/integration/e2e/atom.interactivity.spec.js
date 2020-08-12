/* eslint-disable no-undef */
/* eslint-disable func-names */

const qandaUrl =
    'https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report';

const guideUrl =
    'https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents';

const atomTests = (type, url) => {
    describe(type, function () {
        it('should render', function () {
            cy.visit(`/Article?url=${url}`);
            cy.get(`[data-snippet-type=${type}]`).should('be.visible');
        });

        it('should expand on click', function () {
            cy.visit(`/Article?url=${url}`);
            cy.get(`[data-snippet-type=${type}]`).should('be.visible');
            cy.get(`[data-snippet-type=${type}]`)
                .contains('Show')
                .should('not.be.null');
            cy.get(`[data-snippet-type=${type}]`).click();
            cy.get(`[data-snippet-type=${type}]`)
                .contains('Hide')
                .should('not.be.null');
        });

        it('should expand then contract on second click', function () {
            cy.visit(`/Article?url=${url}`);
            cy.get(`[data-snippet-type=${type}]`).should('be.visible');
            cy.get(`[data-snippet-type=${type}]`)
                .contains('Show')
                .should('not.be.null');
            cy.get(`[data-snippet-type=${type}]`).click();
            cy.get(`[data-snippet-type=${type}]`)
                .contains('Hide')
                .should('not.be.null');
            cy.get(`[data-snippet-type=${type}]`).click();
            cy.get(`[data-snippet-type=${type}]`)
                .contains('Show')
                .should('not.be.null');
        });

        it('should show feedback message when like is clicked', function () {
            cy.visit(`/Article?url=${url}`);
            cy.get(`[data-snippet-type=${type}]`).click();
            cy.get('[data-testid="like"]').click();
            cy.get('[data-testid="feedback"]').should('be.visible');
        });

        it('should show feedback message when dislike is clicked', function () {
            cy.visit(`/Article?url=${url}`);
            cy.get(`[data-snippet-type=${type}]`).click();
            cy.get('[data-testid="dislike"]').click();
            cy.get('[data-testid="feedback"]').should('be.visible');
        });
    });
};
// atomTests('qanda', qandaUrl);
// atomTests('guide', guideUrl);
