/* eslint-disable no-undef */
/* eslint-disable func-names */

describe('Banner Picker Integration', function () {
    const visitArticle = (
        url = 'https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview',
    ) => {
        cy.visit(`Article?url=${url}`);
    };

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

            visitArticle();

            cmpIframe().contains("It's your choice");
        });
    });

    // TODO:
    // it('makes a single request to the banner service', function () {
    //     visitArticle();

    //     cy.window().then((win) => {
    //         const fetchSpy = cy.spy(win, 'fetch');
    //         fetchSpy
    //             .withArgs(
    //                 'https://contributions.guardianapis.com/banner',
    //                 Cypress.sinon.match.any,
    //             )
    //             .as('readerRevenueBannerFetch');
    //     });

    //     cy.get('@readerRevenueBannerFetch').should('have.been.calledOnce');
    // });
});
