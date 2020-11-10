import { getPolyfill } from '../../lib/polyfill';
import { fetchPolyfill } from '../../lib/config';

describe('Commercial E2E tests', function () {
    before(getPolyfill);

    beforeEach(function () {
        // Disable CMP
        cy.setCookie('gu-cmp-disabled', 'true', {
            log: true,
        });

    });

    describe('for WEB', function () {
        // eslint-disable-next-line mocha/no-setup-in-describe
        it(`It should check slots for a long article`, function () {
                const longReadURL = "https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife";
                cy.log(`Opening A long read`);
                cy.visit(`Article?url=${longReadURL}`, fetchPolyfill);

                cy.scrollTo('bottom', { duration: 4500 });

                cy.get('.js-ad-slot').should('have.length', 15)
            });
    });
});
