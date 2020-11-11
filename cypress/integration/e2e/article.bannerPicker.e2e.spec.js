/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Banner Picker Integration', function () {
    const cmpIframe = () => {
        return cy
            .get('iframe[id*="sp_message_iframe"]')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap);
    };

    describe('When consent cookies are not set', function () {
        it('shows the CMP', function () {
            cy.clearCookie('consentUUID');
            cy.clearCookie('euconsent-v2');

            cy.visit(
                `Article?url=https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview`,
            );

            cmpIframe().contains("It's your choice");
        });
    });

    // TODO: unable to get test working, need contributions to help understand why API call never fired
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('makes a single request to the banner service', function () {
        cy.visit(
            `Article?url=https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview`,
        );

        cy.window().then((win) => {
            const fetchSpy = cy.spy(win, 'fetch');
            fetchSpy
                .withArgs(
                    'https://contributions.guardianapis.com/banner',
                    Cypress.sinon.match.any,
                )
                .as('readerRevenueBannerFetch');
        });

        cy.get('@readerRevenueBannerFetch').should('have.been.calledOnce');
    });
});
