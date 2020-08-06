/* eslint-disable no-undef */
/* eslint-disable func-names */

const qandaUrl =
    'https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report';

describe('Atom Interactivity', function () {
    describe('Q&A Atom', function () {
        it('should render', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').should('be.visible');
        });

        it('should expand on click', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').should('be.visible');
            cy.get('[data-snippet-type="qanda"]')
                .contains('Show')
                .should('not.be.null');
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-snippet-type="qanda"]')
                .contains('Hide')
                .should('not.be.null');
        });

        it('should expand then contract on second click', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').should('be.visible');
            cy.get('[data-snippet-type="qanda"]')
                .contains('Show')
                .should('not.be.null');
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-snippet-type="qanda"]')
                .contains('Hide')
                .should('not.be.null');
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-snippet-type="qanda"]')
                .contains('Show')
                .should('not.be.null');
        });

        it('should show feedback message when like is clicked', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-testid="like"]').click();
            cy.get('[data-testid="feedback"]').should('be.visible');
        });

        it('should show feedback message when dislike is clicked', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-testid="dislike"]').click();
            cy.get('[data-testid="feedback"]').should('be.visible');
        });

        /*
        it('should send like event when clicked', function () {
            cy.visit(`/Article?url=${qandaUrl}`);
            cy.get('[data-snippet-type="qanda"]').click();
            cy.get('[data-testid="like"]').click();
        });
        */
    });
});
